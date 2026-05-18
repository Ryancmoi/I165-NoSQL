# I165-NoSQL

## Description du projet

Le but de ce projet est de migrer une ToDo app web qui utilise un système de base de données relationnel (SQL), vers un système de base de données non relationnel(NoSQL), en passant de l'ORM "MySQL" à "Mongoose".

## Technologies utilisées

- Mongoose
- Express
- Vue.js
- Node.js
- Redis
- Docker
- Vite
- TypeScipt
- Tailwind CSS
- ESLint
- Prettier
- Cypress

## 3. Instructions de fonctionnement local

### Prérequis

- Docker et Docker Compose installés
- Node.js 20+
- Git

### Installation

#### 1. Cloner le repository

```bash
git clone https://github.com/yourusername/165-todo-app.git
cd 165-todo-app/todo-app-mysql-1.0.7
```

#### 2. Configuration du .env

Créer un fichier `.env` à la racine du projet :

```bash
cp .env.example .env
```

Éditer `.env` avec vos paramètres :

```env
# MongoDB
MONGO_ROOT_USERNAME=root
MONGO_ROOT_PASSWORD=secure_root_password
MONGO_URI=mongodb://root:secure_root_password@localhost:27017/db_todoapp?authSource=admin

# Application Backend
MONGODB_URI=mongodb://app_backend:app_backend_password@localhost:27017/db_todoapp?authSource=db_todoapp
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=redis_password

# JWT
JWT_SECRET=jwt_secret_key_here

# Server
PORT=3000
NODE_ENV=development
```

#### 3. Démarrer les services avec Docker Compose

```bash
docker-compose up -d
```

Cela démarre :

- MongoDB (port 27017)
- Redis Stack (port 6379, UI sur 8001)
- (MySQL - inutile vous pouvez l'arrêter)

#### 4. Installer les dépendances

```bash
# Backend
cd backend
npm install

# Frontend (dans un autre terminal)
cd frontend
npm install
```

#### 5. Démarrer le backend

```bash
cd backend
npm run dev
```

#### 6. Démarrer le frontend (optionnel pour dev)

```bash
cd frontend
npm run dev
```

Le site sera disponible à l'adresse `http://localhost:5173`

## Permissions MongoDB (point 2.1)

## Backup base de données (point 2.2)

```bash
docker-compose exec mongo mongodump --uri "mongodb://admin_user:admin_pwd@localhost:27017/db_todoapp?authSource=admin" --out="./backupdb/backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')" --gzip
```

```bash
docker-compose exec mongo mongorestore --uri "mongodb://admin_user:admin_pwd@localhost:27017/db_todoapp?authSource=admin" --gzip ./backupdb/backup_20260518_090918
```

## Usage de lʼIA

## Conclusion
