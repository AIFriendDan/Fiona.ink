# Product Requirements Document (PRD)
## Fiona.Ink - Tattoo Artist Portfolio Website

**Last Updated:** December 17, 2025

---

## Original Problem Statement
Build an edgy website for Fiona, a tattoo artist, with placeholders for pictures. The website should showcase her portfolio, provide information about services, allow booking consultations, and have a dark aesthetic with electric/neon accents.

---

## User Personas

### Primary User: Fiona (Tattoo Artist)
- Needs a professional online presence
- Wants to showcase her portfolio work
- Requires an easy way for clients to book consultations
- Desires an edgy, modern aesthetic that reflects tattoo culture

### Secondary User: Potential Clients
- Looking for a skilled tattoo artist
- Want to see portfolio examples and styles
- Need clear information about services and pricing
- Want easy contact/booking process

---

## Core Requirements (Static)

### Functional Requirements
1. **Portfolio/Gallery Section**
   - Display tattoo work with high-quality images
   - Filter by category (Blackwork, Realism, Traditional, etc.)
   - Lightbox/zoom functionality for detailed viewing

2. **About Section**
   - Artist biography and experience
   - Specialties and certifications
   - Professional credentials

3. **Services & Pricing**
   - Clear service descriptions
   - Transparent pricing information
   - Duration estimates

4. **Contact/Booking Form**
   - Client information capture
   - Tattoo idea description
   - Preferred date selection
   - Form validation and submission confirmation

5. **Navigation & Footer**
   - Smooth scrolling navigation
   - Mobile-responsive menu
   - Social media links
   - Contact information

### Design Requirements
- Dark theme with black background
- Electric/neon accent colors (purple, cyan, green)
- Edgy, modern aesthetic
- Fully responsive design
- High-quality placeholder images
- Professional typography
- Smooth animations and transitions

---

## What's Been Implemented

### Phase 1: Frontend Development (Dec 17, 2025)
✅ **Complete frontend with mock data**

#### Components Created
1. **Navbar.jsx**
   - Fixed navigation bar with scroll effect
   - Mobile-responsive hamburger menu
   - Smooth scroll navigation
   - Electric cyan/purple branding

2. **Hero.jsx**
   - Full-screen hero section
   - Bold typography with neon glow effects
   - CTA buttons for portfolio and booking
   - Statistics display (years, clients, satisfaction)
   - Animated scroll indicator

3. **Portfolio.jsx**
   - Image gallery with 9 placeholder images
   - Category filter (All, Blackwork, Realism, Traditional, Ornamental, Lettering)
   - Hover effects on portfolio items
   - Lightbox modal with navigation (prev/next)
   - Image details and descriptions

4. **About.jsx**
   - Two-column layout with image and content
   - Experience badge overlay
   - Specialties tags
   - Certifications list with checkmarks
   - Decorative border elements

5. **Services.jsx**
   - 6 service cards with icons
   - Pricing and duration information
   - Hover effects with border color change
   - CTA section for consultation booking

6. **Contact.jsx**
   - Full booking form with validation
   - Contact information sidebar
   - Studio hours display
   - Social media links
   - FAQ accordion section
   - Toast notification on form submission

7. **Footer.jsx**
   - Brand information
   - Quick navigation links
   - Contact details
   - Social media icons
   - Copyright information

#### Styling & Design System
- Custom CSS with electric/neon color palette
- Tailwind configuration with custom colors
- Design guidelines implementation (BigFish-inspired)
- Responsive breakpoints for all devices
- Smooth transitions and hover effects
- Custom scrollbar styling
- Proper use of shadcn UI components

#### Mock Data Structure
- 9 portfolio images from Unsplash
- 6 service offerings with pricing
- 3 testimonials (prepared for future use)
- About/bio information
- Contact details and studio hours
- FAQ data (5 questions)

---

## Architecture

### Tech Stack
- **Frontend:** React 19 with CRA
- **Styling:** Tailwind CSS + Custom CSS
- **UI Components:** Shadcn UI
- **Icons:** Lucide React
- **Notifications:** Sonner (toast)
- **Image Sources:** Unsplash (placeholder)

### File Structure
```
/app/frontend/src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Portfolio.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── ui/ (shadcn components)
├── data/
│   └── mock.js (all mock data)
├── App.js (main component)
├── index.css (custom styles)
└── App.css
```

---

## Prioritized Backlog

### P0 Features (Next Phase - Backend Development)
1. **Backend API Setup**
   - FastAPI server configuration
   - MongoDB models for bookings
   - Contact form endpoint
   - Email notification system

2. **Form Integration**
   - Connect contact form to backend API
   - Store booking requests in database
   - Send confirmation emails
   - Admin notification system

3. **Content Management**
   - Upload and manage portfolio images
   - Edit services and pricing
   - Update about/bio information
   - Manage FAQ content

### P1 Features (Enhancement Phase)
1. **Admin Dashboard**
   - View booking requests
   - Manage portfolio gallery
   - Respond to inquiries
   - Update content

2. **Gallery Management**
   - Upload new tattoo images
   - Categorize and tag images
   - Delete/edit portfolio items
   - Reorder gallery display

3. **Email Integration**
   - Automated booking confirmations
   - Reminder emails for appointments
   - Newsletter signup
   - Contact form responses

### P2 Features (Future Enhancements)
1. **Blog/News Section**
   - Share tattoo care tips
   - Announce flash sales
   - Post studio updates
   - SEO content

2. **Online Booking Calendar**
   - Real-time availability
   - Time slot selection
   - Deposit payment integration
   - Automated reminders

3. **Client Gallery**
   - Client login portal
   - View appointment history
   - Upload reference images
   - Track tattoo healing progress

4. **Social Media Integration**
   - Instagram feed display
   - Auto-post new portfolio items
   - Social sharing buttons
   - Review aggregation

---

## Next Tasks

### Immediate Actions
1. ✅ Create frontend with mock data
2. ✅ Implement design guidelines
3. ✅ Add placeholder images
4. ✅ Test all interactive elements
5. 🔄 **Wait for user feedback on frontend**
6. 📋 **Plan backend implementation**

### Backend Development Tasks (When Approved)
1. Create MongoDB models for:
   - Booking requests
   - Portfolio items
   - Service information
   - Contact inquiries

2. Develop API endpoints:
   - POST /api/bookings (submit booking form)
   - GET /api/portfolio (fetch portfolio images)
   - GET /api/services (fetch services)
   - POST /api/contact (contact form)

3. Integrate frontend with backend:
   - Remove mock.js data
   - Connect forms to API endpoints
   - Add loading states
   - Handle API errors

4. Add email functionality:
   - Email service integration
   - Booking confirmation templates
   - Admin notification emails

---

## Success Metrics
- Professional, edgy design that reflects tattoo culture ✅
- Fully functional navigation and interactions ✅
- Mobile-responsive across all devices ✅
- Fast loading times with optimized images ✅
- Clear call-to-actions for booking ✅
- Easy-to-use contact form ✅

---

## Notes
- All current functionality works with mock data
- Forms validate and show toast notifications
- Portfolio lightbox allows image viewing
- Mobile menu works correctly
- Smooth scroll navigation implemented
- Ready for backend integration when user confirms
