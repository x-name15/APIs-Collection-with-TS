# 🍃 Mongoose Branch — APIs-Collection-with-TS

This branch contains the **Movie API Collection** built with **TypeScript + MongoDB + Mongoose**.

Each folder here represents a different **level of complexity**, showing how the same API evolves — from a simple CRUD to one with HALSON responses and a test consumer.

---

## 🧩 Structure

Inside this branch, you’ll find **three folders**:

### 1. 🧱 `api_basica_mongoose/`
> "Ah yes, that one begginer level" – yep.

A basic CRUD API using **Express + Mongoose**, built to show how to connect to MongoDB, define schemas, and handle simple routes.  
This version also includes **Vitest** for basic mocking and testing.

**Includes:**
- Simple Mongoose model for `Movie`
- CRUD routes (create, read, update, delete)
- Unit tests using Vitest mocks (because testing in local still counts 😎 and they told me to do that here xd)

---

### 2. ⚙️ `api-intermedia-halson-vite/`
> An “Intermediate Level” for the padawan – where structure and fancy stuff start showing up.

This version improves the project architecture and adds **HALSON responses** (Hypertext Application Language + JSON).  
Basically, each response now contains hypermedia links to related resources, making the API feel more *REST-ful and connected*.

**Includes:**
- Better folder structure (controllers, services, models)
- HALSON (HATEOAS-style) responses
- Improved error handling and data validation

---

### 3. 🔄 `api-with-consumer/`
> The “Mid-Level Boss” – the API that consumes itself.

This version is essentially the same Movie API as before, but now it includes a **consumer** that interacts with it — like a client test or integration mock.

**Includes:**
- Everything from `api-intermedia-halson`
- A simple consumer service that fetches data from the API
- Example of how to test API integration logic
- Useful for simulating external requests or testing deployments

---
## 🗃️ And the Database Example?
- Ajusted the folder with only mongoDB and mongoose examples to this branch too
---

## ⚙️ Things to Keep in Mind

- All versions use **dotenv** to handle credentials and environment configs.
  - Yes, it’s running locally, but let’s pretend we’re professionals 😎
- Each API uses this **JSON structure** for movie data:
  ```json
  {
    "title": "string",
    "director": "string",
    "year": number,
    "genres": ["string", "string"]
  }
