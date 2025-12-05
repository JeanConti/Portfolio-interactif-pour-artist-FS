<h1>🎨 Portfolio Artistique Interactif – Projet Web Full-Stack</h1>

<p>
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License Badge">
  <img src="https://img.shields.io/badge/status-en%20développement-blue" alt="Status Badge">
  <img src="https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20Bootstrap%20%7C%20EJS%20%7C%20NestJS-orange" alt="Stack Badge">
  <img src="https://img.shields.io/badge/node.js-339933?logo=node.js&logoColor=white" alt="Node.js Badge">
  <img src="https://img.shields.io/badge/version-1.0.0-purple" alt="Version Badge">
</p>

<hr>

<h2>✨ Présentation Générale du Projet</h2>

<p>
Ce projet consiste à développer un <strong>portfolio interactif et moderne</strong> destiné à un artiste ou une agence créative.
L’objectif est de proposer une plateforme élégante, responsive et facilement administrable, permettant de mettre en valeur les œuvres, les services et l’identité artistique.
</p>

<p>
Le projet est construit en trois blocs :
</p>

<ul>
  <li>1️⃣ <strong>Création d’interfaces front-end</strong> (HTML, CSS, Bootstrap)</li>
  <li>2️⃣ <strong>Dynamisation des pages</strong> via EJS</li>
  <li>3️⃣ <strong>Développement d’un back-office</strong> complet avec NestJS</li>
</ul>

<p>L’ensemble forme un système complet : <strong>élégant côté front, puissant côté back</strong>.</p>

<hr>

<h2>🎯 1 — Création des pages HTML avec CSS & Bootstrap</h2>

<p>
Cette première étape consiste à concevoir l’interface visuelle et l’ergonomie du portfolio.
Elle comprend :
</p>

<ul>
  <li>Création des pages principales : Home, About, Portfolio, Contact</li>
  <li>Utilisation du framework <strong>Bootstrap 5</strong> pour assurer la responsivité</li>
  <li>Mise en place de : navbar responsive, carrousels, cartes de services, grilles, etc.</li>
  <li>Animations et transitions fluides pour améliorer l’expérience utilisateur</li>
</ul>

<p>
Objectif : créer une base solide, moderne et adaptable sur tous les écrans.
</p>

<hr>

<h2>⚙️ 2 — Dynamisation du front avec EJS</h2>

<p>
Pour rendre les pages plus modulaires et éviter la duplication, la structure du site a été reconstruite avec
<strong>EJS</strong>.
</p>

<p>Grâce à EJS :</p>

<ul>
  <li>Création de partials (header, footer, navigation)</li>
  <li>Injection dynamique du contenu dans les vues</li>
  <li>Structure plus simple, propre et maintenable</li>
  <li>Centralisation de la logique d’affichage</li>
</ul>

<p>
Résultat : un site dynamique qui combine structure HTML et rendu basé sur les données.
</p>

<hr>

<h2>🛡 3 — Développement de l’administration avec NestJS</h2>

<p>
La troisième partie du projet consiste à développer un <strong>back-office sécurisé</strong> avec <strong>NestJS</strong>.
</p>

<p>Fonctionnalités clés :</p>

<ul>
  <li>API REST complète (modules, controllers, services)</li>
  <li>CRUD pour gérer les projets, images, services et utilisateurs</li>
  <li>Système d’authentification et de sécurisation des routes</li>
  <li>Connexion à la base de données via Prisma ou TypeORM</li>
  <li>Administration simple pour modifier le contenu du site</li>
</ul>

<p>
NestJS offre une architecture professionnelle, modulaire et évolutive.
</p>

<hr>

<h2>📱 Responsive Design</h2>

<p>
Le site est entièrement optimisé pour tous types d’appareils :
</p>

<ul>
  <li>📱 Smartphones</li>
  <li>📲 Tablettes</li>
  <li>💻 Laptops</li>
  <li>🖥 Écrans larges</li>
</ul>

<p>
Grâce à Bootstrap, aux media queries et à une grille flexible, l’interface reste fluide,
légère et intuitive.
</p>

<hr>

<h2>🚀 Résultat Final</h2>

<p>Le site final offre :</p>

<ul>
  <li>✨ Une interface moderne et immersive</li>
  <li>✨ Une navigation fluide et responsive</li>
  <li>✨ Un système de pages dynamiques</li>
  <li>✨ Un back-office puissant pour gérer le contenu</li>
  <li>✨ Un code structuré et optimisé pour le SEO</li>
</ul>

<p>
Ce projet allie <strong>créativité</strong>, <strong>performance</strong> et <strong>architecture solide</strong>.
</p>

<hr>

<h2>🧰 Stack Technique</h2>

<table>
  <tr>
    <th>Domaine</th>
    <th>Technologies</th>
  </tr>
  <tr>
    <td>🎨 Front-End</td>
    <td>HTML5, CSS3, Bootstrap 5</td>
  </tr>
  <tr>
    <td>🧩 Templating</td>
    <td>EJS</td>
  </tr>
  <tr>
    <td>⚙️ Back-End</td>
    <td>Javascript, NodeJS et NestJS</td>
  </tr>
  <tr>
    <td>🗄 Base de données</td>
    <td>Prisma et MySQL</td>
  </tr>
  <tr>
    <td>🔧 Outils</td>
    <td>VS Code, npm</td>
  </tr>
</table>

<hr>

<<<<<<< HEAD
<h2>📂 Structure du projet</h2>

<pre>
/portfolio interactif pour artist
│
├── /01 front-end
│   ├── /public
│   ├── /src
│   │   ├── assets/ (images, fonts, styles SASS)
│   │   ├── components/ (React/Vue/Angular)
│   │   ├── pages/ (Home, Galerie, Contact, About)
│   │   ├── services/ (Appels API)
│   │   └── main.js / App.js
│
├── /02 back-end
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
</pre>

<hr>

=======
>>>>>>> 2ec2099fe217b956f874e3bce4826b7b593640b2
<h2>📨 Contact</h2>

<p>
👤 <strong>Développeur :</strong> Jean-Michel Conti<br>
📧 <strong>Email :</strong> jeanmichelconti.dev@gmail.com<br>
🔗 <strong>Portfolio :</strong> https://tonportfolio.com
</p>

<hr>

<p align="center"><strong>✨ Merci d’avoir consulté ce projet ! ✨</strong></p>
