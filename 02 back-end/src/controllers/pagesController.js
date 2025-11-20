exports.home = (req, res) => {
  res.render('pages/home', {title: 'Home'})
}

exports.about = (req, res) => {
  res.render('pages/about', {title: 'About'})
}

exports.contact = (req, res) => {
  res.render('pages/contact', {title: 'contact'})
}

exports.portfolio = (req, res) => {
  res.render('pages/portfolio', {title: 'portfolio'})
}