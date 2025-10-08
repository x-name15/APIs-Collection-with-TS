# 💎 Prisma Branch — APIs-Collection-with-TS

This branch contains the **Movie API Collection** built with **TypeScript + PostgreSQL + Prisma**.

It’s a simpler setup compared to `mongoose`, focusing on **basic CRUD with Prisma**, plus some dev-friendly tools like **Vitest** and **Nodemon** for hot reloads.

---

## 🧩 Structure

Inside this branch, there’s only **one main folder** (for now):

### 1. 🏗️ `api_basica_prisma_nodemon/`
> The “Basic Level” – straightforward, clean, and developer-friendly.

This folder implements a **basic Movie API** using **Prisma** as ORM and **PostgreSQL** as database.  
It’s designed for **learning how Prisma works** and how to structure a minimal API project with TypeScript.

**Includes:**
- Prisma schema for `Movie`
- Basic CRUD routes
- **Vitest** for mocking controller logic
- **Nodemon** for hot reloads (useful for Docker or local dev)
- Minimal project structure for fast iteration

---

## ⚙️ Things to Keep in Mind

- The JSON format for movie entries is:
  ```json
  {
    "title": "string",
    "director": "string",
    "year": number,
    "genres": ["string", "string"]
  }
