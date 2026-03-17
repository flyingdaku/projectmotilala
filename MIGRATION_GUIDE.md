# SQLite to PostgreSQL/TimescaleDB Migration Guide

## Step 1: Start Docker Containers
```bash
cd /Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline
docker compose up -d
docker compose ps  # Verify running
```

## Step 2: Populate Databases from SQLite
```bash
# Install psycopg2 if needed
pip install psycopg2-binary

# Migrate relational data
python3 populate_postgres.py

# Migrate time-series data  
python3 populate_timescale.py
```

## Step 3: Create Computed Views
```bash
psql -h localhost -p 5432 -U artha -d artha_relational -f db/create_computed_views.sql
```

## Step 4: Update Frontend to Use PostgreSQL
- Replace `artha/src/lib/data/db.ts` with `db-postgres.ts`
- Update `artha/src/lib/data/index.ts` to use postgres adapter
- Remove better-sqlite3 from package.json

## Step 5: Remove SQLite
```bash
rm /Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/market_data.db*
```

## Step 6: Test
```bash
cd artha
npm run dev
# Test all endpoints
```
