# ESTERRA — project state

## Current run

Запуск 1, фундамент и первый сквозной сценарий. Работа ведётся только в `romariotts94-art/create-site-app` на ветке `codex/quality-gates-art-product`.

Implementation commit: `7f91fac10c67e45798942fa2bc64daf6e38b76bd`.

## IMPLEMENTED

- Изолированный UI ESTERRA добавлен в `dist/esterra`.
- ESTERRA зарегистрирован отдельной карточкой в существующем каталоге; Nova Estate и другие продукты не изменялись по поведению.
- SQLite migration, seed data, серверный API и тестовая база добавлены в `sites/esterra`.
- Реализована цепочка objects → search/filter → property detail → validated inquiry → SQLite record.

## VERIFIED

- `node --test sites\\esterra\\tests\\api.test.mjs` — exit 0, 5 passed, 0 failed.
- `node --check dist\\catalog-app.js`, `node --check dist\\esterra\\app.js`, `node --check sites\\esterra\\server.mjs` — exit 0.
- `git diff --check` — exit 0.
- Live local HTTP: `/index.html`, `/esterra/index.html`, `/api/esterra/health`, filtered `/api/esterra/properties` — HTTP 200.
- Invalid `POST /api/esterra/inquiries` — HTTP 422; valid request — HTTP 201 with SQLite inquiry id.
- Catalog smoke check confirms `./esterra/index.html` and ESTERRA card are present.

## ISSUES / BLOCKERS

- Публичный static hosting каталога не включает ESTERRA API автоматически; отдельное production backend deployment ещё не настроено.
- Визуальная проверка реальными скриншотами на 390/768/1440 пока не подтверждена доступными инструментами.
- Seed-фотографии Unsplash требуют финального лицензионного/контентного согласования перед продажей.

## NEXT

После закрытия текущего gate: запуск 2 — студийная дизайн-система, responsive page families и screenshot review.

## QUALITY GATE

`NOT READY` — tests pass, but screenshot review and production backend deployment are not verified.
