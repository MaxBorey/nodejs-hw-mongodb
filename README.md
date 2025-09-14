# Node.js + MongoDB Contacts API

REST API для керування контактами. Підтримує авторизацію, завантаження файлів і зручну документацію.

## Features
- **Auth:** JWT + Google OAuth (signin/signup, захищені маршрути)
- **Contacts:** CRUD-операції (створення, читання, оновлення, видалення)
- **Validation & Errors:** валідація запитів, уніфіковані помилки
- **Uploads:** прийом і зберігання файлів (папки `temp/`, `uploads/`)
- **Docs:** OpenAPI/Swagger (`/api-docs`) + ReDoc (`/docs`)
- **Code quality:** ESLint, Prettier (конфіги в репозиторії)
- **Env:** приклад налаштувань у `.env.example`

## Tech stack
Node.js, Express, MongoDB/Mongoose, JWT, Google OAuth, Swagger UI.

## Getting started

1. Встановіть залежності:
   ```bash
   npm i
2. Сконфігуруйте змінні середовища:
   ```bash
   cp .env.example .env
   # Заповніть: MONGODB_URI, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET тощо
3. Запустіть застосунок:
npm run dev   # режим розробки
# або
npm start     # продакшн-запуск 

4. Документація API:
Swagger UI: http://localhost:PORT/api-docs

5. ## Scripts
- `start` — продакшн-запуск.
- `dev` — локальний запуск у режимі розробки.
- `build` — підготовка продакшн-збірки.
- `build-docs` — генерація статичної документації.
- `preview-docs` — локальний перегляд документації.
- `lint` — перевірка стилю коду (ESLint/Prettier).
