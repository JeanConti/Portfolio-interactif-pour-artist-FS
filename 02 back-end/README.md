Projet Portfolio Interactif pour Artits

Creation dossier

Installation des modules Back-End:


Installation des modules Back-End:
  - Server => Express
  - DataBase => Prisma + MySQL


/portfolio-artist
│
├── /frontend
│   ├── /public
│   ├── /src
│   │   ├── assets/ (images, fonts, styles SASS)
│   │   ├── components/ (React/Vue/Angular)
│   │   ├── pages/ (Home, Galerie, Contact, About)
│   │   ├── services/ (Appels API)
│   │   └── main.js / App.js
│
├── /backend
│   ├── /src
│   │   ├── routes/ (API endpoints : /artists, /works, /contact)
│   │   ├── controllers/ (logique métier)
│   │   ├── models/ (Prisma ou Sequelize)
│   │   ├── middleware/ (auth, validation)
│   │   └── app.js (Express server)
│   ├── prisma/ (si Prisma)
│
├── /docs
│   ├── architecture.md
│   ├── api.md (documentation API)
│   └── readme.md
│
└── package.json
