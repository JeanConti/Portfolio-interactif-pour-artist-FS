# EJS Architecture Diagram

## Data Flow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER REQUEST                             │
│                    http://localhost:3900/Home                    │
└──────────────────────────┬──────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                         ROUTES                                   │
│                    (routes/pages.js)                            │
│                                                                  │
│  router.get('/Home', pagesController.home)                      │
└──────────────────────────┬──────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CONTROLLER                                  │
│                 (controllers/pagesController.js)                │
│                                                                  │
│  exports.home = async (req, res) => {                           │
│    // 1. Fetch data from database                               │
│    const artworks = await prisma.artwork.findMany()             │
│                                                                  │
│    // 2. Prepare data for template                              │
│    const pageData = {                                           │
│      title: 'Home',                                             │
│      artworks: artworks,                                        │
│      services: [...]                                            │
│    }                                                             │
│                                                                  │
│    // 3. Render template with data                              │
│    res.render('pages/Home', pageData)                           │
│  }                                                               │
└──────────────────────────┬──────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EJS ENGINE                                  │
│                                                                  │
│  1. Loads layout.ejs                                            │
│  2. Loads partials (header.ejs, footer.ejs)                     │
│  3. Loads page template (pages/Home.ejs)                        │
│  4. Injects data into templates                                 │
│  5. Compiles to HTML                                            │
└──────────────────────────┬──────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      HTML RESPONSE                               │
│                                                                  │
│  <!DOCTYPE html>                                                │
│  <html>                                                          │
│    <head><title>Home</title></head>                            │
│    <body>                                                        │
│      <header>...</header>                                       │
│      <section>                                                   │
│        <h1>We Make Creative Things</h1>                         │
│        <!-- Dynamic content here -->                             │
│      </section>                                                  │
│      <footer>...</footer>                                       │
│    </body>                                                       │
│  </html>                                                         │
└──────────────────────────┬──────────────────────────────────────┘
                          │
                          ▼
                    ┌──────────┐
                    │  BROWSER │
                    └──────────┘
```

## Template Assembly Process

```
┌──────────────────────────────────────────────────────────────────┐
│                        TEMPLATE ASSEMBLY                         │
└──────────────────────────────────────────────────────────────────┘

Step 1: Load Layout
┌────────────────────────────────────────┐
│ layout.ejs                             │
├────────────────────────────────────────┤
│ <!DOCTYPE html>                        │
│ <html>                                 │
│ <head>                                 │
│   <title><%= title %></title>          │  ← Data from controller
│ </head>                                │
│ <body>                                 │
│   <%- include('partials/header') %>   │  ← Step 2
│   <%- body %>                          │  ← Step 4
│   <%- include('partials/footer') %>   │  ← Step 3
│ </body>                                │
│ </html>                                │
└────────────────────────────────────────┘

Step 2: Include Header
┌────────────────────────────────────────┐
│ partials/header.ejs                    │
├────────────────────────────────────────┤
│ <header>                               │
│   <nav>                                │
│     <a href="/Home">Home</a>           │
│     <a href="/About">About</a>         │
│   </nav>                               │
│ </header>                              │
└────────────────────────────────────────┘

Step 3: Include Footer
┌────────────────────────────────────────┐
│ partials/footer.ejs                    │
├────────────────────────────────────────┤
│ <footer>                               │
│   <p>Copyright © 2025</p>              │
│ </footer>                              │
└────────────────────────────────────────┘

Step 4: Insert Page Content
┌────────────────────────────────────────┐
│ pages/Home.ejs                         │
├────────────────────────────────────────┤
│ <section class="home">                 │
│   <h1><%= hero.title %></h1>           │  ← Data from controller
│                                        │
│   <% services.forEach(service => { %>  │  ← Loop through array
│     <%- include('../partials/         │  ← Step 5
│              service-card',            │
│              { service: service }) %>  │
│   <% }) %>                             │
│ </section>                             │
└────────────────────────────────────────┘

Step 5: Include Component Partials
┌────────────────────────────────────────┐
│ partials/service-card.ejs              │
├────────────────────────────────────────┤
│ <div class="card">                     │
│   <h5><%= service.title %></h5>        │  ← Data from parent
│   <p><%= service.description %></p>    │
│ </div>                                 │
└────────────────────────────────────────┘

Final Result: Complete HTML Page
┌────────────────────────────────────────┐
│ Complete HTML sent to browser          │
├────────────────────────────────────────┤
│ <!DOCTYPE html>                        │
│ <html>                                 │
│ <head>                                 │
│   <title>Home</title>                  │
│ </head>                                │
│ <body>                                 │
│   <header>                             │
│     <nav>                              │
│       <a href="/Home">Home</a>         │
│       <a href="/About">About</a>       │
│     </nav>                             │
│   </header>                            │
│                                        │
│   <section class="home">               │
│     <h1>We Make Creative Things</h1>   │
│     <div class="card">                 │
│       <h5>Branding Design</h5>         │
│       <p>Create unique brands</p>      │
│     </div>                             │
│     <div class="card">                 │
│       <h5>Web Development</h5>         │
│       <p>Build websites</p>            │
│     </div>                             │
│   </section>                           │
│                                        │
│   <footer>                             │
│     <p>Copyright © 2025</p>            │
│   </footer>                            │
│ </body>                                │
│ </html>                                │
└────────────────────────────────────────┘
```

## Database to View Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE TO VIEW FLOW                         │
└─────────────────────────────────────────────────────────────────┘

1. DATABASE (MySQL/PostgreSQL)
   ┌──────────────────────┐
   │  Artworks Table      │
   ├──────────────────────┤
   │ id | titre | annee   │
   │ 1  | Logo  | 2023    │
   │ 2  | Web   | 2024    │
   └──────────────────────┘
           │
           │ Prisma Query
           ▼
2. CONTROLLER
   const artworks = await prisma.artwork.findMany()
   
   Result:
   [
     { id: 1, titre: 'Logo', annee: 2023 },
     { id: 2, titre: 'Web', annee: 2024 }
   ]
           │
           │ Pass to template
           ▼
3. EJS TEMPLATE
   <% artworks.forEach(artwork => { %>
     <h3><%= artwork.titre %></h3>
     <p><%= artwork.annee %></p>
   <% }) %>
           │
           │ Compile
           ▼
4. HTML OUTPUT
   <h3>Logo</h3>
   <p>2023</p>
   <h3>Web</h3>
   <p>2024</p>
           │
           │ Send to browser
           ▼
5. BROWSER DISPLAY
   Logo
   2023
   
   Web
   2024
```

## File Organization

```
02 back-end/
│
├── src/
│   │
│   ├── views/                          ← All EJS templates
│   │   │
│   │   ├── layout.ejs                  ← Main wrapper (once)
│   │   │
│   │   ├── partials/                   ← Reusable components
│   │   │   ├── header.ejs              ← Navigation (once)
│   │   │   ├── footer.ejs              ← Footer (once)
│   │   │   ├── service-card.ejs        ← Service card (repeated)
│   │   │   └── article-card.ejs        ← Article card (repeated)
│   │   │
│   │   └── pages/                      ← Page content (unique)
│   │       ├── Home.ejs                ← Home page content
│   │       ├── About.ejs               ← About page content
│   │       ├── Portfolio.ejs           ← Portfolio page content
│   │       └── Contact.ejs             ← Contact page content
│   │
│   ├── controllers/                    ← Business logic
│   │   └── pagesController.js          ← Fetch data, render views
│   │
│   ├── routes/                         ← URL routing
│   │   └── pages.js                    ← Define routes
│   │
│   ├── lib/                            ← Utilities
│   │   └── prisma.js                   ← Database client
│   │
│   └── server.js                       ← Main app file
│
└── node_modules/                       ← Dependencies (ejs, prisma, etc.)
```

## Component Hierarchy

```
                    ┌─────────────┐
                    │  layout.ejs │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
      ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
      │ header  │    │ page    │    │ footer  │
      │  .ejs   │    │ content │    │  .ejs   │
      └─────────┘    └────┬────┘    └─────────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
         ┌────▼────┐ ┌───▼───┐  ┌───▼───┐
         │ service │ │article│  │project│
         │  card   │ │ card  │  │ card  │
         └─────────┘ └───────┘  └───────┘
```

## Data Flow in Action

```
Example: Displaying Services

1. User visits /Home
   │
2. Route matches: router.get('/Home', pagesController.home)
   │
3. Controller executes:
   │
   ├─► Fetch from database (optional):
   │   const services = await prisma.service.findMany()
   │
   └─► Or use static data:
       const services = [
         { title: 'Branding', description: '...', link: '#' },
         { title: 'Web Dev', description: '...', link: '#' }
       ]
   │
4. Controller passes to template:
   res.render('pages/Home', { services })
   │
5. Template loops through data:
   <% services.forEach(service => { %>
     <%- include('partials/service-card', { service }) %>
   <% }) %>
   │
6. Each partial receives one service:
   <div class="card">
     <h5><%= service.title %></h5>
     <p><%= service.description %></p>
   </div>
   │
7. EJS compiles to HTML:
   <div class="card">
     <h5>Branding</h5>
     <p>...</p>
   </div>
   <div class="card">
     <h5>Web Dev</h5>
     <p>...</p>
   </div>
   │
8. Browser displays the cards
```

## Request/Response Cycle

```
┌──────────┐
│  CLIENT  │
└────┬─────┘
     │
     │ 1. GET /Home
     ▼
┌──────────────────┐
│  EXPRESS SERVER  │
└────┬─────────────┘
     │
     │ 2. Match route
     ▼
┌──────────────────┐
│     ROUTER       │
└────┬─────────────┘
     │
     │ 3. Call controller
     ▼
┌──────────────────┐      ┌──────────────┐
│   CONTROLLER     │◄────►│   DATABASE   │
└────┬─────────────┘  4.  └──────────────┘
     │                Fetch data
     │
     │ 5. Render template with data
     ▼
┌──────────────────┐
│   EJS ENGINE     │
└────┬─────────────┘
     │
     │ 6. Compile to HTML
     ▼
┌──────────────────┐
│   HTML RESPONSE  │
└────┬─────────────┘
     │
     │ 7. Send to client
     ▼
┌──────────┐
│  CLIENT  │
└──────────┘
```

## Key Concepts

### 1. Separation of Concerns
```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│    MODEL     │   │  CONTROLLER  │   │     VIEW     │
│  (Database)  │◄─►│   (Logic)    │◄─►│  (Template)  │
│              │   │              │   │              │
│  Prisma      │   │  Fetch data  │   │  Display     │
│  Schema      │   │  Process     │   │  data        │
└──────────────┘   └──────────────┘   └──────────────┘
```

### 2. DRY Principle
```
❌ Bad: Repeat HTML
   <div class="card">...</div>  ← Page 1
   <div class="card">...</div>  ← Page 2
   <div class="card">...</div>  ← Page 3

✅ Good: Use Partial
   <%- include('partials/card') %>  ← Page 1
   <%- include('partials/card') %>  ← Page 2
   <%- include('partials/card') %>  ← Page 3
                ↑
        One source of truth
```

### 3. Data Binding
```
Controller:              Template:
const data = {          <h1><%= title %></h1>
  title: 'Home'               ↑
}                             │
     └────────────────────────┘
        Data flows one way
```
