-- Migration: Add missing cash flow fields to fundamentals table
-- Date: 2026-03-14
-- Purpose: Support full MSI cash flow data (net_change_in_cash, cash_begin_of_year, cash_end_of_year)

ALTER TABLE fundamentals ADD COLUMN net_change_in_cash REAL;
ALTER TABLE fundamentals ADD COLUMN cash_begin_of_year REAL;
ALTER TABLE fundamentals ADD COLUMN cash_end_of_year REAL;
