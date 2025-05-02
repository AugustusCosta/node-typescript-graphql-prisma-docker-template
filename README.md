# 🐾 Pet Owner API - Case Study

This project is a **case study** demonstrating a modern backend architecture using:

* **Node.js** with **TypeScript**
* **Express** (for REST APIs)
* **Apollo Server** (for GraphQL APIs)
* **Prisma ORM** (for PostgreSQL database access)
* **Docker** (for database containerization)
* **Jest** and **Supertest** (for testing)

It serves as a practical example of how to structure, implement, and test a real-world Node.js backend application.

---

## 🚀 Technologies Used

* **Node.js** (Runtime)
* **TypeScript** (Language)
* **Express** (REST Framework)
* **Apollo Server** (GraphQL API)
* **GraphQL** (API Specification)
* **Prisma ORM** (Database access and migrations)
* **PostgreSQL** (Database)
* **Docker** (Environment/container management)
* **Jest** (Unit and integration tests)
* **Supertest** (API testing)
* **pgAdmin** (PostgreSQL management tool)

---

## 🏦 Architecture Overview

```
src/
  controller/    → REST API Controllers
  dto/           → Data Transfer Objects
  entity/        → Application Entities
  graphql/       
    schema.ts    → GraphQL Schema (typeDefs)
    resolvers.ts → GraphQL Resolvers
  service/       → Business Logic Services
  database/      
    prisma.ts    → Prisma Client Instance
  tests/         
    integration/
      rest/      → REST API Integration Tests
      graphql/   → GraphQL API Integration Tests
    unit/        → Unit Tests
prisma/
  schema.prisma  → Prisma Database Schema
docker-compose.yml → Docker containers (Postgres + pgAdmin)
.env             → Environment variables
package.json     → Project Configuration
```

---

## 📋 Requirements

* Docker and Docker Compose
* Node.js >= 18
* Yarn (recommended)

---

## ⚙️ Environment Setup (Step-by-Step)

### 1. Install Docker

Make sure Docker is installed and running on your machine.

[Install Docker →](https://docs.docker.com/get-docker/)

---

### 2. Clone the Repository

```bash
git clone https://github.com/AugustusCosta/node-typescript-graphql-prisma-docker-template.git
cd pet-owner-api
```

---

### 3. Install Node.js Dependencies

```bash
yarn install
```

---

### 4. Set Up Environment Variables

Done

Adjust if necessary (default works for Docker setup):

```env
DATABASE_URL="postgresql://petowner:petowner@localhost:5432/petownerdb?schema=public"
```

---

### 5. Start Database Containers (Postgres + pgAdmin)

```bash
docker-compose up -d
```

This will start:

* PostgreSQL at `localhost:5432`
* pgAdmin at `http://localhost:5050`

---

### 6. Prisma Database Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run initial database migration:

```bash
npx prisma migrate dev --name init
```

---

### 7. Start the Application

```bash
yarn start
```

Server will start on:

```bash
http://localhost:4000
```

---

## 🧪 Running the Tests

To run all tests:

```bash
yarn test
```

To check code coverage:

```bash
yarn test --coverage
```

Coverage is expected to be **above 90%** across the entire codebase.

---

## 🌟 Using GraphQL Playground

After running the server, access:

```bash
http://localhost:4000/graphql
```

You can run queries and mutations directly from this playground.

Example Query:

```graphql
query {
  owners {
    id
    name
    email
  }
}
```

Example Mutation:

```graphql
mutation {
  createOwner(input: { name: "John Doe", email: "john@example.com" }) {
    id
    name
    email
  }
}
```

---

## 🐘 Accessing Your Database with pgAdmin

Once the containers are up:

1. Open your browser and go to:
   [http://localhost:5050](http://localhost:5050)

2. Login with:

| Field    | Value                                     |
| :------- | :---------------------------------------- |
| Email    | [admin@admin.com](mailto:admin@admin.com) |
| Password | admin                                     |

3. Click **"Add New Server"** → Under "General":

| Field | Value                    |
| :---- | :----------------------- |
| Name  | PetOwnerDB (or any name) |

4. Go to the **"Connection"** tab:

| Field             | Value    |
| :---------------- | :------- |
| Host name/address | postgres |
| Port              | 5432     |
| Username          | petowner |
| Password          | petowner |

5. Save and connect!
   You can now explore your database visually using pgAdmin.

---

## 📈 Useful Commands Summary

| Command                              | Purpose                                 |
| :----------------------------------- | :-------------------------------------- |
| `docker-compose up -d`               | Start PostgreSQL and pgAdmin containers |
| `yarn install`                       | Install project dependencies            |
| `npx prisma generate`                | Generate Prisma client                  |
| `npx prisma migrate dev --name init` | Apply initial database migration        |
| `yarn start`                         | Start the server                        |
| `yarn test`                          | Run unit and integration tests          |
| `yarn test --coverage`               | Check code coverage                     |

---

## 📌 Notes

* This project uses **Prisma ORM** with a real **PostgreSQL** instance inside Docker.
* Tests clean the database before running (`deleteMany`).
* Both REST API (`/api/`) and GraphQL API (`/graphql`) are supported.
* Full async/await support across the entire application.
* 90%+ code coverage by default.

---

## 🧐 About

This repository was built as a **learning case study** for demonstrating clean backend architecture using modern technologies and best practices.

---
