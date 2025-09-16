# 📒 MyContacts - Application de Gestion de Contacts

Une application web complète **MERN Stack** (MongoDB, Express, React, Node.js) permettant de gérer ses contacts personnels avec un système d'authentification sécurisé par **JWT**.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.x-blue)

## 🌟 Aperçu

MyContacts est une application moderne permettant aux utilisateurs de gérer efficacement leurs contacts personnels. L'application offre une interface intuitive avec authentification sécurisée et toutes les opérations CRUD pour la gestion des contacts.

### 🔗 Liens de démonstration

- **Frontend :** [https://mycontacts-front.onrender.com](https://mycontacts-front.onrender.com)
- **Backend API :** [https://mycontacts-z3sx.onrender.com](https://mycontacts-z3sx.onrender.com)
- **Documentation API :** [https://mycontacts-z3sx.onrender.com/api/docs](https://mycontacts-z3sx.onrender.com/api/docs)

---

## 🚀 Fonctionnalités

### 🔐 Authentification JWT
- ✅ Inscription avec validation email + mot de passe
- ✅ Connexion sécurisée avec génération de token JWT
- ✅ Récupération des informations utilisateur connecté
- ✅ Déconnexion automatique en cas d'expiration du token

### 👥 Gestion des Contacts
- ✅ **Création** d'un nouveau contact (prénom, nom, téléphone)
- ✅ **Lecture** de tous les contacts de l'utilisateur connecté
- ✅ **Modification** d'un contact existant
- ✅ **Suppression** avec confirmation utilisateur
- ✅ Interface utilisateur moderne et responsive

### 🛡️ Sécurité
- ✅ Hash des mots de passe avec **bcrypt** (salt rounds: 10)
- ✅ Middleware d'authentification pour sécuriser les routes privées
- ✅ Protection CORS configurée
- ✅ Validation des données côté serveur
- ✅ Headers de sécurité avec **Helmet**

### 📚 Documentation
- ✅ API complètement documentée avec **Swagger UI**
- ✅ Schémas de réponses et codes d'erreur détaillés
- ✅ Exemples d'utilisation pour chaque endpoint

---

## 📂 Architecture du Projet

```
mycontacts/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # Configuration MongoDB
│   │   │   └── swagger.js           # Configuration Swagger
│   │   ├── controllers/
│   │   │   ├── authController.js    # Logique authentification
│   │   │   └── contactController.js # Logique contacts
│   │   ├── middleware/
│   │   │   └── auth.js              # Middleware JWT
│   │   ├── models/
│   │   │   ├── User.js              # Modèle utilisateur
│   │   │   └── Contact.js           # Modèle contact
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Routes authentification
│   │   │   └── contactRoutes.js     # Routes contacts
│   │   ├── utils/
│   │   │   └── jwt.js               # Utilitaires JWT
│   │   └── app.js                   # Configuration Express
│   ├── .env                         # Variables d'environnement
│   ├── server.js                    # Point d'entrée serveur
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── _redirects               # Configuration routing
│   │   └── index.html
│   ├── src/
│   │   ├── services/
│   │   │   ├── api.js               # Configuration Axios
│   │   │   ├── authServices.js      # Services authentification
│   │   │   └── contactServices.js   # Services contacts
│   │   ├── pages/
│   │   │   ├── Login.js             # Page connexion
│   │   │   ├── Register.js          # Page inscription
│   │   │   └── Contacts.js          # Page gestion contacts
│   │   ├── App.js                   # Composant principal
│   │   └── index.js                 # Point d'entrée React
│   ├── .env                         # Variables d'environnement
│   └── package.json
└── README.md
```

---

## ⚙️ Installation & Lancement

### 📋 Prérequis

- **Node.js** ≥ 16.0.0
- **npm** ≥ 8.0.0
- **MongoDB** (local ou Atlas)
- **Git**

### 🔧 Installation Locale

#### 1️⃣ Cloner le Repository
```bash
git clone https://github.com/votre-username/mycontacts.git
cd mycontacts
```

#### 2️⃣ Configuration Backend
```bash
cd backend
npm install
```

Créer le fichier `.env` dans le dossier `backend/` :
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mycontacts
JWT_SECRET=votre-secret-ultra-securise-ici
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

Lancer le serveur backend :
```bash
npm run dev
```
✅ **Serveur backend disponible sur :** `http://localhost:5000`

#### 3️⃣ Configuration Frontend
```bash
cd frontend
npm install
```

Créer le fichier `.env` dans le dossier `frontend/` :
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Lancer l'application React :
```bash
npm start
```
✅ **Application frontend disponible sur :** `http://localhost:3000`

### 🌐 Déployement Production

L'application est déployée sur **Render** :
- **Backend :** Service Web avec build automatique
- **Frontend :** Site statique avec redirection React Router

Variables d'environnement production :
- `MONGODB_URI` : URI MongoDB Atlas
- `JWT_SECRET` : Secret JWT sécurisé
- `FRONTEND_URL` : URL du frontend déployé
- `REACT_APP_API_URL` : URL du backend déployé

---

## 📌 API Endpoints

### 🔑 Authentification

| Méthode | Endpoint | Description | Auth Required |
|---------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Inscription utilisateur | ❌ |
| `POST` | `/api/auth/login` | Connexion utilisateur | ❌ |
| `GET` | `/api/auth/infos` | Infos utilisateur connecté | ✅ |

#### Exemples d'utilisation :

**Inscription :**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "motdepasse123"
  }'
```

**Connexion :**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "motdepasse123"
  }'
```

### 👥 Gestion des Contacts (JWT Requis)

| Méthode | Endpoint | Description | Auth Required |
|---------|----------|-------------|---------------|
| `GET` | `/api/contacts` | Récupérer tous les contacts | ✅ |
| `POST` | `/api/contacts` | Créer un nouveau contact | ✅ |
| `PATCH` | `/api/contacts/:id` | Modifier un contact | ✅ |
| `DELETE` | `/api/contacts/:id` | Supprimer un contact | ✅ |

#### Exemples d'utilisation :

**Récupérer les contacts :**
```bash
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Créer un contact :**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+33123456789"
  }'
```

---

## 📖 Documentation API Interactive

La documentation complète de l'API est disponible via **Swagger UI** :

### 🌐 En ligne
👉 **[Documentation API Live](https://mycontacts-z3sx.onrender.com/api/docs)**

### 💻 En local
👉 **[http://localhost:5000/api/docs](http://localhost:5000/api/docs)**

La documentation Swagger inclut :
- 📋 Liste complète des endpoints
- 📝 Schémas de requêtes/réponses
- 🧪 Interface de test interactive
- 🔍 Codes d'erreur détaillés
- 💡 Exemples d'utilisation

---

## 🛠️ Stack Technique

### Backend
- **Runtime :** Node.js 18.x
- **Framework :** Express.js 4.x
- **Base de données :** MongoDB avec Mongoose
- **Authentification :** JSON Web Token (JWT)
- **Sécurité :** bcrypt, Helmet, CORS
- **Documentation :** Swagger UI
- **Validation :** express-validator

### Frontend
- **Framework :** React 18.x
- **Routing :** React Router DOM 6.x
- **HTTP Client :** Axios
- **Build Tool :** Create React App

### DevOps & Déployement
- **Hébergement :** Render
- **Base de données :** MongoDB Atlas
- **Monitoring :** Logs Render natifs

---

## 🚦 Scripts Disponibles

### Backend
```bash
npm run dev        # Lancement mode développement avec nodemon
npm start          # Lancement mode production
npm run test       # Exécution des tests (à implémenter)
```

### Frontend
```bash
npm start          # Serveur de développement React
npm run build      # Build de production
npm run build:render # Build spécifique Render avec _redirects
npm test           # Tests unitaires React
```

---

## 🔒 Sécurité

### Mesures Implémentées
- ✅ **Hash des mots de passe** avec bcrypt (salt rounds: 10)
- ✅ **JWT sécurisé** avec expiration configurable
- ✅ **Validation côté serveur** de toutes les entrées
- ✅ **Headers de sécurité** via Helmet
- ✅ **CORS configuré** pour les origines autorisées
- ✅ **Variables d'environnement** pour les secrets
- ✅ **Middleware d'authentification** sur routes privées

### Bonnes Pratiques
- Tokens JWT avec expiration courte (7 jours)
- Nettoyage automatique des tokens expirés côté client
- Validation des formats email et longueur mot de passe
- Gestion d'erreurs sécurisée (pas d'exposition d'infos sensibles)

---

## 📄 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.
