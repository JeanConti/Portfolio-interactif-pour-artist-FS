# EJS Implementation Guide

## Overview
This guide shows you how to use EJS to dynamically update your HTML pages. EJS (Embedded JavaScript) allows you to inject dynamic data into your HTML templates.

## Current Setup

Your server is already configured to use EJS:
```javascript
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, '../src/views'))
```

## Directory Structure

```
src/
├── views/
│   ├── layout.ejs          # Main layout template
│   ├── partials/           # Reusable components
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── service-card.ejs
│   └── pages/              # Page templates
│       ├── Home.ejs
│       ├── About.ejs
│       └── ...
├── controllers/
│   └── pagesController.js  # Handles data and rendering
└── routes/
    └── pages.js            # Route definitions
```

## EJS Syntax

### 1. Output Values (HTML-escaped)
```ejs
<h1><%= title %></h1>
```
- Escapes HTML characters for security
- Use for displaying user data

### 2. Output Unescaped HTML
```ejs
<%- body %>
```
- Renders raw HTML
- Use for trusted content only

### 3. JavaScript Code (no output)
```ejs
<% if (user) { %>
  <p>Welcome, <%= user.name %></p>
<% } %>
```
- Executes JavaScript without output
- Use for loops, conditionals, etc.

### 4. Comments
```ejs
<%# This is a comment %>
```

## How to Pass Data to Templates

### In Controllers (pagesController.js)

```javascript
exports.home = (req, res) => {
  // Pass data as an object
  res.render('pages/Home', {
    title: 'Home',
    services: [
      { name: 'Branding Design', description: 'Create unique brands' },
      { name: 'Web Development', description: 'Build modern websites' }
    ],
    user: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  })
}
```

### In Templates (Home.ejs)

```ejs
<h1><%= title %></h1>

<!-- Loop through array -->
<% services.forEach(service => { %>
  <div class="card">
    <h3><%= service.name %></h3>
    <p><%= service.description %></p>
  </div>
<% }) %>

<!-- Conditional rendering -->
<% if (user) { %>
  <p>Welcome, <%= user.name %>!</p>
<% } else { %>
  <p>Please log in</p>
<% } %>
```

## Using Layouts

### 1. Main Layout (layout.ejs)
Contains the HTML structure that wraps all pages:

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <title><%= title %></title>
  <!-- CSS links -->
</head>
<body>
  <%- include('partials/header') %>
  
  <%- body %>  <!-- Page content goes here -->
  
  <%- include('partials/footer') %>
</body>
</html>
```

### 2. Page Templates (Home.ejs)
Only contain the page-specific content:

```ejs
<!-- No <!DOCTYPE>, <html>, <head>, or <body> tags -->
<section class="home">
  <h1><%= pageTitle %></h1>
  <p><%= description %></p>
</section>
```

## Creating Reusable Components (Partials)

### Example: Service Card Component

**File:** `views/partials/service-card.ejs`

```ejs
<div class='col-12 col-sm-6 col-lg-3'>
  <div class='card p-3 shadow-sm'>
    <div class="card-body">
      <h5 class='card-title'><%= service.title %></h5>
      <p class='card-text'><%= service.description %></p>
      <a class='text-black' href='<%= service.link %>'>VIEW DETAILS</a>
    </div>
  </div>
</div>
```

**Usage in Home.ejs:**

```ejs
<div class='row g-4'>
  <% services.forEach(service => { %>
    <%- include('../partials/service-card', { service: service }) %>
  <% }) %>
</div>
```

## Dynamic Data Examples

### 1. Dynamic Navigation (with active state)

```ejs
<% 
const navItems = ['Home', 'About', 'Portfolio', 'Contact'];
const currentPage = 'Home';
%>

<ul class="navbar-nav">
  <% navItems.forEach(item => { %>
    <li class="nav-item">
      <a class="nav-link <%= currentPage === item ? 'active' : '' %>" 
         href="/<%= item %>">
        <%= item %>
      </a>
    </li>
  <% }) %>
</ul>
```

### 2. Dynamic Cards from Database

```javascript
// In controller
const artworks = await prisma.artwork.findMany();

res.render('pages/Portfolio', {
  title: 'Portfolio',
  artworks: artworks
});
```

```ejs
<!-- In template -->
<% artworks.forEach(artwork => { %>
  <div class="card">
    <img src="<%= artwork.imageUrl %>" alt="<%= artwork.titre %>">
    <h3><%= artwork.titre %></h3>
    <p>Year: <%= artwork.annee %></p>
    <p>Category: <%= artwork.categorie %></p>
  </div>
<% }) %>
```

### 3. Conditional Content

```ejs
<% if (artworks.length > 0) { %>
  <div class="gallery">
    <% artworks.forEach(artwork => { %>
      <!-- Display artwork -->
    <% }) %>
  </div>
<% } else { %>
  <p>No artworks available yet.</p>
<% } %>
```

## Best Practices

### 1. Keep Logic Minimal in Templates
❌ **Bad:**
```ejs
<% 
const processedData = rawData.map(item => ({
  ...item,
  formatted: item.date.toLocaleDateString()
}));
%>
```

✅ **Good:**
Process data in the controller, pass ready-to-use data to template.

### 2. Use Partials for Repeated Components
❌ **Bad:** Copy-paste the same HTML structure multiple times

✅ **Good:** Create a partial and include it

### 3. Validate Data Before Rendering
```javascript
exports.home = async (req, res) => {
  try {
    const services = await getServices();
    res.render('pages/Home', {
      title: 'Home',
      services: services || []  // Provide default
    });
  } catch (error) {
    console.error(error);
    res.render('pages/Home', {
      title: 'Home',
      services: [],
      error: 'Unable to load services'
    });
  }
}
```

### 4. Escape User Input
Always use `<%= %>` for user-generated content to prevent XSS attacks:

```ejs
<!-- Safe -->
<p><%= userComment %></p>

<!-- Dangerous! Only use for trusted content -->
<p><%- adminContent %></p>
```

## Common Patterns

### 1. Paginated Content
```javascript
// Controller
exports.portfolio = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 9;
  const artworks = getArtworks(page, perPage);
  
  res.render('pages/Portfolio', {
    title: 'Portfolio',
    artworks,
    currentPage: page,
    totalPages: Math.ceil(totalArtworks / perPage)
  });
}
```

```ejs
<!-- Template -->
<div class="pagination">
  <% for(let i = 1; i <= totalPages; i++) { %>
    <a href="?page=<%= i %>" 
       class="<%= i === currentPage ? 'active' : '' %>">
      <%= i %>
    </a>
  <% } %>
</div>
```

### 2. Dynamic Classes
```ejs
<div class="card <%= featured ? 'featured' : '' %> <%= isNew ? 'new' : '' %>">
  <!-- Content -->
</div>
```

### 3. Filtering and Sorting
```javascript
// Controller
exports.portfolio = (req, res) => {
  let artworks = getAllArtworks();
  
  if (req.query.category) {
    artworks = artworks.filter(a => a.categorie === req.query.category);
  }
  
  res.render('pages/Portfolio', {
    title: 'Portfolio',
    artworks,
    selectedCategory: req.query.category || 'all'
  });
}
```

```ejs
<!-- Template -->
<select onchange="window.location.href='?category=' + this.value">
  <option value="all" <%= selectedCategory === 'all' ? 'selected' : '' %>>All</option>
  <option value="branding" <%= selectedCategory === 'branding' ? 'selected' : '' %>>Branding</option>
  <option value="web" <%= selectedCategory === 'web' ? 'selected' : '' %>>Web</option>
</select>
```

## Debugging Tips

1. **Print variables:**
   ```ejs
   <%- JSON.stringify(data, null, 2) %>
   ```

2. **Check if variable exists:**
   ```ejs
   <% if (typeof myVar !== 'undefined') { %>
     <%= myVar %>
   <% } %>
   ```

3. **Use try-catch:**
   ```ejs
   <% try { %>
     <%= potentiallyUndefined.property %>
   <% } catch(e) { %>
     <p>Error displaying this content</p>
   <% } %>
   ```

## Next Steps

1. ✅ Refactor your page templates to remove duplicate HTML and use the layout
2. ✅ Create reusable partials for repeated components (cards, buttons, etc.)
3. ✅ Update controllers to pass dynamic data from your database
4. ✅ Implement filtering and pagination where needed
5. ✅ Add error handling for missing or invalid data

## Resources

- [EJS Official Documentation](https://ejs.co/)
- [Express.js Template Engines](https://expressjs.com/en/guide/using-template-engines.html)
- [EJS Tags Reference](https://ejs.co/#docs)
