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
MONGO_URI=mongodb://root:secure_root_password@localhost:27017/db_name?authSource=admin

# Application Backend
MONGODB_URI=mongodb://app_backend:app_backend_password@localhost:27017/db_name?authSource=db_name
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

#### 6. Démarrer le frontend

```bash
cd frontend
npm run dev
```

Le site sera disponible à l'adresse `http://localhost:5173`

## Permissions MongoDB (point 2.1)

Les utilisateurs avec leurs permissions sont créés automatiquement via `/docker-entrypoint-initdb.d/mongo-init.js`

#### **Utilisateur 1 : `app_backend`**

- Mot de passe : `app_backend_password`
- Base de données : `db_name`
- Permissions :
  - `dbOwner` : Hérite de 3 roles qui sont : readWrite, dbAdmin, userAdmin
    - Créer des collections
    - Créer/modifier des index
    - CRUD
    - Modifications de schémas
    - Gestion de roles

#### **Utilisateur 2 : `admin_app`**

- Mot de passe : `admin_app_password`
- Base de données : `db_name`
- Permissions :
  - `dbAdmin` : Admin de la database
    - Créer des index
    - Voir les statistiques
    - Modifications de schémas
  - `userAdmin` : Gérer les utilisateurs
    - Créer/modifier/supprimer les utilisateurs dans la database

#### **Utilisateur 3 : `backup_user`**

- Mot de passe : `backup_user_password`
- Permissions :
  - `readAnyDatabase` : Lecture seule globale
    - Peut lire toutes les databases
    - Ne peut pas modifier les données

## Backup base de données (point 2.2)

La commande suivante réalise une sauvegarde complète de la base de données avec l'année, le mois, le jour, l'heure, la minute, la secondes comme nom de backup tout en compressant les données :

```bash
docker-compose exec mongo mongodump --uri "mongodb://user_name:admin_password@localhost:27017/db_name?authSource=admin" --out="./backupdb/backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')" --gzip
```

- `--uri` URI de connexion avec credentials de l'utilisateur `backup_user`
- `--out=./backup_$(date ...)` Dossier de sortie avec la date
- `--gzip` Compression GZIP qui réduit la taille de la backup
- `--db db_todoapp` Sauvegarde uniquement la base de l'application

La commande restaure les données à partir d'une backup réalisée à l'aide de la commande ci-dessus :

```bash
docker-compose exec mongo mongorestore --uri "mongodb://user_name:admin_password@localhost:27017/db_name?authSource=admin" --gzip ./backupdb/backup_yyyyMMdd_HHmmss
```

## Usage de lʼIA

J'ai utilisé l'IA au début pour m'aider à comprendre la structure de l'app et le fonctionnement d'Express, puis je l'ai principalement utilisée pour Redis car j'ai trouvé que la documentation en ligne sur Redis était très limitée, ce qui m'a énormément freiné et m'a obligé à recourir à l'IA. Finalement, je l'ai utilisée pour le README.md : je marquais tout le texte de façon « brute », puis je l'organisais par chapitre et après avoir tout noté, j'ai sollicité l'IA pour rendre mes explications les plus claires possible.

## Conclusion

En conclusion, j'ai trouvé ce projet bien plus exigeant que sa pondération de 24 périodes ne le laissait supposer. Sa difficulté provenait de plusieurs facteurs : la découverte de l'application en début de projet, la compréhension en simultané de Sequelize et l'apprentissage de Redis, et un contenu de module que je trouve peu en rapport avec ce projet. Cependant, ces défis m'ont poussé à me former et à m'auto-documenter, ce qui n'a pas été du temps perdu. Je ressors de ce projet avec de meilleurs connaissances sur la migration d'un ORM relationnel vers une base de données non-relationnelle, une compétence qui me sera peut-être utile dans le futur.
