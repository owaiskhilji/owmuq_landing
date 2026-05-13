Build a premium single-page real estate landing page using pure HTML5 and Tailwind CSS (via CDN). No frameworks, no build tools.

COLOR SCHEME:
- Primary Background: #0A0F1E (Deep Navy)
- Secondary Background: #0D1528
- Accent Gold: #C9A84C
- Light Gold: #F0D080
- Text Primary: #FFFFFF
- Text Secondary: #94A3B8
- Card Background: #111827
- Border Color: rgba(201, 168, 76, 0.2)

TYPOGRAPHY (Google Fonts CDN):
- Headings: 'Playfair Display' (serif, luxury feel)
- Body: 'DM Sans' (clean, modern)

SECTION 1 — NAVBAR:
- Logo left: gold icon + "EliteProperties" text
- Nav links: Properties | Services | Contact
- CTA button: "Book Free Consultation" (gold border, gold text)
- Sticky on scroll, blur backdrop

SECTION 2 — HERO:
- Full viewport height
- Background: deep navy with subtle gold geometric pattern (CSS only)
- Badge top: "Pakistan's #1 AI Property Platform"
- H1: "Find Your Dream Property" (Playfair Display, 72px desktop)
- Subtitle: "Smart AI matches you with the perfect property. Get instant WhatsApp updates on new listings."
- Two CTAs: "Explore Properties" (gold filled) + "See How It Works" (ghost)
- Stats bar below: "500+ Properties | 200+ Happy Clients | 98% Success Rate"
- Floating animated gold orb (CSS animation, subtle)

SECTION 3 — PROPERTY LISTINGS (3 cards):
Card 1:
- Image placeholder: gradient navy-to-slate with gold border
- Badge: "HOT DEAL"
- Title: "Luxury Villa — DHA Phase 6, Lahore"
- Price: "PKR 4.5 Crore"
- Details: 4 Beds | 3 Baths | 10 Marla
- CTA: "Enquire on WhatsApp" button (gold)

Card 2:
- Badge: "NEW LISTING"
- Title: "Modern Apartment — Bahria Town, Karachi"
- Price: "PKR 1.8 Crore"
- Details: 3 Beds | 2 Baths | 1450 sqft
- CTA: "Enquire on WhatsApp" button (gold)

Card 3:
- Badge: "BEST VALUE"
- Title: "Commercial Plot — Blue Area, Islamabad"
- Price: "PKR 6.2 Crore"
- Details: 8 Marla | Corner Plot | Main Road
- CTA: "Enquire on WhatsApp" button (gold)

Each card: dark card bg, gold accent border on hover, property image area (gradient placeholder), smooth hover scale animation.

SECTION 4 — HOW IT WORKS (3 steps):
Step 1: "Fill the Form" — icon: form/pencil
Step 2: "AI Matches You" — icon: brain/sparkle
Step 3: "Agent Contacts You" — icon: phone/whatsapp
Design: horizontal row, gold numbered circles, connecting line between steps

SECTION 5 — LEAD CAPTURE FORM:
- Section title: "Get Matched With Your Perfect Property"
- Subtitle: "Our AI will find properties matching your exact needs"
- Form fields:
  * Full Name (text input)
  * Phone Number (tel input, placeholder: 03XX-XXXXXXX)
  * Budget Range (select: Under 50 Lakh | 50L-1 Crore | 1-3 Crore | 3 Crore+)
  * Property Type (select: House | Apartment | Plot | Commercial)
  * Preferred Location (text input)
- Submit button: "Get Free Property Matches" (full width, gold bg, navy text)
- On submit: open WhatsApp with pre-filled message containing all form data
- Small text below: "No spam. We only contact you with matching properties."

WHATSAPP INTEGRATION (JavaScript):
const WHATSAPP_NUMBER = "923108037950
On form submit:
1. Prevent default
2. Collect all field values
3. Build message string with all data
4. window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`)

SECTION 6 — TRUST BADGES:
Row of 4 items: "Licensed Agency" | "5-Star Rated" | "10+ Years Experience" | "Verified Properties"
Each with gold icon, white text, subtle divider

SECTION 7 — FOOTER:
- Logo + tagline
- WhatsApp number (clickable)
- Copyright: "© 2025 EliteProperties. All Rights Reserved."
- Background: #060A14

ANIMATIONS & POLISH:
- Navbar: backdrop-blur on scroll (JS scroll listener)
- Hero: fade-in on load (CSS keyframes, staggered)
- Property cards: hover scale(1.02) + gold border glow
- Form inputs: gold border on focus
- Scroll reveal: add 'visible' class on scroll (IntersectionObserver)
- Stats counter: animate numbers on viewport enter

RESPONSIVE:
- Mobile first
- Navbar: hamburger menu on mobile
- Property cards: single column on mobile, 3 col on desktop
- Hero text: scale down on mobile (40px h1)

- Single HTML file, everything inline

## IMPLEMENTATION DETAILS (from index.html)

The `index.html` file implements a comprehensive single-page landing page based on these specifications, incorporating several external CDN-based libraries for enhanced visuals and interactivity:

### Implemented Sections:
- **Hero Section:** Full viewport height with dynamic background and call-to-action.
- **ROI Comparison Section:** Cinematic 'Without vs. With Owmuq' comparison with animated counters and progress bars.
- **AI Chat Demo / Lead Engine:** Interactive sections showcasing the AI automation process.
- **Integrations & Setup Process:** Details on how Owmuq integrates and the setup steps.
- **Tabbed FAQ Section:** Fully responsive FAQ with category tabs on desktop and dropdown on mobile.
- **Lead Capture Form:** With real-time validation and WhatsApp integration on submission.

### External Libraries (CDN):
- **Tailwind CSS:** For utility-first styling.
- **AOS (Animate On Scroll):** For scroll-triggered animations.
- **Three.js:** Used for 3D graphics (e.g., the floating orb).
- **Vanta.js (Fog Effect):** For interactive 3D background animations.
- **Vanilla-tilt.js:** For subtle 3D parallax tilt effects on elements.
- **Google Fonts:** 'Playfair Display' and 'DM Sans' for typography.

### Key Features:
- **WhatsApp Integration:** On form submission, a personalized WhatsApp message is sent to `923108037950` with collected agency details.
- **High-End Aesthetics:** Utilizes a specified color palette, premium typography, and advanced CSS effects like mouse-follow glows and floating particles.

IMPORTANT RULES:
- Use Tailwind CDN only — no npm
- All CSS animations: pure CSS keyframes or Tailwind
- No placeholder image services — use CSS gradients for property images
- Code must be production-ready, clean, commented
- Single HTML file, everything inline