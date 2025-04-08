# Turning Point - Back End

> ⚙️ A back-end API server built with **NestJS**, using **Prisma ORM**, **JWT authentication**, and **Swagger** for documentation. This project serves as the backend for the Turning Point application.

---

## 📦 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **ORM**: Prisma
- **Authentication**: Passport + JWT
- **Validation**: class-validator & class-transformer
- **Date Utilities**: date-fns, luxon
- **Documentation**: Swagger (via `@nestjs/swagger`)
- **Testing**: Jest, Supertest
- **Environment Configuration**: dotenv
- **Build Tools**: SWC, ts-node, ts-loader

---

## 📂 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/turning-point-back-end.git
cd turning-point-back-end
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file at the root of the project and configure your environment variables:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/dbname
JWT_SECRET=your-secret-key
PORT=3000
```

### 4. Setup Prisma

Generate Prisma client from schema:

```bash
npx prisma generate
```

Push the schema to the database:

```bash
npx prisma db push
```

(Optional) Seed your database:

```bash
npx prisma db seed
```

---

## 🚀 Scripts

| Command              | Description                              |
|----------------------|------------------------------------------|
| `npm run start`      | Start the app in production mode         |
| `npm run start:dev`  | Start the app in watch (dev) mode        |
| `npm run start:debug`| Start the app with debug flags           |
| `npm run build`      | Build the app using NestJS compiler      |
| `npm run test`       | Run unit tests with Jest                 |
| `npm run test:watch` | Watch and run tests on file change       |
| `npm run test:cov`   | Run tests and collect coverage           |
| `npm run lint`       | Lint the project and auto-fix issues     |
| `npm run format`     | Format all source and test files         |

---

## 🧪 Testing

To run the full test suite:

```bash
npm run test
```

To run end-to-end (E2E) tests:

```bash
npm run test:e2e
```

---

## 🛠 Project Structure (Simplified)

```
turning-point-back-end/
├── src/
│   ├── auth/             # Authentication modules (JWT, Passport)
│   ├── modules/          # Feature-based modules
│   ├── common/           # Common utilities, DTOs, decorators
│   ├── prisma/           # Prisma service and client setup
│   └── main.ts           # Application entry point
├── test/                 # E2E test files
├── prisma/
│   └── schema.prisma     # Prisma schema definition
├── .env                  # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧾 Swagger API Docs

Once the app is running, you can access the Swagger UI at:

```
http://localhost:3000/api
```

---

## 📄 License

This project is **UNLICENSED**. All rights reserved.

---
