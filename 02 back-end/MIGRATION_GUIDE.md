# Migration Guide: Converting Static EJS to Dynamic EJS

## Overview
This guide helps you convert your existing static `.ejs` files into dynamic templates that use layouts, partials, and data from controllers.

## Current Issues with Your EJS Files

### Problem 1: Full HTML Documents in Page Templates
Your `Home.ejs` currently contains the entire HTML structure:
```ejs
<!DOCTYPE html>
<html>
<head>...</head>
<body>
  <!-- header -->
  <!-- content -->
  <!-- footer -->
</body>
</html>
```

**Why this is a problem:**
- Duplicates code across every page
- Header/footer changes require updating all files
- Can't use the `layout.ejs` system
- Harder to maintain

### Problem 2: Static Content
All your content is hardcoded:
```ejs
<h5 class='card-title'>Branding Design</h5>
<p class='card-text'>Branding Design</p>
```

**Why this is a problem:**
- Can't update content without editing code
- Can't fetch from database
- No flexibility

## Step-by-Step Migration

### Step 1: Update Your Server Configuration

Your `server.js` already has EJS configured, but make sure middleware is in the right order:

```javascript
const express = require('express')
const path = require('path')
const server = express()

// Middleware BEFORE routes!
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Static files
server.use(express.static(path.join(__dirname, '../../01 front-end')))

// EJS configuration
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, '../src/views'))

// Routes AFTER middleware
server.use('/', routePages)
```

### Step 2: Fix Your Layout System

#### Current `layout.ejs` (Already Good!)
```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
  <!-- CSS links -->
</head>
<body>
  <%- include('partials/header') %>
  
  <%- body %>  <!-- Page content will be inserted here -->
  
  <%- include('partials/footer') %>
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

**Note:** To use this layout system, you need to install `express-ejs-layouts`:

```bash
npm install express-ejs-layouts
```

Then update `server.js`:
```javascript
const expressLayouts = require('express-ejs-layouts');

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '../src/views'));
server.use(expressLayouts);
server.set('layout', 'layout');  // Use layout.ejs as default
```

### Step 3: Convert Page Templates

#### Before (Static HTML in Home.ejs):
```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Portfolio: Home</title>
  <link rel="stylesheet" href="...">
</head>
<body>
  <header>...</header>
  
  <section class='home'>
    <h1>We Make Creative Things Everyday</h1>
    <p>We are digital agency...</p>
  </section>
  
  <footer>...</footer>
</body>
</html>
```

#### After (Dynamic Content Only):
```ejs
<section class='home bg-black text-white mt-5'>
  <div class="picture">
    <img src="<%= hero.image %>" alt="<%= hero.alt %>">
  </div>
  <div class='container-fluid'>
    <h1><%= hero.title %></h1>
    <p><%= hero.subtitle %></p>
    <button onclick="window.location.href='<%= hero.buttonLink %>'">
      <%= hero.buttonText %>
    </button>
  </div>
</section>

<!-- More sections... -->
```

### Step 4: Identify Reusable Components

Look for repeated HTML patterns and extract them into partials.

#### Example: Service Cards

**Before (Repeated 4 times in Home.ejs):**
```ejs
<div class='col-12 col-sm-6 col-lg-3'>
  <div class='card p-3 shadow-sm'>
    <div class="card-body">
      <h5 class='card-title'>Branding Design</h5>
      <p class='card-text'>Branding Design</p>
      <a class='text-black' href=''>VIEW DETAILS</a>
    </div>
  </div>
</div>
```

**After (Create `partials/service-card.ejs`):**
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

**Use in Home.ejs:**
```ejs
<div class='row g-4'>
  <% services.forEach(service => { %>
    <%- include('../partials/service-card', { service }) %>
  <% }) %>
</div>
```

### Step 5: Update Controllers to Pass Data

#### Before (Minimal data):
```javascript
exports.home = (req, res) => {
  res.render('pages/Home', {title: 'Home'})
}
```

#### After (Rich data):
```javascript
exports.home = (req, res) => {
  res.render('pages/Home', {
    title: 'Portfolio: Home',
    hero: {
      title: 'We Make Creative Things Everyday',
      subtitle: 'We are digital agency...',
      image: '../assets/images/laptops-593296.jpg',
      alt: 'reunion',
      buttonText: 'VIEW OUR WORK',
      buttonLink: '/Portfolio'
    },
    services: [
      { title: 'Branding Design', description: 'Create unique brands', link: '#' },
      { title: 'Website Development', description: 'Build websites', link: '#' },
      // ...
    ]
  })
}
```

### Step 6: Convert Static Lists to Dynamic Loops

#### Before:
```ejs
<div class="card">...</div>
<div class="card">...</div>
<div class="card">...</div>
<div class="card">...</div>
```

#### After:
```ejs
<% items.forEach(item => { %>
  <div class="card">
    <h5><%= item.title %></h5>
    <p><%= item.description %></p>
  </div>
<% }) %>
```

### Step 7: Fix Navigation Links

#### Before (Static .html links):
```ejs
<a href="./Home.html">Home</a>
<a href="./About.html">About</a>
```

#### After (Dynamic routes):
```ejs
<a href="/Home">Home</a>
<a href="/About">About</a>
```

Or with active state:
```ejs
<% const navItems = ['Home', 'About', 'Portfolio', 'Contact'] %>
<% navItems.forEach(item => { %>
  <a href="/<%= item %>" 
     class="nav-link <%= currentPage === item ? 'active' : '' %>">
    <%= item %>
  </a>
<% }) %>
```

## Practical Migration Example: Home Page

### 1. Create Data Structure in Controller

```javascript
exports.home = (req, res) => {
  const pageData = {
    title: 'Portfolio: Home',
    currentPage: 'Home',
    
    hero: { /* ... */ },
    services: [ /* ... */ ],
    articles: [ /* ... */ ],
    // etc.
  };
  
  res.render('pages/Home', pageData);
}
```

### 2. Convert Template Sections One by One

Start with simple sections:

**Static:**
```ejs
<h2>WHAT WE CAN DO FOR OUR CLIENTS</h2>
```

**Dynamic:**
```ejs
<h2><%= servicesTitle %></h2>
```

Then move to complex sections:

**Static:**
```ejs
<div class="carousel-item active">
  <img src="../assets/images/laptop-development.jpeg">
  <h5>Website Development</h5>
</div>
<div class="carousel-item">
  <img src="../assets/images/branding.jpg">
  <h5>Digital Marketing</h5>
</div>
```

**Dynamic:**
```ejs
<% carouselItems.forEach((item, index) => { %>
  <div class="carousel-item <%= index === 0 ? 'active' : '' %>">
    <img src="<%= item.image %>" alt="<%= item.title %>">
    <h5><%= item.title %></h5>
  </div>
<% }) %>
```

### 3. Test Each Section

After converting each section:
1. Save files
2. Restart server
3. Visit page in browser
4. Check for errors in console
5. Verify data displays correctly

## Common Migration Issues and Solutions

### Issue 1: "Cannot read property of undefined"

**Cause:** Template tries to access data that wasn't passed

**Solution:** 
```javascript
// In controller, provide defaults
res.render('page', {
  title: 'Page',
  services: services || [],
  user: user || null
});
```

```ejs
<!-- In template, check existence -->
<% if (services && services.length > 0) { %>
  <!-- Display services -->
<% } %>
```

### Issue 2: Layout not applied

**Cause:** `express-ejs-layouts` not installed or configured

**Solution:**
```bash
npm install express-ejs-layouts
```

```javascript
const expressLayouts = require('express-ejs-layouts');
server.use(expressLayouts);
```

### Issue 3: CSS/Images not loading

**Cause:** Wrong file paths after moving to EJS

**Solution:** Use absolute paths from public folder:
```ejs
<!-- Instead of: -->
<img src="../../assets/images/logo.png">

<!-- Use: -->
<img src="/assets/images/logo.png">
```

### Issue 4: Form submissions not working

**Cause:** Missing body parser middleware

**Solution:**
```javascript
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
```

## Migration Checklist

Use this checklist for each page:

- [ ] Remove `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` tags
- [ ] Remove duplicate header/footer (use partials)
- [ ] Identify static content to make dynamic
- [ ] Extract repeated components to partials
- [ ] Update controller to pass data
- [ ] Convert static lists to loops
- [ ] Fix navigation links (.html → routes)
- [ ] Fix asset paths
- [ ] Test page functionality
- [ ] Check responsive design
- [ ] Verify all links work

## Best Practices for Migration

1. **One page at a time** - Don't try to convert everything at once
2. **Keep backups** - Save original files as `.ejs.bak`
3. **Test frequently** - Test after each major change
4. **Start simple** - Begin with pages that have less dynamic content
5. **Use version control** - Commit after each successful conversion
6. **Document data structure** - Keep track of what data each page needs

## Example: Complete Before/After

### BEFORE: Static About.ejs
```ejs
<!DOCTYPE html>
<html>
<head>
  <title>About</title>
  <link rel="stylesheet" href="../assets/styles.css">
</head>
<body>
  <header>
    <nav>
      <a href="./Home.html">Home</a>
      <a href="./About.html">About</a>
    </nav>
  </header>
  
  <section class="about">
    <h1>About Us</h1>
    <p>We are a creative agency...</p>
    
    <div class="team-member">
      <h3>John Doe</h3>
      <p>CEO</p>
    </div>
    <div class="team-member">
      <h3>Jane Smith</h3>
      <p>Designer</p>
    </div>
  </section>
  
  <footer>
    <p>© 2025</p>
  </footer>
</body>
</html>
```

### AFTER: Dynamic About.ejs
```ejs
<section class="about">
  <h1><%= pageTitle %></h1>
  <p><%= description %></p>
  
  <div class="team">
    <% team.forEach(member => { %>
      <div class="team-member">
        <h3><%= member.name %></h3>
        <p><%= member.role %></p>
      </div>
    <% }) %>
  </div>
</section>
```

### Controller for About
```javascript
exports.about = async (req, res) => {
  const team = await prisma.teamMember.findMany();
  
  res.render('pages/About', {
    title: 'Portfolio: About',
    currentPage: 'About',
    pageTitle: 'About Us',
    description: 'We are a creative agency...',
    team: team
  });
}
```

## Next Steps After Migration

1. **Connect to database** - Replace static data with Prisma queries
2. **Add form handling** - Implement POST routes for contact forms
3. **Implement filtering** - Add category filters, search, etc.
4. **Add pagination** - For pages with many items
5. **Optimize performance** - Cache data, minimize queries
6. **Add admin panel** - Create/edit/delete content through UI

## Resources

- See `EJS_IMPLEMENTATION_GUIDE.md` for detailed EJS syntax
- See `PRISMA_EJS_INTEGRATION.md` for database integration
- See `EJS_CHEAT_SHEET.md` for quick reference
- See `pagesController-example.js` for controller examples
- See `Home-Dynamic.ejs` for a complete example
