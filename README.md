# 📒 MyContacts

Une application web (MongoDB, Express, React, Node.js)** permettant de gérer ses contacts personnels avec un système d’authentification sécurisée par **JWT**.  

## 🚀 Fonctionnalités

- **Authentification JWT**
  - Inscription avec email + mot de passe
  - Connexion et récupération de token JWT
  - Récupération des infos utilisateur connecté
- **Gestion des contacts**
  - Création d’un contact
  - Lecture de tous les contacts de l’utilisateur
  - Mise à jour d’un contact existant
  - Suppression d’un contact
- **Sécurité**
  - Hash des mots de passe avec **bcrypt**
  - Middleware d’authentification pour sécuriser les routes
  - Protection via **Helmet** et **CORS**
- **Documentation API**
  - Accessible via **Swagger UI** à l’adresse :  
    👉 `http://localhost:5000/api/docs`

---

## 📂 Arborescence du projet

```
backend/
  ├── src/
  │   ├── config/
  │   │   ├── database.js
  │   │   ├── swagger.js
  │   ├── controllers/
  │   │   ├── authController.js
  │   │   ├── contactController.js
  │   ├── middleware/
  │   │   ├── auth.js
  │   ├── models/
  │   │   ├── Contact.js
  │   │   ├── User.js
  │   ├── routes/
  │   │   ├── authRoutes.js
  │   │   ├── contactRoutes.js
  │   ├── utils/
  │   │   ├── jwt.js
  │   ├── app.js
  ├── .env
  ├── package.json
  ├── server.js
frontend/
  ├── src/
  │   ├── services/
  │   │   ├── api.js
  │   │   ├── authServices.js
  │   ├── pages/
  │   │   ├── Login.js
  │   │   ├── Register.js
  │   │   ├── Contacts.js
  ├── package.json
```

---

## ⚙️ Installation

### 1️⃣ Backend
```bash
cd backend
npm install
```

Créer un fichier `.env` :  
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mycontacts
JWT_SECRET=ton-secret-ultra-securise
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

Lancer le serveur backend :
```bash
npm run dev
```

### 2️⃣ Frontend
```bash
cd frontend
npm install
npm start
```

---

## 📌 Endpoints principaux

### 🔑 Auth
- `POST /api/auth/register` → Inscription
- `POST /api/auth/login` → Connexion
- `GET /api/auth/infos` → Infos utilisateur (JWT requis)

### 👥 Contacts (JWT requis)
- `GET /api/contacts` → Récupérer tous les contacts
- `POST /api/contacts` → Ajouter un contact
- `PATCH /api/contacts/:id` → Modifier un contact
- `DELETE /api/contacts/:id` → Supprimer un contact

---

## 📖 Documentation Swagger

👉 [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

---

## 🛠️ Stack technique

- **Backend :** Node.js, Express, MongoDB, Mongoose
- **Frontend :** React + Axios
- **Sécurité :** JWT, bcrypt, Helmet, CORS
- **Doc API :** Swagger UI

---

## 👨‍💻 Auteur

Projet développé par **BilalBSK** 🚀
