# ESTERRA — дизайн-система запуска 1

## Направление

Сдержанный студийный минимализм: бумажный фон, графитовый текст, один терракотовый акцент, редакционная serif-заголовочная пара и функциональная sans-serif для данных. Фотография показывает контекст жизни, а не рекламный коллаж.

## Токены

- Цвета: `paper #f4f1eb`, `ink #242522`, `muted #77766f`, `line #d8d4ca`, `accent #a95f43`, `soft #e6ded4`.
- Сетка: контейнер `1320px`, горизонтальный отступ `32px` desktop / `15px` mobile.
- Ритм: базовые интервалы 8px, крупные секции 80–128px.
- Радиусы: 0–2px для editorial-поверхностей, круг только для служебных маркеров.
- Motion: короткие hover-состояния карточек, `prefers-reduced-motion` должен быть добавлен до релизного gate.

## Компоненты

Header, hero, deal switch, search panel, property card, empty/error state, property dialog, inquiry form, status indicator, principle list, request banner.

## Responsive acceptance

390px: один столбец, доступный dialog и touch targets. 768px: две карточки и двухколоночная форма. 1440px: три карточки, editorial hero и широкая форма поиска. Фактический screenshot review на этом запуске пока не пройден из-за отсутствия доступного browser screenshot-инструмента.
