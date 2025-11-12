# Mountain App

A modern web application for exploring and managing mountain information. Browse, add, edit, and delete mountain entries with detailed geographical data.

## Prerequisites

Before you begin, ensure you have the following installed:

- **[Docker Desktop]** - Make sure it's running before executing any commands

---

## Getting Started

Follow these steps to get the Mountain App up and running:

### 1. Configure Environment Variables

Create a `.env` file in the `backend` folder with the following content:

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:wp+n0eFxKEX3VvCJJLoFwhYr0rzisPZ/CYOiQMF535s=
APP_DEBUG=true
APP_URL=http://localhost:9000

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=mountain_app
DB_USERNAME=root
DB_PASSWORD=root

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
```

### 2. Start Docker Desktop

Ensure Docker Desktop is running on your machine.

### 3. Start the Containers

Open your terminal in the project root folder and run:

```bash
docker-compose up -d
```

### 4. Access the Application

Once the containers are running, you can access:

- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **Backend API**: [http://localhost:9000](http://localhost:9000)

---

## 💾 Database Seeding

To reset the database and populate it with sample mountain data:

```bash
docker-compose exec backend php artisan migrate:fresh --seed
```

> ⚠️ **Warning**: This command will drop all existing tables and data before recreating them.

---

## 🛠️ Tech Stack

- **Backend**: Laravel (PHP)
- **Frontend**: Angular
- **Database**: MySQL
- **Containerization**: Docker
