# Legacy Next Backend Archive

This folder preserves the old Next.js backend flow files that were replaced by
the FastAPI backend.

Archived here:
- `src/app/api/**` legacy route handlers
- `src/lib/data/db-postgres.ts`
- `src/lib/data/index.ts` original adapter barrel
- `src/lib/data/pg-adapter.ts`
- `src/lib/dashboard/query-engine.ts`
- `src/lib/server/auth.ts`

Files intentionally left in `src/lib` because the frontend still uses them:
- `src/lib/data/types.ts`
- `src/lib/dashboard/types.ts`
- `src/lib/dashboard/presets.ts`
- `src/lib/screener/dsl/**`

If you want to fully delete the legacy backend later, this archive is the place
to remove after you no longer need reference copies.
