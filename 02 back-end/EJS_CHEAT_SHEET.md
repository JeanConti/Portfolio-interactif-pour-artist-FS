# EJS Quick Reference Cheat Sheet

## EJS Tags

| Tag | Description | Example |
|-----|-------------|---------|
| `<%= %>` | Output (HTML-escaped) | `<%= user.name %>` |
| `<%- %>` | Output (Unescaped) | `<%- htmlContent %>` |
| `<% %>` | JavaScript code (no output) | `<% if (x > 5) { %>` |
| `<%# %>` | Comment (not in output) | `<%# TODO: Fix this %>` |
| `<%% %>` | Literal `<%` | `<%%` → `<%` |
| `%>` | Ending tag | N/A |
| `-%>` | Trim whitespace after | `<% items.forEach() -%>` |
| `<%_` | Trim whitespace before | `<%_ if (condition) %>` |

## Common Patterns

### Variables
```ejs
<!-- Simple output -->
<h1><%= title %></h1>

<!-- Object property -->
<p><%= user.email %></p>

<!-- Array item -->
<p><%= items[0] %></p>
```

### Conditionals
```ejs
<!-- If statement -->
<% if (isLoggedIn) { %>
  <p>Welcome!</p>
<% } %>

<!-- If-else -->
<% if (user) { %>
  <p>Hello, <%= user.name %></p>
<% } else { %>
  <p>Please log in</p>
<% } %>

<!-- Ternary operator -->
<p class="<%= isActive ? 'active' : 'inactive' %>">Status</p>
```

### Loops
```ejs
<!-- forEach -->
<% items.forEach(item => { %>
  <li><%= item.name %></li>
<% }) %>

<!-- for loop -->
<% for(let i = 0; i < items.length; i++) { %>
  <li><%= items[i] %></li>
<% } %>

<!-- for...of -->
<% for(const item of items) { %>
  <li><%= item %></li>
<% } %>

<!-- With index -->
<% items.forEach((item, index) => { %>
  <li><%= index + 1 %>. <%= item %></li>
<% }) %>
```

### Including Partials
```ejs
<!-- Simple include -->
<%- include('partials/header') %>

<!-- Include with data -->
<%- include('partials/card', { title: 'My Card', content: 'Text' }) %>

<!-- Dynamic include -->
<%- include(`partials/${templateName}`) %>
```

### Safe Data Access
```ejs
<!-- Check if variable exists -->
<% if (typeof user !== 'undefined' && user) { %>
  <%= user.name %>
<% } %>

<!-- Optional chaining (if available) -->
<%= user?.profile?.bio || 'No bio' %>

<!-- Default value -->
<%= title || 'Default Title' %>

<!-- Nullish coalescing -->
<%= count ?? 0 %>
```

### Arrays
```ejs
<!-- Check if array has items -->
<% if (items && items.length > 0) { %>
  <% items.forEach(item => { %>
    <!-- Display item -->
  <% }) %>
<% } else { %>
  <p>No items found</p>
<% } %>

<!-- Filter -->
<% const activeItems = items.filter(item => item.active) %>

<!-- Map -->
<% const names = users.map(user => user.name) %>

<!-- Join -->
<%= tags.join(', ') %>
```

### Objects
```ejs
<!-- Loop through object keys -->
<% Object.keys(data).forEach(key => { %>
  <p><%= key %>: <%= data[key] %></p>
<% }) %>

<!-- Loop through entries -->
<% Object.entries(data).forEach(([key, value]) => { %>
  <p><%= key %>: <%= value %></p>
<% }) %>
```

### Date Formatting
```ejs
<!-- Native methods -->
<%= new Date(timestamp).toLocaleDateString() %>
<%= new Date(timestamp).toLocaleString() %>

<!-- Custom format function (define in controller) -->
<%= formatDate(artwork.createdAt) %>
```

### String Operations
```ejs
<!-- Uppercase/Lowercase -->
<%= name.toUpperCase() %>
<%= name.toLowerCase() %>

<!-- Truncate -->
<%= description.length > 100 ? description.substring(0, 100) + '...' : description %>

<!-- Replace -->
<%= text.replace('old', 'new') %>
```

### Classes and Styles
```ejs
<!-- Dynamic classes -->
<div class="card <%= isActive ? 'active' : '' %> <%= isFeatured ? 'featured' : '' %>">

<!-- Multiple conditions -->
<div class="<%= [
  'card',
  isActive && 'active',
  isFeatured && 'featured',
  isNew && 'new'
].filter(Boolean).join(' ') %>">

<!-- Inline styles -->
<div style="color: <%= theme.color %>; background: <%= theme.bg %>;">
```

### Links and URLs
```ejs
<!-- Dynamic href -->
<a href="/<%= page %>">Link</a>

<!-- With query parameters -->
<a href="/search?q=<%= encodeURIComponent(query) %>">Search</a>

<!-- Dynamic src -->
<img src="<%= imageUrl %>" alt="<%= imageAlt %>">

<!-- Conditional link -->
<% if (hasLink) { %>
  <a href="<%= url %>"><%= text %></a>
<% } else { %>
  <span><%= text %></span>
<% } %>
```

### Forms
```ejs
<!-- Text input with value -->
<input type="text" name="username" value="<%= formData?.username || '' %>">

<!-- Checkbox -->
<input type="checkbox" <%= isChecked ? 'checked' : '' %>>

<!-- Select dropdown -->
<select name="category">
  <% categories.forEach(cat => { %>
    <option value="<%= cat %>" <%= selectedCategory === cat ? 'selected' : '' %>>
      <%= cat %>
    </option>
  <% }) %>
</select>

<!-- Radio buttons -->
<% options.forEach(option => { %>
  <input type="radio" 
         name="choice" 
         value="<%= option.value %>"
         <%= selectedValue === option.value ? 'checked' : '' %>>
  <%= option.label %>
<% }) %>
```

### Error Handling
```ejs
<!-- Display errors -->
<% if (typeof errors !== 'undefined' && errors.length > 0) { %>
  <div class="alert alert-danger">
    <ul>
      <% errors.forEach(error => { %>
        <li><%= error.msg %></li>
      <% }) %>
    </ul>
  </div>
<% } %>

<!-- Single error message -->
<% if (error) { %>
  <div class="alert alert-danger"><%= error %></div>
<% } %>

<!-- Success message -->
<% if (success) { %>
  <div class="alert alert-success"><%= success %></div>
<% } %>
```

### Pagination
```ejs
<nav>
  <ul class="pagination">
    <!-- Previous button -->
    <li class="page-item <%= currentPage === 1 ? 'disabled' : '' %>">
      <a class="page-link" href="?page=<%= currentPage - 1 %>">Previous</a>
    </li>
    
    <!-- Page numbers -->
    <% for(let i = 1; i <= totalPages; i++) { %>
      <li class="page-item <%= i === currentPage ? 'active' : '' %>">
        <a class="page-link" href="?page=<%= i %>"><%= i %></a>
      </li>
    <% } %>
    
    <!-- Next button -->
    <li class="page-item <%= currentPage === totalPages ? 'disabled' : '' %>">
      <a class="page-link" href="?page=<%= currentPage + 1 %>">Next</a>
    </li>
  </ul>
</nav>
```

### Filters/Search
```ejs
<!-- Filter buttons -->
<div class="btn-group">
  <a href="?category=all" class="btn <%= !category || category === 'all' ? 'btn-primary' : 'btn-secondary' %>">
    All
  </a>
  <% categories.forEach(cat => { %>
    <a href="?category=<%= cat %>" 
       class="btn <%= category === cat ? 'btn-primary' : 'btn-secondary' %>">
      <%= cat %>
    </a>
  <% }) %>
</div>

<!-- Search form -->
<form action="/search" method="GET">
  <input type="text" 
         name="q" 
         value="<%= searchTerm || '' %>" 
         placeholder="Search...">
  <button type="submit">Search</button>
</form>
```

## Controller Patterns

### Basic Render
```javascript
exports.home = (req, res) => {
  res.render('pages/Home', {
    title: 'Home',
    data: myData
  });
}
```

### With Async/Await
```javascript
exports.portfolio = async (req, res) => {
  const artworks = await prisma.artwork.findMany();
  res.render('pages/Portfolio', { title: 'Portfolio', artworks });
}
```

### With Error Handling
```javascript
exports.page = async (req, res) => {
  try {
    const data = await fetchData();
    res.render('pages/Page', { title: 'Page', data });
  } catch (error) {
    console.error(error);
    res.render('pages/error', { title: 'Error', message: error.message });
  }
}
```

### With Query Parameters
```javascript
exports.search = async (req, res) => {
  const { q, category, page } = req.query;
  const results = await search(q, category, page);
  
  res.render('pages/SearchResults', {
    title: 'Search Results',
    results,
    query: q,
    selectedCategory: category,
    currentPage: parseInt(page) || 1
  });
}
```

## Useful Helper Functions

Define in controller, use in template:

```javascript
// In controller
res.render('page', {
  title: 'Page',
  formatDate: (date) => new Date(date).toLocaleDateString(),
  truncate: (str, len) => str.length > len ? str.substring(0, len) + '...' : str,
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1)
});
```

```ejs
<!-- In template -->
<%= formatDate(artwork.createdAt) %>
<%= truncate(description, 100) %>
<%= capitalize(name) %>
```

## Common Gotchas

❌ **Don't do this:**
```ejs
<!-- Missing closing tag -->
<% if (condition) { %>
  <p>Text</p>

<!-- Using wrong tag type -->
<% userName %>  <!-- Won't output anything -->

<!-- Unescaped user input (XSS vulnerability) -->
<%- userComment %>
```

✅ **Do this:**
```ejs
<!-- Proper closing -->
<% if (condition) { %>
  <p>Text</p>
<% } %>

<!-- Correct output tag -->
<%= userName %>

<!-- Escaped user input -->
<%= userComment %>
```

## Performance Tips

1. **Minimize logic in templates** - Handle in controller
2. **Cache partials** - EJS automatically caches compiled templates in production
3. **Use partials for reusable components**
4. **Avoid deep nesting** - Keep template structure flat
5. **Fetch only needed data** - Don't pass entire objects if only few fields needed

## Security

1. **Always escape user input:** Use `<%= %>`, not `<%- %>`
2. **Validate data in controller** before passing to template
3. **Use CSRF protection** for forms
4. **Sanitize data** before storing in database
5. **Don't expose sensitive data** in templates
