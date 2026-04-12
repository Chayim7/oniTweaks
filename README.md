# OniTweaks - Premium Fortnite Optimization Website

A production-quality, modern premium website for **OniTweaks**, a Fortnite performance optimization and tweaks brand with a paid model.

## Overview

OniTweaks is built with:
- **Backend**: FastAPI (Python)
- **Templates**: Jinja2
- **Frontend**: Vanilla JavaScript + Static CSS
- **Theme**: Premium dark gaming aesthetic with glassmorphism

The website follows a **hybrid educational + commercial funnel**:
1. Educational guides that build authority and trust
2. Premium optimization packs for exact configurations
3. Before/after video proof and results showcase
4. Blog articles and tools/resources

## Project Structure

```
oniTweaks/
├── app.py                 # FastAPI application with all routes
├── requirements.txt       # Python dependencies
├── .gitignore            # Git ignore rules
├── templates/
│   ├── base.html        # Base template for all pages
│   ├── home.html        # Homepage (hero, guides preview, packs preview)
│   ├── packs.html       # Products/packs page
│   ├── results.html     # Before/after video showcase
│   ├── tools.html       # Tools and resources page
│   ├── blog.html        # Blog articles page
│   └── guides/
│       ├── controller-settings.html
│       ├── reduce-input-delay.html
│       ├── fps-boost.html
│       ├── gpu-settings.html
│       ├── network-optimization.html
│       └── advanced-tweaks.html
├── static/
│   ├── css/
│   │   └── style.css    # Premium dark theme CSS
│   ├── js/
│   │   └── main.js      # Vanilla JavaScript interactions
│   └── images/          # (For future image assets)
```

## Quick Start

### 1. Install Dependencies
```bash
cd OniTweaks
pip install -r requirements.txt
```

### 2. Run Development Server
```bash
uvicorn app:app --reload
```

Visit: **http://localhost:8000**

### 3. Production Deployment
```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

## Routes Overview

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/packs` | Product/packs listing |
| `/results` | Video proof showcase |
| `/tools` | Tools & resources |
| `/blog` | Blog articles |
| `/guides/{topic}` | Educational guides |

## Key Features

### Design
- Premium dark theme with gaming aesthetic
- Glassmorphism effects
- Responsive mobile design
- Smooth animations and transitions

### Interactivity (Vanilla JS)
- Mobile menu toggle
- Scroll reveal animations
- Results filtering
- Newsletter signup
- Form validation
- Keyboard navigation

### Content Strategy
- **Educational Guides**: Teach concepts without giving away paid content
- **Premium Packs**: Exact configurations and tested tweaks
- **Social Proof**: Before/after videos and testimonials
- **Authority**: Blog articles and deep guides

## Customization

### Change Colors
Edit CSS custom properties in `static/css/style.css` (`:root` section)

### Add New Pages
1. Create template in `templates/`
2. Add route in `app.py`
3. Update navigation in `base.html`

## Future Enhancements

- Payment integration (Stripe/Paddle)
- User accounts and membership
- Email newsletter service
- Analytics tracking
- Individual pack detail pages
- Customer testimonials database
- Search functionality
- Video hosting integration

## Performance

- Minimal dependencies (FastAPI, Jinja2)
- Static CSS (no framework bloat)
- Vanilla JavaScript only
- Small bundle size for fast loading

## Support

This is the complete OniTweaks website foundation. All pages are functional and linked. Ready for:
- Video content integration
- Real optimization pack details
- Payment system setup
- Email marketing integration
- Launch and scaling! 
