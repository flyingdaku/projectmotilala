#!/usr/bin/env python3
"""
Index Metadata Management Script

Provides utilities to query, update, and manage index metadata.

Usage:
    python scripts/manage_index_metadata.py list [--category CATEGORY] [--source SOURCE]
    python scripts/manage_index_metadata.py show INDEX_NAME
    python scripts/manage_index_metadata.py update INDEX_NAME --field FIELD --value VALUE
    python scripts/manage_index_metadata.py refresh [INDEX_NAME]
    python scripts/manage_index_metadata.py stats
"""

import argparse
import json
import os
import sqlite3
import sys
from datetime import datetime, timedelta
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from core.db import get_connection, generate_id


def list_indices(category=None, source=None, active_only=True):
    """List all indices with optional filters."""
    with get_connection() as conn:
        query = "SELECT * FROM index_metadata WHERE 1=1"
        params = []
        
        if category:
            query += " AND category = ?"
            params.append(category)
        
        if source:
            query += " AND primary_source = ?"
            params.append(source)
        
        if active_only:
            query += " AND is_active = 1"
        
        query += " ORDER BY total_records DESC"
        
        results = conn.execute(query, params).fetchall()
        
        print(f"\n{'Index Name':<40} {'Category':<15} {'Source':<10} {'Records':<8} {'Coverage':<10} {'Updated':<12}")
        print("-" * 110)
        
        for row in results:
            print(f"{row['index_name']:<40} {row['category'] or 'N/A':<15} {row['primary_source']:<10} "
                  f"{row['total_records']:<8} {row['coverage_pct'] or 0:<10.1f} {row['last_updated'] or 'N/A':<12}")
        
        print(f"\nTotal: {len(results)} indices")


def show_index(index_name):
    """Show detailed information for a specific index."""
    with get_connection() as conn:
        result = conn.execute(
            "SELECT * FROM index_metadata WHERE index_name = ?",
            (index_name,)
        ).fetchone()
        
        if not result:
            print(f"❌ Index '{index_name}' not found")
            return
        
        print(f"\n=== {result['index_name']} ===\n")
        
        # Basic info
        print(f"Asset ID: {result['asset_id']}")
        print(f"NSE Symbol: {result['nse_symbol'] or 'N/A'}")
        print()
        
        # Classification
        print("Classification:")
        print(f"  Category: {result['category'] or 'N/A'}")
        print(f"  Sub-category: {result['sub_category'] or 'N/A'}")
        print(f"  Index Type: {result['index_type'] or 'N/A'}")
        print()
        
        # Data source
        print("Data Source:")
        print(f"  Primary Source: {result['primary_source']}")
        print(f"  Data Type: {result['data_type'] or 'N/A'}")
        print(f"  Has Full OHLC: {'Yes' if result['has_full_ohlc'] else 'No'}")
        print()
        
        # Coverage
        print("Coverage:")
        print(f"  Earliest Date: {result['earliest_date'] or 'N/A'}")
        print(f"  Latest Date: {result['latest_date'] or 'N/A'}")
        print(f"  Total Records: {result['total_records']:,}")
        print(f"  Coverage: {result['coverage_pct'] or 0:.2f}%")
        print(f"  Completeness: {result['data_completeness'] or 'UNKNOWN'}")
        print()
        
        # Status
        print("Status:")
        print(f"  Active: {'Yes' if result['is_active'] else 'No'}")
        print(f"  Update Frequency: {result['update_frequency'] or 'N/A'}")
        print(f"  Last Updated: {result['last_updated'] or 'N/A'}")
        print()
        
        # Index characteristics
        if result['base_date'] or result['base_value'] or result['num_constituents']:
            print("Index Characteristics:")
            if result['base_date']:
                print(f"  Base Date: {result['base_date']}")
            if result['base_value']:
                print(f"  Base Value: {result['base_value']}")
            if result['num_constituents']:
                print(f"  Constituents: {result['num_constituents']}")
            if result['rebalance_frequency']:
                print(f"  Rebalance: {result['rebalance_frequency']}")
            print()
        
        # Data quality
        if result['has_gaps'] or result['gap_count']:
            print("Data Quality:")
            print(f"  Has Gaps: {'Yes' if result['has_gaps'] else 'No'}")
            if result['gap_count']:
                print(f"  Gap Count: {result['gap_count']}")
            if result['longest_gap_days']:
                print(f"  Longest Gap: {result['longest_gap_days']} days")
            print()
        
        # Additional info
        if result['tags']:
            print(f"Tags: {result['tags']}")
        if result['notes']:
            print(f"Notes: {result['notes']}")
        if result['metadata_json']:
            print(f"Metadata: {result['metadata_json']}")


def update_index(index_name, field, value):
    """Update a specific field for an index."""
    allowed_fields = [
        'category', 'sub_category', 'index_type', 'update_frequency',
        'is_active', 'base_date', 'base_value', 'num_constituents',
        'rebalance_frequency', 'methodology_url', 'tags', 'notes', 'metadata_json'
    ]
    
    if field not in allowed_fields:
        print(f"❌ Field '{field}' is not allowed for manual update")
        print(f"Allowed fields: {', '.join(allowed_fields)}")
        return
    
    with get_connection() as conn:
        # Check if index exists
        exists = conn.execute(
            "SELECT 1 FROM index_metadata WHERE index_name = ?",
            (index_name,)
        ).fetchone()
        
        if not exists:
            print(f"❌ Index '{index_name}' not found")
            return
        
        # Update
        conn.execute(
            f"UPDATE index_metadata SET {field} = ?, updated_at = datetime('now') WHERE index_name = ?",
            (value, index_name)
        )
        conn.commit()
        
        print(f"✅ Updated {index_name}: {field} = {value}")


def refresh_metadata(index_name=None):
    """Refresh metadata from daily_prices table."""
    with get_connection() as conn:
        if index_name:
            # Refresh single index
            asset = conn.execute(
                "SELECT id FROM assets WHERE name = ? AND asset_class = 'INDEX'",
                (index_name,)
            ).fetchone()
            
            if not asset:
                print(f"❌ Index '{index_name}' not found in assets")
                return
            
            where_clause = "WHERE a.id = ?"
            params = [asset['id']]
        else:
            # Refresh all indices
            where_clause = "WHERE a.asset_class = 'INDEX'"
            params = []
        
        # Get updated stats
        indices = conn.execute(f'''
            SELECT 
                a.id as asset_id,
                a.name,
                dp.source_exchange,
                COUNT(*) as row_count,
                MIN(dp.date) as earliest_date,
                MAX(dp.date) as latest_date,
                SUM(CASE WHEN dp.open IS NOT NULL THEN 1 ELSE 0 END) as has_ohlc_count
            FROM assets a
            JOIN daily_prices dp ON dp.asset_id = a.id
            {where_clause}
            GROUP BY a.id, a.name, dp.source_exchange
        ''', params).fetchall()
        
        updated = 0
        for idx in indices:
            # Calculate coverage
            start = datetime.strptime(idx['earliest_date'], '%Y-%m-%d')
            end = datetime.strptime(idx['latest_date'], '%Y-%m-%d')
            total_days = (end - start).days + 1
            weekends = sum(1 for d in range(total_days) if (start + timedelta(days=d)).weekday() >= 5)
            trading_days = total_days - weekends
            coverage_pct = (idx['row_count'] / trading_days * 100) if trading_days > 0 else 0
            
            # Determine completeness
            if coverage_pct >= 95:
                completeness = 'COMPLETE'
            elif coverage_pct >= 70:
                completeness = 'PARTIAL'
            else:
                completeness = 'SPARSE'
            
            has_full_ohlc = 1 if idx['has_ohlc_count'] > 0 else 0
            
            # Update
            conn.execute('''
                UPDATE index_metadata
                SET earliest_date = ?,
                    latest_date = ?,
                    total_records = ?,
                    last_updated = ?,
                    has_full_ohlc = ?,
                    coverage_pct = ?,
                    data_completeness = ?,
                    updated_at = datetime('now')
                WHERE asset_id = ?
            ''', (
                idx['earliest_date'], idx['latest_date'], idx['row_count'],
                idx['latest_date'], has_full_ohlc, round(coverage_pct, 2),
                completeness, idx['asset_id']
            ))
            updated += 1
        
        conn.commit()
        print(f"✅ Refreshed metadata for {updated} indices")


def show_stats():
    """Show statistics about index metadata."""
    with get_connection() as conn:
        print("\n=== INDEX METADATA STATISTICS ===\n")
        
        # Total counts
        total = conn.execute("SELECT COUNT(*) as cnt FROM index_metadata").fetchone()['cnt']
        active = conn.execute("SELECT COUNT(*) as cnt FROM index_metadata WHERE is_active = 1").fetchone()['cnt']
        
        print(f"Total Indices: {total}")
        print(f"Active Indices: {active}")
        print()
        
        # By category
        print("By Category:")
        categories = conn.execute('''
            SELECT category, COUNT(*) as cnt
            FROM index_metadata
            GROUP BY category
            ORDER BY cnt DESC
        ''').fetchall()
        
        for cat in categories:
            print(f"  {cat['category'] or 'N/A':<20}: {cat['cnt']:>3}")
        print()
        
        # By source
        print("By Source:")
        sources = conn.execute('''
            SELECT primary_source, COUNT(*) as cnt
            FROM index_metadata
            GROUP BY primary_source
            ORDER BY cnt DESC
        ''').fetchall()
        
        for src in sources:
            print(f"  {src['primary_source']:<10}: {src['cnt']:>3}")
        print()
        
        # By completeness
        print("By Data Completeness:")
        completeness = conn.execute('''
            SELECT data_completeness, COUNT(*) as cnt
            FROM index_metadata
            GROUP BY data_completeness
            ORDER BY 
                CASE data_completeness
                    WHEN 'COMPLETE' THEN 1
                    WHEN 'PARTIAL' THEN 2
                    WHEN 'SPARSE' THEN 3
                    ELSE 4
                END
        ''').fetchall()
        
        for comp in completeness:
            print(f"  {comp['data_completeness'] or 'UNKNOWN':<10}: {comp['cnt']:>3}")
        print()
        
        # Coverage stats
        avg_coverage = conn.execute('''
            SELECT AVG(coverage_pct) as avg_cov, MIN(coverage_pct) as min_cov, MAX(coverage_pct) as max_cov
            FROM index_metadata
            WHERE is_active = 1
        ''').fetchone()
        
        print("Coverage Stats:")
        print(f"  Average: {avg_coverage['avg_cov'] or 0:.1f}%")
        print(f"  Minimum: {avg_coverage['min_cov'] or 0:.1f}%")
        print(f"  Maximum: {avg_coverage['max_cov'] or 0:.1f}%")
        print()


def main():
    parser = argparse.ArgumentParser(description="Manage Index Metadata")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")
    
    # List command
    list_parser = subparsers.add_parser("list", help="List indices")
    list_parser.add_argument("--category", help="Filter by category")
    list_parser.add_argument("--source", help="Filter by source")
    list_parser.add_argument("--all", action="store_true", help="Show inactive indices too")
    
    # Show command
    show_parser = subparsers.add_parser("show", help="Show index details")
    show_parser.add_argument("index_name", help="Name of the index")
    
    # Update command
    update_parser = subparsers.add_parser("update", help="Update index field")
    update_parser.add_argument("index_name", help="Name of the index")
    update_parser.add_argument("--field", required=True, help="Field to update")
    update_parser.add_argument("--value", required=True, help="New value")
    
    # Refresh command
    refresh_parser = subparsers.add_parser("refresh", help="Refresh metadata from daily_prices")
    refresh_parser.add_argument("index_name", nargs="?", help="Specific index to refresh (optional)")
    
    # Stats command
    subparsers.add_parser("stats", help="Show metadata statistics")
    
    args = parser.parse_args()
    
    if args.command == "list":
        list_indices(args.category, args.source, not args.all)
    elif args.command == "show":
        show_index(args.index_name)
    elif args.command == "update":
        update_index(args.index_name, args.field, args.value)
    elif args.command == "refresh":
        refresh_metadata(args.index_name)
    elif args.command == "stats":
        show_stats()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
