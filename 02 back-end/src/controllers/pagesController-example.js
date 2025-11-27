// Example controller with dynamic data
// This shows how to pass data to your EJS templates

exports.home = (req, res) => {
  // You can fetch this data from your database (Prisma)
  // For now, I'm showing static data as an example
  
  const pageData = {
    title: 'Portfolio: Home',
    
    // Hero section data
    hero: {
      title: 'We Make Creative Things Everyday',
      subtitle: 'We are digital agency that helps immersive and engaging user experience',
      image: '../assets/images/laptops-593296.jpg',
      alt: 'reunion',
      buttonText: 'VIEW OUR WORK',
      buttonLink: '/Portfolio'
    },
    
    // Contact information (reused across page)
    contact: {
      address: {
        line1: '27 Division St, NY',
        line2: '10002, USA'
      },
      phone: '+1 800 123 654',
      email: '987first.agency@gmail.com'
    },
    
    // Marquee text
    marqueeText: 'We Give Unparalleled Flexibility',
    
    // Services section
    servicesTitle: 'WHAT WE CAN DO FOR OUR CLIENTS',
    services: [
      {
        title: 'Branding Design',
        description: 'Create unique and memorable brand identities',
        link: '/Portfolio/Project-Branding'
      },
      {
        title: 'Website Development',
        description: 'Build modern, responsive websites',
        link: '/Portfolio/Project-Website'
      },
      {
        title: 'Illustration Modelling',
        description: 'Custom illustrations and 3D models',
        link: '#'
      },
      {
        title: 'Digital Marketing',
        description: 'Strategic marketing campaigns',
        link: '/Portfolio/Project-Marketing'
      }
    ],
    
    // Brand services section
    brandServices: {
      title: 'WE OFFER A WIDE RANGE OF BRAND SERVICES',
      description: 'We are a creative agency working with brands buildings insightful strategy, creating unique design and crafting value',
      image: '../assets/images/coffee.jpg',
      alt: 'Creative workspace',
      stats: [
        { label: 'BRANDING', value: 48 },
        { label: 'DEVELOPMENT', value: 60 },
        { label: 'ADVERTISING', value: 60 },
        { label: 'MARKETING', value: 40 }
      ]
    },
    
    // Projects section
    projectsTitle: 'DISCOVER OUR SELECTED PROJECTS',
    carouselItems: [
      {
        image: '../assets/images/laptop-development.jpeg',
        title: 'Website Development',
        textClass: 'text-black'
      },
      {
        image: '../assets/images/laptop-on-desk-with-branding-presentation.jpg',
        title: 'Digital Marketing',
        textClass: ''
      },
      {
        image: '../assets/images/Branding-design.jpg',
        title: 'Branding Design',
        textClass: ''
      }
    ],
    
    // Milestones table
    milestones: [
      {
        year: '2017',
        title: 'New York Design Week',
        description: 'We bring to life the most complex projects, specialize',
        role: 'MAIN DEVELOPER'
      },
      {
        year: '2019',
        title: 'The Blue Design Awards',
        description: 'We bring to life the most complex projects, specialize',
        role: 'ANIMATOR'
      },
      {
        year: '2021',
        title: 'Paris Creative Summit',
        description: 'We bring to life the most complex projects, specialize',
        role: 'MAIN DEVELOPER'
      }
    ],
    
    // Video
    videoUrl: '../assets/videos/devs-talking-960x540.mp4',
    
    // Articles section
    articlesTitle: 'READ OURS ARTICLES & NEWS',
    articles: [
      {
        image: '../assets/images/pexels-helenalopes-1015568-small.jpg',
        date: '2017-06-01',
        title: 'Everything You Should Know About Return',
        link: '#'
      },
      {
        image: '../assets/images/archives.jpg',
        date: '2017-06-01',
        title: '6 Big Commerce Design Tips For Big Results',
        link: '#'
      },
      {
        image: '../assets/images/edition-photo.jpg',
        date: '2017-06-01',
        title: '4 Steps to Conduct a Successful Usability',
        link: '#'
      }
    ],
    
    // Partner logos
    logos: [
      '../assets/images/logos/logoipsum-284.png',
      '../assets/images/logos/logoipsum-290.png',
      '../assets/images/logos/logoipsum-338.png',
      '../assets/images/logos/logoipsum-345.png',
      '../assets/images/logos/logoipsum-349.png',
      '../assets/images/logos/logoipsum-369.png',
      '../assets/images/logos/logoipsum-371.png',
      '../assets/images/logos/logoipsum-378.png'
    ],
    
    // CTA section
    cta: {
      title: "LET'S CREATE SOMETHING GREAT",
      subtitle: "We shift you from today's reality to tomorrow's potential, ensury",
      buttonText: "LET'S TALK WITH US",
      buttonLink: '/Contact'
    },
    
    // Newsletter
    newsletter: {
      title: 'Get valuable strategy, culture and brand insights straight to you inbox',
      placeholder: 'Your mail here',
      disclaimer: 'By signing up to receive emails from Motto, you agree to our Privacy Policy. We treat you info responsibly'
    },
    
    // Footer links
    footerLinks: [
      { label: 'About', url: '/About' },
      { label: 'Portfolio', url: '/Portfolio' },
      { label: 'Services', url: '#' },
      { label: 'Testimonials', url: '#' },
      { label: 'Careers', url: '#' }
    ]
  };
  
  res.render('pages/Home-Dynamic', pageData);
}

// Example: Fetching data from database
exports.homeDynamic = async (req, res) => {
  try {
    // Example with Prisma
    // const artworks = await prisma.artwork.findMany({
    //   take: 3,
    //   orderBy: { createdAt: 'desc' }
    // });
    
    // const messages = await prisma.message.findMany({
    //   take: 5,
    //   orderBy: { createdAt: 'desc' }
    // });
    
    res.render('pages/Home', {
      title: 'Home',
      // artworks: artworks,
      // messages: messages,
      // Add other dynamic data here
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).render('pages/error', {
      title: 'Error',
      message: 'Unable to load page'
    });
  }
}

exports.about = (req, res) => {
  res.render('pages/About', {title: 'Portfolio: About'})
}

exports.contact = (req, res) => {
  res.render('pages/Contact', {title: 'Portfolio: Contact'})
}

exports.portfolio = async (req, res) => {
  // Example: Filter by category
  const category = req.query.category || 'all';
  
  // You would fetch from database here
  // const artworks = category === 'all' 
  //   ? await prisma.artwork.findMany()
  //   : await prisma.artwork.findMany({ where: { categorie: category } });
  
  res.render('pages/Portfolio', {
    title: 'Portfolio: Portfolio',
    // artworks: artworks,
    selectedCategory: category
  })
}

exports.website = (req, res) => {
  res.render('pages/Project-Website', {title: 'Website'})
}

exports.marketing = (req, res) => {
  res.render('pages/Project-Marketing', {title: 'Marketing'})
}

exports.branding = (req, res) => {
  res.render('pages/Project-Branding', {title: 'Branding'})
}

exports.photo_edition = (req, res) => {
  res.render('pages/Project-Photo-Edition', {title: 'Photo-Edition'})
}
