# ESTERRA local product slice

Run from the repository root:

```text
node sites/esterra/server.mjs
```

The server serves the existing catalog and `dist/esterra` from one origin and exposes a SQLite-backed API under `/api/esterra`. The database file is ignored by Git. Seed records are sample records and are created only when the database is empty.
