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
