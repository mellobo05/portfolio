// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Contact Form Handling with Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Real-time validation for form fields
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        
        formFields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => clearFieldError(field));
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Clear previous errors
            clearAllErrors();
            
            // Name validation
            if (!data.name || data.name.trim().length < 2) {
                showFieldError('name', 'Name must be at least 2 characters long');
                isValid = false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!data.email) {
                showFieldError('email', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(data.email)) {
                showFieldError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Phone validation (optional but if provided, should be valid)
            if (data.phone && data.phone.trim()) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
                    showFieldError('phone', 'Please enter a valid phone number');
                    isValid = false;
                }
            }

            // Subject validation
            if (!data.subject || data.subject.trim().length < 3) {
                showFieldError('subject', 'Subject must be at least 3 characters long');
                isValid = false;
            }

            // Message validation
            if (!data.message || data.message.trim().length < 10) {
                showFieldError('message', 'Message must be at least 10 characters long');
                isValid = false;
            }

            if (!isValid) {
                showNotification('Please correct the errors below before submitting.', 'error');
                return;
            }

            // If validation passes, simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                clearAllErrors();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.overview-item, .project-item, .service-card, .process-step, .skill-category, .certification-item, .blog-post');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Character counter for message textarea
    const messageField = document.getElementById('message');
    const charCounter = document.getElementById('char-count');
    
    if (messageField && charCounter) {
        messageField.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = this.getAttribute('maxlength') || 1000;
            
            charCounter.textContent = currentLength;
            
            // Change color based on character count
            const counterContainer = charCounter.closest('.char-counter');
            if (currentLength > maxLength * 0.9) {
                counterContainer.classList.add('over-limit');
            } else {
                counterContainer.classList.remove('over-limit');
            }
        });
        
        // Initialize counter
        charCounter.textContent = messageField.value.length;
    }

    // Initialize page-specific content
    initializePage();
});

// ========================
// Dynamic Content Loading
// ========================

// Load and display skills data
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const data = await response.json();
        
        const skillsContainer = document.getElementById('skills-container');
        const certificationsContainer = document.getElementById('certifications-container');
        const toolsContainer = document.getElementById('tools-container');
        
        if (skillsContainer && data.technical_skills) {
            displaySkills(data.technical_skills, skillsContainer);
        }
        
        if (certificationsContainer && data.certifications) {
            displayCertifications(data.certifications, certificationsContainer);
        }
        
        if (toolsContainer && data.tools) {
            displayTools(data.tools, toolsContainer);
        }
    } catch (error) {
        console.error('Error loading skills data:', error);
        const skillsContainer = document.getElementById('skills-container');
        if (skillsContainer) {
            skillsContainer.innerHTML = '<div class="error-message">Failed to load skills data. Please try again later.</div>';
        }
    }
}

function displaySkills(skills, container) {
    container.innerHTML = '';
    
    skills.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        categoryDiv.innerHTML = `
            <h3 class="category-title">${category.category}</h3>
            <div class="skills-list">
                ${category.skills.map(skill => `
                    <div class="skill-item">
                        <div class="skill-header">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-level">${skill.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: ${skill.level}%"></div>
                        </div>
                        <div class="skill-details">
                            <span class="skill-years">${skill.years} years</span>
                            <p class="skill-description">${skill.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(categoryDiv);
    });
}

function displayCertifications(certifications, container) {
    container.innerHTML = '';
    
    certifications.forEach(cert => {
        const certDiv = document.createElement('div');
        certDiv.className = 'certification-item';
        
        certDiv.innerHTML = `
            <div class="cert-icon">
                <i class="${cert.icon || 'fas fa-certificate'}"></i>
            </div>
            <div class="cert-content">
                <h4>${cert.name}</h4>
                <p class="cert-issuer">${cert.issuer}</p>
                <p class="cert-date">${cert.date}</p>
                ${cert.credential_url ? `<a href="${cert.credential_url}" target="_blank" class="cert-link">View Credential</a>` : ''}
            </div>
        `;
        
        container.appendChild(certDiv);
    });
}

function displayTools(tools, container) {
    container.innerHTML = '';
    
    tools.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'tools-category';
        
        categoryDiv.innerHTML = `
            <h4>${category.category}</h4>
            <div class="tools-list">
                ${category.tools.map(tool => `
                    <div class="tool-item">
                        <i class="${tool.icon || 'fas fa-tools'}"></i>
                        <span>${tool.name}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(categoryDiv);
    });
}

// Load and display projects data
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer && data.projects) {
            displayProjects(data.projects, projectsContainer);
            initializeProjectFilters(data.projects);
        }
    } catch (error) {
        console.error('Error loading projects data:', error);
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = '<div class="error-message">Failed to load projects data. Please try again later.</div>';
        }
    }
}

function displayProjects(projects, container) {
    container.innerHTML = '';
    
    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.setAttribute('data-category', project.category.join(' '));
        
        projectDiv.innerHTML = `
            <div class="project-card">
                <div class="project-header">
                    <div class="project-icon">
                        <i class="${project.icon || 'fas fa-code'}"></i>
                    </div>
                    <div class="project-meta">
                        <span class="project-year">${project.year}</span>
                        <span class="project-status ${project.status}">${project.status}</span>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-details">
                        <div class="detail-item">
                            <strong>Role:</strong> ${project.details.role}
                        </div>
                        <div class="detail-item">
                            <strong>Duration:</strong> ${project.details.duration}
                        </div>
                        <div class="detail-item">
                            <strong>Impact:</strong> ${project.details.impact}
                        </div>
                    </div>
                </div>
                <div class="project-links">
                    ${Object.entries(project.links).map(([key, url]) => `
                        <a href="${url}" target="_blank" class="project-link">
                            <i class="fas fa-${key === 'github' ? 'code-branch' : key === 'demo' ? 'external-link-alt' : 'file-alt'}"></i>
                            ${key.charAt(0).toUpperCase() + key.slice(1)}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.appendChild(projectDiv);
    });
}

function initializeProjectFilters(projects) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    const categories = item.getAttribute('data-category');
                    if (categories && categories.includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Load and display blog data
let currentPage = 1;
let postsPerPage = 6;
let allPosts = [];
let filteredPosts = [];

async function loadBlog() {
    try {
        const response = await fetch('data/blog.json');
        const data = await response.json();
        
        allPosts = data.posts || [];
        filteredPosts = [...allPosts];
        
        const blogContainer = document.getElementById('blog-container');
        if (blogContainer) {
            displayBlogPosts();
            initializeBlogFilters();
            initializePagination();
        }
    } catch (error) {
        console.error('Error loading blog data:', error);
        const blogContainer = document.getElementById('blog-container');
        if (blogContainer) {
            blogContainer.innerHTML = '<div class="error-message">Failed to load blog posts. Please try again later.</div>';
        }
    }
}

function displayBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);
    
    blogContainer.innerHTML = '';
    
    if (postsToShow.length === 0) {
        blogContainer.innerHTML = '<div class="no-posts">No blog posts found.</div>';
        return;
    }
    
    postsToShow.forEach(post => {
        const postDiv = document.createElement('article');
        postDiv.className = 'blog-post';
        
        postDiv.innerHTML = `
            <div class="post-image">
                <div class="image-placeholder">
                    <i class="fas fa-newspaper"></i>
                </div>
                ${post.featured ? '<span class="featured-badge">Featured</span>' : ''}
            </div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-category">${post.category}</span>
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-read-time">${post.read_time} min read</span>
                </div>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="#" class="read-more-btn" onclick="openBlogPost(${post.id})">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        blogContainer.appendChild(postDiv);
    });
    
    updatePagination();
}

function initializeBlogFilters() {
    const filterButtons = document.querySelectorAll('.blog-filter .filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            if (category === 'all') {
                filteredPosts = [...allPosts];
            } else {
                filteredPosts = allPosts.filter(post => 
                    post.category.toLowerCase().includes(category.toLowerCase()) ||
                    post.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
                );
            }
            
            currentPage = 1;
            displayBlogPosts();
        });
    });
}

function initializePagination() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayBlogPosts();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayBlogPosts();
            }
        });
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageNumbers = document.getElementById('pageNumbers');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
    
    if (pageNumbers) {
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                displayBlogPosts();
            });
            pageNumbers.appendChild(pageBtn);
        }
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function openBlogPost(postId) {
    const post = allPosts.find(p => p.id === postId);
    if (post) {
        alert(`Opening blog post: ${post.title}\n\nThis would typically navigate to a dedicated blog post page.`);
    }
}

// Initialize dynamic content based on current page
function initializePage() {
    const currentPath = window.location.pathname;
    const page = currentPath.split('/').pop().split('.')[0];
    
    switch(page) {
        case 'skills':
            loadSkills();
            break;
        case 'projects':
            loadProjects();
            break;
        case 'blog':
            loadBlog();
            break;
        default:
            // Home page or other pages
            break;
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    `;

    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Form Validation Helper Functions
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    switch(fieldName) {
        case 'name':
            if (!value || value.length < 2) {
                showFieldError(fieldName, 'Name must be at least 2 characters long');
                return false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                showFieldError(fieldName, 'Email is required');
                return false;
            } else if (!emailRegex.test(value)) {
                showFieldError(fieldName, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'phone':
            if (value) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                    showFieldError(fieldName, 'Please enter a valid phone number');
                    return false;
                }
            }
            break;
            
        case 'subject':
            if (!value || value.length < 3) {
                showFieldError(fieldName, 'Subject must be at least 3 characters long');
                return false;
            }
            break;
            
        case 'message':
            if (!value || value.length < 10) {
                showFieldError(fieldName, 'Message must be at least 10 characters long');
                return false;
            }
            break;
    }
    
    showFieldSuccess(field);
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    // Remove existing error/success states
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
    
    // Add error styling to field
    field.style.borderColor = '#ef4444';
    field.style.backgroundColor = '#fef2f2';
}

function showFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    // Remove error state and add success
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    
    // Remove error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add success styling to field
    field.style.borderColor = '#10b981';
    field.style.backgroundColor = '#f0fdf4';
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    // Remove error/success states
    formGroup.classList.remove('error', 'success');
    
    // Remove error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Reset field styling
    field.style.borderColor = '#e2e8f0';
    field.style.backgroundColor = 'white';
}

function clearAllErrors() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        
        const field = group.querySelector('input, textarea, select');
        if (field) {
            field.style.borderColor = '#e2e8f0';
            field.style.backgroundColor = 'white';
        }
    });
}
