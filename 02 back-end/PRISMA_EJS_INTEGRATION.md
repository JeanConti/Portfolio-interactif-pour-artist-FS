# Integrating EJS with Prisma Database

## Overview
This guide shows how to fetch data from your Prisma database and display it dynamically in your EJS templates.

## Prerequisites
- Prisma Client installed (`@prisma/client`)
- Database schema defined in `prisma/schema.prisma`
- Database migrations run

## Setting Up Prisma in Controllers

### 1. Import Prisma Client

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
```

**Note:** For better performance, create a single instance:

**File:** `src/lib/prisma.js`
```javascript
const { PrismaClient } = require('@prisma/client');

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

module.exports = prisma;
```

### 2. Use in Controllers

```javascript
const prisma = require('../lib/prisma');

exports.portfolio = async (req, res) => {
  try {
    const artworks = await prisma.artwork.findMany({
      orderBy: { annee: 'desc' }
    });
    
    res.render('pages/Portfolio', {
      title: 'Portfolio',
      artworks: artworks
    });
  } catch (error) {
    console.error('Database error:', error);
    res.render('pages/Portfolio', {
      title: 'Portfolio',
      artworks: [],
      error: 'Unable to load artworks'
    });
  }
}
```

## Common Patterns

### 1. Display All Records

**Controller:**
```javascript
exports.portfolio = async (req, res) => {
  const artworks = await prisma.artwork.findMany();
  
  res.render('pages/Portfolio', {
    title: 'Portfolio',
    artworks
  });
}
```

**Template:**
```ejs
<div class="row">
  <% if (artworks.length > 0) { %>
    <% artworks.forEach(artwork => { %>
      <div class="col-md-4">
        <div class="card">
          <img src="<%= artwork.imageUrl %>" alt="<%= artwork.titre %>">
          <div class="card-body">
            <h5><%= artwork.titre %></h5>
            <p>Year: <%= artwork.annee %></p>
            <p>Category: <%= artwork.categorie %></p>
          </div>
        </div>
      </div>
    <% }) %>
  <% } else { %>
    <p>No artworks found.</p>
  <% } %>
</div>
```

### 2. Filter by Category

**Controller:**
```javascript
exports.portfolio = async (req, res) => {
  const category = req.query.category;
  
  const whereClause = category 
    ? { categorie: category }
    : {};
  
  const artworks = await prisma.artwork.findMany({
    where: whereClause,
    orderBy: { annee: 'desc' }
  });
  
  const categories = await prisma.artwork.findMany({
    select: { categorie: true },
    distinct: ['categorie']
  });
  
  res.render('pages/Portfolio', {
    title: 'Portfolio',
    artworks,
    categories: categories.map(c => c.categorie),
    selectedCategory: category || 'all'
  });
}
```

**Template:**
```ejs
<!-- Filter dropdown -->
<select onchange="window.location.href='?category=' + this.value">
  <option value="">All Categories</option>
  <% categories.forEach(cat => { %>
    <option value="<%= cat %>" <%= selectedCategory === cat ? 'selected' : '' %>>
      <%= cat %>
    </option>
  <% }) %>
</select>

<!-- Display filtered results -->
<div class="row">
  <% artworks.forEach(artwork => { %>
    <!-- Display artwork -->
  <% }) %>
</div>
```

### 3. Pagination

**Controller:**
```javascript
exports.portfolio = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 9;
  const skip = (page - 1) * perPage;
  
  const [artworks, totalCount] = await Promise.all([
    prisma.artwork.findMany({
      skip,
      take: perPage,
      orderBy: { annee: 'desc' }
    }),
    prisma.artwork.count()
  ]);
  
  const totalPages = Math.ceil(totalCount / perPage);
  
  res.render('pages/Portfolio', {
    title: 'Portfolio',
    artworks,
    currentPage: page,
    totalPages,
    hasPrev: page > 1,
    hasNext: page < totalPages
  });
}
```

**Template:**
```ejs
<!-- Pagination -->
<nav>
  <ul class="pagination">
    <% if (hasPrev) { %>
      <li class="page-item">
        <a class="page-link" href="?page=<%= currentPage - 1 %>">Previous</a>
      </li>
    <% } %>
    
    <% for(let i = 1; i <= totalPages; i++) { %>
      <li class="page-item <%= i === currentPage ? 'active' : '' %>">
        <a class="page-link" href="?page=<%= i %>"><%= i %></a>
      </li>
    <% } %>
    
    <% if (hasNext) { %>
      <li class="page-item">
        <a class="page-link" href="?page=<%= currentPage + 1 %>">Next</a>
      </li>
    <% } %>
  </ul>
</nav>
```

### 4. Single Record by ID

**Route:**
```javascript
routerServer.get('/Portfolio/:id', pagesController.artworkDetail);
```

**Controller:**
```javascript
exports.artworkDetail = async (req, res) => {
  const { id } = req.params;
  
  const artwork = await prisma.artwork.findUnique({
    where: { id: parseInt(id) }
  });
  
  if (!artwork) {
    return res.status(404).render('pages/error', {
      title: 'Not Found',
      message: 'Artwork not found'
    });
  }
  
  res.render('pages/ArtworkDetail', {
    title: artwork.titre,
    artwork
  });
}
```

**Template:**
```ejs
<div class="artwork-detail">
  <img src="<%= artwork.imageUrl %>" alt="<%= artwork.titre %>">
  <h1><%= artwork.titre %></h1>
  <p>Year: <%= artwork.annee %></p>
  <p>Category: <%= artwork.categorie %></p>
</div>
```

### 5. Search Functionality

**Controller:**
```javascript
exports.search = async (req, res) => {
  const searchTerm = req.query.q || '';
  
  const artworks = await prisma.artwork.findMany({
    where: {
      OR: [
        { titre: { contains: searchTerm } },
        { categorie: { contains: searchTerm } }
      ]
    }
  });
  
  res.render('pages/SearchResults', {
    title: 'Search Results',
    artworks,
    searchTerm
  });
}
```

**Template:**
```ejs
<form action="/search" method="GET">
  <input type="text" name="q" value="<%= searchTerm %>" placeholder="Search...">
  <button type="submit">Search</button>
</form>

<h2>Results for "<%= searchTerm %>"</h2>
<p>Found <%= artworks.length %> result(s)</p>

<% artworks.forEach(artwork => { %>
  <!-- Display results -->
<% }) %>
```

### 6. Related Records

**Controller:**
```javascript
exports.artworkDetail = async (req, res) => {
  const { id } = req.params;
  
  const artwork = await prisma.artwork.findUnique({
    where: { id: parseInt(id) }
  });
  
  // Find related artworks in same category
  const relatedArtworks = await prisma.artwork.findMany({
    where: {
      categorie: artwork.categorie,
      id: { not: artwork.id }
    },
    take: 3
  });
  
  res.render('pages/ArtworkDetail', {
    title: artwork.titre,
    artwork,
    relatedArtworks
  });
}
```

**Template:**
```ejs
<h3>Related Artworks</h3>
<div class="row">
  <% relatedArtworks.forEach(related => { %>
    <div class="col-md-4">
      <a href="/Portfolio/<%= related.id %>">
        <img src="<%= related.imageUrl %>" alt="<%= related.titre %>">
        <h5><%= related.titre %></h5>
      </a>
    </div>
  <% }) %>
</div>
```

### 7. Aggregations and Statistics

**Controller:**
```javascript
exports.home = async (req, res) => {
  const stats = {
    totalArtworks: await prisma.artwork.count(),
    categories: await prisma.artwork.groupBy({
      by: ['categorie'],
      _count: true
    }),
    recentArtworks: await prisma.artwork.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    })
  };
  
  res.render('pages/Home', {
    title: 'Home',
    stats
  });
}
```

**Template:**
```ejs
<div class="stats">
  <h3>Portfolio Statistics</h3>
  <p>Total Artworks: <%= stats.totalArtworks %></p>
  
  <h4>By Category:</h4>
  <ul>
    <% stats.categories.forEach(cat => { %>
      <li><%= cat.categorie %>: <%= cat._count %> artworks</li>
    <% }) %>
  </ul>
  
  <h4>Recent Work:</h4>
  <% stats.recentArtworks.forEach(artwork => { %>
    <!-- Display artwork -->
  <% }) %>
</div>
```

## Error Handling Best Practices

### 1. Try-Catch in Controllers

```javascript
exports.portfolio = async (req, res) => {
  try {
    const artworks = await prisma.artwork.findMany();
    
    res.render('pages/Portfolio', {
      title: 'Portfolio',
      artworks
    });
  } catch (error) {
    console.error('Database error:', error);
    
    res.status(500).render('pages/error', {
      title: 'Error',
      message: 'Unable to load portfolio. Please try again later.'
    });
  }
}
```

### 2. Safe Rendering in Templates

```ejs
<!-- Check if data exists before using -->
<% if (typeof artworks !== 'undefined' && artworks.length > 0) { %>
  <% artworks.forEach(artwork => { %>
    <!-- Display artwork -->
  <% }) %>
<% } else { %>
  <p>No artworks available.</p>
<% } %>
```

### 3. Default Values

```javascript
res.render('pages/Portfolio', {
  title: 'Portfolio',
  artworks: artworks || [],
  error: error || null
});
```

## Form Handling with Prisma

### 1. Contact Form

**Route:**
```javascript
routerServer.post('/contact', pagesController.submitContact);
```

**Controller:**
```javascript
const { body, validationResult } = require('express-validator');

exports.submitContact = [
  // Validation middleware
  body('email').isEmail().normalizeEmail(),
  body('message').trim().notEmpty().escape(),
  body('name').trim().notEmpty().escape(),
  
  // Handler
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.render('pages/Contact', {
        title: 'Contact',
        errors: errors.array(),
        formData: req.body
      });
    }
    
    try {
      const { email, message, name } = req.body;
      
      const newMessage = await prisma.message.create({
        data: { email, message, name }
      });
      
      res.render('pages/ContactSuccess', {
        title: 'Thank You',
        message: 'Your message has been sent successfully!'
      });
    } catch (error) {
      console.error('Error saving message:', error);
      
      res.render('pages/Contact', {
        title: 'Contact',
        error: 'Unable to send message. Please try again.',
        formData: req.body
      });
    }
  }
];
```

**Template:**
```ejs
<% if (typeof error !== 'undefined' && error) { %>
  <div class="alert alert-danger"><%= error %></div>
<% } %>

<% if (typeof errors !== 'undefined' && errors.length > 0) { %>
  <div class="alert alert-danger">
    <ul>
      <% errors.forEach(err => { %>
        <li><%= err.msg %></li>
      <% }) %>
    </ul>
  </div>
<% } %>

<form method="POST" action="/contact">
  <input type="text" name="name" value="<%= typeof formData !== 'undefined' ? formData.name : '' %>">
  <input type="email" name="email" value="<%= typeof formData !== 'undefined' ? formData.email : '' %>">
  <textarea name="message"><%= typeof formData !== 'undefined' ? formData.message : '' %></textarea>
  <button type="submit">Send</button>
</form>
```

## Performance Tips

1. **Use select to limit fields:**
```javascript
const artworks = await prisma.artwork.findMany({
  select: {
    id: true,
    titre: true,
    imageUrl: true,
    annee: true
  }
});
```

2. **Use Promise.all for parallel queries:**
```javascript
const [artworks, messages, stats] = await Promise.all([
  prisma.artwork.findMany(),
  prisma.message.findMany(),
  prisma.artwork.count()
]);
```

3. **Implement caching for expensive queries:**
```javascript
// Simple in-memory cache (for production, use Redis)
let cachedArtworks = null;
let cacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

exports.portfolio = async (req, res) => {
  const now = Date.now();
  
  if (!cachedArtworks || (now - cacheTime) > CACHE_DURATION) {
    cachedArtworks = await prisma.artwork.findMany();
    cacheTime = now;
  }
  
  res.render('pages/Portfolio', {
    title: 'Portfolio',
    artworks: cachedArtworks
  });
}
```

## Next Steps

1. Review your Prisma schema to understand your data models
2. Update your controllers to fetch data from the database
3. Update your EJS templates to display the dynamic data
4. Add error handling and validation
5. Test thoroughly with different data scenarios
