# Mountain App

A modern web application for exploring and managing mountain information. Browse, add, edit, and delete mountain entries with detailed geographical data.

## Prerequisites

Before you begin, ensure you have the following installed:

- **[Docker Desktop]** - Make sure it's running before executing any commands

---

## Getting Started

Follow these steps to get the Mountain App up and running:

### 1. Start Docker Desktop

Ensure Docker Desktop is running on your machine.

### 2. Start the Containers

Open your terminal in the project root folder and run:

```bash
docker-compose up -d
```

### 3. Access the Application

Once the containers are running, you can access:

- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **Backend API**: [http://localhost:9000](http://localhost:9000)

---

## Database Seeding

To reset the database and populate it with sample mountain data:

```bash
docker-compose exec backend php artisan migrate:fresh --seed
```

> **Warning**: This command will drop all existing tables and data before recreating them.

---

## Tech Stack

- **Backend**: Laravel (PHP)
- **Frontend**: Angular
- **Database**: MySQL
- **Containerization**: Docker
