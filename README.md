# 🎬 APIs-Collection-with-TS

This is a **Movie API Collection** built with **TypeScript**, using different setups for **MongoDB** and **PostgreSQL**.

---

## 👋 Hey, welcome back mate!

This project is a small collection of APIs — well, technically **one Movie API**, but implemented in **different ways** using various database engines and tools.  
The goal is to show **how the same concept can evolve** across setups, from a simple CRUD to a more complete and structured API.

---

## 🌿 Branches and Levels

The repository is divided into **branches** and **directory levels**, to help you explore each version of the API progressively:

### 🧠 Branches

- **`main`**  
  This is the “lobby” of the project.  
  It only contains:
  - General documentation (this README)
  - The `.env.example` file
  - A small txt witht the general npm packages used on this project

- **`mongoose`**  
  Contains the Movie API built with **MongoDB + Mongoose**.  
  Inside this branch, you’ll find folders such as:
  - `api_basica/` → A minimal CRUD setup using Express and Mongoose  
  - `api_intermedia/` → Adds validations, better structure, and new npm packages
  -  `api-with-consumer/`  → A variant API with a consumer using RabbitMQ for this task

- **`prisma`**  
  Contains the Movie API built with **PostgreSQL + Prisma ORM**.  
  Inside this branch:
  - `api_basica_nodemon/` → Basic CRUD example with Prisma  
---

## 🗂️ File Structure

Here’s a visual overview of how the project is structured (mostly):

![structure-schema](/images/schema.png)

Each branch keeps its own folder organization, so you can switch between them and test independently.

---

## ⚙️ Things to Keep in Mind

- All setups use **dotenv** to protect credentials.  
  Yes, it’s a bit overkill for local environments — but hey, it’s good habit.  

- The **data format** for each movie document is:
  ```json
  {
    "title": "string",
    "director": "string",
    "year": number,
    "genres": ["string", "string"]
  }
