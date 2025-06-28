# Portfolio Website - Melanie Lobo

A professional portfolio website showcasing my work as a System Software Development Engineer at Intel.

## Features

- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Dynamic Content**: JSON-driven content management for projects, skills, and blog posts
- **Interactive Elements**: Project filtering, form validation, and smooth animations
- **Professional Sections**:
  - Home page with hero section and overview
  - About page with experience timeline
  - Projects showcase with filtering capabilities
  - Skills display with progress indicators
  - Technical blog with pagination
  - Contact form with validation

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6.0
- **Fonts**: Inter from Google Fonts
- **Dynamic Content**: JSON data files
- **Form Validation**: Custom JavaScript validation

## Project Structure

```
portfolio/
├── index.html              # Home page
├── about.html              # About page
├── projects.html           # Projects showcase
├── skills.html             # Skills display
├── blog.html              # Technical blog
├── contact.html           # Contact form
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── script.js          # Main JavaScript file
├── data/                  # JSON data files
│   ├── projects.json      # Project data
│   ├── skills.json        # Skills and certifications
│   ├── blog.json          # Blog posts
│   ├── experience.json    # Work experience
│   ├── services.json      # Services offered
│   └── testimonials.json  # Client testimonials
└── package.json           # Project configuration
```

## Features Breakdown

### 🏠 Home Page
- Professional hero section
- Overview of expertise areas
- Call-to-action buttons
- Responsive layout

### 👨‍💻 About Page
- Personal story and background
- Professional statistics
- Experience timeline
- Skills overview

### 🚀 Projects Page
- Dynamic project loading from JSON
- Category-based filtering
- Project cards with details
- Technology tags and links

### 🛠️ Skills Page
- Technical skills with progress bars
- Certifications display
- Development tools and platforms
- Categorized skill sets

### 📝 Blog Page
- Technical blog posts
- Category filtering
- Pagination system
- Featured post highlighting

### 📧 Contact Page
- Interactive contact form
- Real-time validation
- Character counter
- Success/error notifications

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

3. Open `index.html` in your browser or serve using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## Customization

### Updating Content
- Modify JSON files in the `data/` directory to update projects, skills, and blog posts
- Edit HTML files for structural changes
- Update CSS variables for theme customization

### Adding New Projects
Add new project entries to `data/projects.json`:
```json
{
  "id": 4,
  "title": "Your Project Title",
  "description": "Project description",
  "category": ["system", "driver"],
  "technologies": ["C++", "Linux"],
  "status": "completed",
  "featured": true,
  "year": "2024",
  "details": {
    "role": "Lead Developer",
    "duration": "6 months",
    "impact": "Performance improvement"
  },
  "links": {
    "github": "#",
    "demo": "#"
  }
}
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance

- Optimized CSS with minimal dependencies
- Lazy loading for dynamic content
- Responsive images and icons
- Fast loading times

## SEO Features

- Semantic HTML structure
- Meta tags for social sharing
- Structured data markup
- Accessible design patterns

## Contact

- **Email**: [miguel.lobomela@example.com](mailto:miguel.lobomela@example.com)
- **LinkedIn**: [https://linkedin.com/in/miguel-lobo-mela](https://linkedin.com/in/miguel-lobo-mela)
- **GitHub**: [https://github.com/miguellobomela](https://github.com/miguellobomela)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

© 2025 Melanie Lobo. All rights reserved.
