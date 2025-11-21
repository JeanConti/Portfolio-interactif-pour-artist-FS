exports.home = (req, res) => {
  res.render('pages/home', {title: 'Home'})
}

exports.about = (req, res) => {
  res.render('pages/about', {title: 'Portfolio: About'})
}

exports.contact = (req, res) => {
  res.render('pages/contact', {title: 'Portfolio: Contact'})
}

exports.portfolio = (req, res) => {
  res.render('pages/portfolio', {title: 'Portfolio: Portfolio'})
}
exports.portfolio = (req, res) => {
  res.render('pages/portfolio/Project-Website', {title: 'Website'})
}
exports.portfolio = (req, res) => {
  res.render('pages/portfolio/Project-Marketing', {title: 'Marketing'})
}
exports.portfolio = (req, res) => {
  res.render('pages/portfolio/Project-Branding', {title: 'Branding'})
}
exports.portfolio = (req, res) => {
  res.render('pages/Portfolio/Project-Photo-Edition', {title: 'Photo-Edition'})
}