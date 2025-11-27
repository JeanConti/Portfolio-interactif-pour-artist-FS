// ============================================
// QUICK START: Test Dynamic EJS in 5 Minutes
// ============================================
// This file shows you how to quickly test dynamic EJS
// Follow the steps below to see it in action!

// STEP 1: Add this to your routes/pages.js
// ============================================
// Add after your existing routes:

routerServer.get('/test-dynamic', pagesController.testDynamic)

// STEP 2: Add this to your controllers/pagesController.js
// ============================================
// Add this new export function:

exports.testDynamic = (req, res) => {
  // This is sample data - in a real app, this would come from your database
  const pageData = {
    title: 'Dynamic EJS Test',
    currentPage: 'Test',
    
    // Simple message
    message: 'Hello! This is dynamic content from the controller!',
    
    // Current date/time
    currentTime: new Date().toLocaleString(),
    
    // Array of items to loop through
    colors: ['Red', 'Blue', 'Green', 'Yellow', 'Purple'],
    
    // Array of objects
    team: [
      { name: 'Alice Johnson', role: 'Designer', email: 'alice@example.com' },
      { name: 'Bob Smith', role: 'Developer', email: 'bob@example.com' },
      { name: 'Charlie Brown', role: 'Manager', email: 'charlie@example.com' }
    ],
    
    // Boolean for conditional rendering
    showWelcome: true,
    isLoggedIn: false,
    
    // Number
    userCount: 42,
    
    // Nested object
    company: {
      name: 'Creative Agency',
      location: 'New York',
      founded: 2020,
      services: ['Branding', 'Web Design', 'Marketing']
    }
  }
  
  // Render the test page with all this data
  res.render('pages/test-dynamic', pageData)
}

// STEP 3: Create test-dynamic.ejs in views/pages/
// ============================================
// Copy this entire template into:
// src/views/pages/test-dynamic.ejs

/*
<div class="container my-5">
  <h1 class="mb-4">🎉 EJS Dynamic Content Test</h1>
  
  <!-- Simple variable output -->
  <div class="alert alert-info">
    <h3>1. Simple Variable Output</h3>
    <p><strong>Message from controller:</strong> <%= message %></p>
    <p><strong>Current time:</strong> <%= currentTime %></p>
  </div>
  
  <!-- Number output -->
  <div class="alert alert-success">
    <h3>2. Number Output</h3>
    <p>We have <strong><%= userCount %></strong> users!</p>
  </div>
  
  <!-- Conditional rendering -->
  <div class="alert alert-warning">
    <h3>3. Conditional Rendering (if/else)</h3>
    <% if (showWelcome) { %>
      <p>✅ Welcome message is enabled!</p>
    <% } else { %>
      <p>❌ Welcome message is disabled</p>
    <% } %>
    
    <% if (isLoggedIn) { %>
      <p>You are logged in</p>
    <% } else { %>
      <p>You are not logged in</p>
    <% } %>
  </div>
  
  <!-- Simple array loop -->
  <div class="alert alert-primary">
    <h3>4. Simple Array Loop</h3>
    <p>Favorite colors:</p>
    <ul>
      <% colors.forEach(color => { %>
        <li><%= color %></li>
      <% }) %>
    </ul>
  </div>
  
  <!-- Array of objects -->
  <div class="alert alert-secondary">
    <h3>5. Array of Objects (Team Members)</h3>
    <div class="row">
      <% team.forEach(member => { %>
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"><%= member.name %></h5>
              <p class="card-text">
                <strong>Role:</strong> <%= member.role %><br>
                <strong>Email:</strong> <%= member.email %>
              </p>
            </div>
          </div>
        </div>
      <% }) %>
    </div>
  </div>
  
  <!-- Nested object -->
  <div class="alert alert-dark">
    <h3>6. Nested Object</h3>
    <p><strong>Company:</strong> <%= company.name %></p>
    <p><strong>Location:</strong> <%= company.location %></p>
    <p><strong>Founded:</strong> <%= company.founded %></p>
    <p><strong>Services:</strong></p>
    <ul>
      <% company.services.forEach(service => { %>
        <li><%= service %></li>
      <% }) %>
    </ul>
  </div>
  
  <!-- Loop with index -->
  <div class="alert alert-info">
    <h3>7. Loop with Index</h3>
    <ol>
      <% colors.forEach((color, index) => { %>
        <li>Item #<%= index + 1 %>: <%= color %></li>
      <% }) %>
    </ol>
  </div>
  
  <!-- Ternary operator -->
  <div class="alert alert-success">
    <h3>8. Ternary Operator</h3>
    <p>Login status: <span class="badge <%= isLoggedIn ? 'bg-success' : 'bg-danger' %>">
      <%= isLoggedIn ? 'Logged In' : 'Logged Out' %>
    </span></p>
  </div>
  
  <!-- Math operations -->
  <div class="alert alert-warning">
    <h3>9. Math Operations</h3>
    <p>User count doubled: <%= userCount * 2 %></p>
    <p>Users per team member: <%= Math.floor(userCount / team.length) %></p>
  </div>
  
  <!-- String operations -->
  <div class="alert alert-primary">
    <h3>10. String Operations</h3>
    <p>Company name uppercase: <%= company.name.toUpperCase() %></p>
    <p>Company name lowercase: <%= company.name.toLowerCase() %></p>
    <p>First color: <%= colors[0] %></p>
    <p>Last color: <%= colors[colors.length - 1] %></p>
  </div>
  
  <!-- Combined example -->
  <div class="alert alert-danger">
    <h3>11. Combined Example (Real World)</h3>
    <% if (team.length > 0) { %>
      <p>We have <%= team.length %> team member<%= team.length !== 1 ? 's' : '' %>:</p>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          <% team.forEach((member, index) => { %>
            <tr>
              <td><%= index + 1 %></td>
              <td><%= member.name %></td>
              <td><span class="badge bg-info"><%= member.role %></span></td>
              <td><a href="mailto:<%= member.email %>"><%= member.email %></a></td>
            </tr>
          <% }) %>
        </tbody>
      </table>
    <% } else { %>
      <p>No team members found.</p>
    <% } %>
  </div>
  
  <hr class="my-5">
  
  <div class="text-center">
    <h2>🎉 Success! You're using dynamic EJS!</h2>
    <p>All the content above came from the controller, not hardcoded HTML.</p>
    <a href="/Home" class="btn btn-primary">Back to Home</a>
  </div>
</div>
*/

// STEP 4: Restart your server
// ============================================
// In terminal, stop the server (Ctrl+C) and restart:
// node src/server.js

// STEP 5: Visit the test page
// ============================================
// Open your browser and go to:
// http://localhost:3900/test-dynamic

// WHAT YOU SHOULD SEE:
// ============================================
// A page with multiple sections demonstrating:
// - Simple text output
// - Numbers
// - Conditionals (if/else)
// - Loops through arrays
// - Loops through objects
// - Nested data access
// - String/Math operations
// - Combined real-world example

// TRY THESE EXPERIMENTS:
// ============================================

// 1. Change the message
exports.testDynamic_experiment1 = (req, res) => {
  res.render('pages/test-dynamic', {
    title: 'Test',
    message: 'You changed the message!',  // ← Change this
    currentTime: new Date().toLocaleString(),
    colors: ['Red', 'Blue', 'Green'],
    team: [],
    showWelcome: true,
    isLoggedIn: false,
    userCount: 42,
    company: { name: 'Test', location: 'Paris', founded: 2024, services: [] }
  })
}

// 2. Toggle showWelcome
exports.testDynamic_experiment2 = (req, res) => {
  res.render('pages/test-dynamic', {
    title: 'Test',
    message: 'Testing conditionals',
    currentTime: new Date().toLocaleString(),
    colors: ['Red', 'Blue'],
    team: [],
    showWelcome: false,  // ← Change to false
    isLoggedIn: true,    // ← Change to true
    userCount: 42,
    company: { name: 'Test', location: 'Paris', founded: 2024, services: [] }
  })
}

// 3. Add more colors
exports.testDynamic_experiment3 = (req, res) => {
  res.render('pages/test-dynamic', {
    title: 'Test',
    message: 'More colors!',
    currentTime: new Date().toLocaleString(),
    colors: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink'],  // ← Add more
    team: [],
    showWelcome: true,
    isLoggedIn: false,
    userCount: 42,
    company: { name: 'Test', location: 'Paris', founded: 2024, services: [] }
  })
}

// 4. Add a team member
exports.testDynamic_experiment4 = (req, res) => {
  res.render('pages/test-dynamic', {
    title: 'Test',
    message: 'New team member!',
    currentTime: new Date().toLocaleString(),
    colors: ['Red', 'Blue'],
    team: [
      { name: 'Alice', role: 'Designer', email: 'alice@test.com' },
      { name: 'Bob', role: 'Developer', email: 'bob@test.com' },
      { name: 'YOUR NAME', role: 'YOUR ROLE', email: 'your@email.com' }  // ← Add yourself!
    ],
    showWelcome: true,
    isLoggedIn: false,
    userCount: 42,
    company: { name: 'Test', location: 'Paris', founded: 2024, services: [] }
  })
}

// UNDERSTANDING THE DIFFERENCE
// ============================================

// ❌ STATIC HTML (Before EJS):
/*
<h1>We Make Creative Things Everyday</h1>
<div class="card">
  <h5>Branding Design</h5>
  <p>Create brands</p>
</div>
<div class="card">
  <h5>Web Development</h5>
  <p>Build websites</p>
</div>
*/
// Problem: To change, you must edit HTML file
// Problem: Each card is copy-pasted
// Problem: Can't fetch from database

// ✅ DYNAMIC EJS (After):
/*
<h1><%= hero.title %></h1>
<% services.forEach(service => { %>
  <div class="card">
    <h5><%= service.title %></h5>
    <p><%= service.description %></p>
  </div>
<% }) %>
*/
// Benefit: Change data in controller, HTML updates
// Benefit: One template for all cards
// Benefit: Can fetch from database

// NEXT STEPS
// ============================================
// 1. ✅ Complete this quick start
// 2. 📖 Read EJS_IMPLEMENTATION_GUIDE.md
// 3. 🔄 Follow MIGRATION_GUIDE.md to convert your pages
// 4. 💾 Read PRISMA_EJS_INTEGRATION.md to connect database
// 5. 📚 Keep EJS_CHEAT_SHEET.md handy while coding

// COMMON QUESTIONS
// ============================================

// Q: Where does the data come from?
// A: The controller (pagesController.js) prepares the data and passes it to the template

// Q: How do I display a variable?
// A: Use <%= variableName %>

// Q: How do I loop through an array?
// A: Use <% array.forEach(item => { %> ... <% }) %>

// Q: How do I add a condition?
// A: Use <% if (condition) { %> ... <% } %>

// Q: Can I use JavaScript?
// A: Yes! Anything inside <% %> is JavaScript

// Q: How do I fetch from database?
// A: In the controller, use: const data = await prisma.table.findMany()

// DEBUGGING TIPS
// ============================================

// 1. Check what data you're passing:
exports.testDynamic_debug = (req, res) => {
  const pageData = { /* ... */ }
  console.log('Passing this data to template:', pageData)  // ← Add this
  res.render('pages/test-dynamic', pageData)
}

// 2. Display data in template for debugging:
/*
<pre><%= JSON.stringify(team, null, 2) %></pre>
*/

// 3. Check if variable exists:
/*
<% if (typeof team !== 'undefined') { %>
  <p>Team exists!</p>
<% } %>
*/

// READY TO CONVERT YOUR REAL PAGES?
// ============================================
// Once you understand this test page, apply the same concepts to:
// - Home.ejs
// - About.ejs  
// - Portfolio.ejs
// - Contact.ejs

// Follow the MIGRATION_GUIDE.md for step-by-step instructions!
