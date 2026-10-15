# ESTERRA — feature matrix / запуск 1

| Feature | Priority | Implementation | Verification | Status |
|---|---:|---|---|---|
| Карточка ESTERRA в каталоге | P0 | `dist/index.html`, `dist/catalog-app.js` | HTML/catalog smoke test | implemented |
| Изолированный UI ESTERRA | P0 | `dist/esterra/*` | Node static/API smoke | implemented |
| SQLite schema + indexes | P0 | `sites/esterra/migrations/001_init.sql` | `node --test` | implemented |
| Seed property records | P0 | `sites/esterra/db.mjs` | API list test | implemented |
| Search by deal/query/price/rooms | P0 | `GET /api/esterra/properties` | API tests | implemented |
| Property detail | P0 | `GET /api/esterra/properties/:id` + dialog | API + browser route inspection | implemented |
| Validated inquiry persistence | P0 | `POST /api/esterra/inquiries` | valid/invalid/persist test | implemented |
| Client/server error state | P0 | `dist/esterra/app.js`, `server.mjs` | API negative tests | implemented |
| Accounts and authorization | P1 | not in run 1 | not run | pending |
| Booking calendar/payment | P1 | not in run 1 | not run | pending |
| Production DB deployment | P0 for sale | local SQLite only | deployment not configured | blocker |
| Real screenshot review | P0 design gate | tooling unavailable | not run | blocker |
