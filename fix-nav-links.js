const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Desktop Nav: Lead Engine -> Services
content = content.replace(
    `<a href="#engine"
                        class="text-sm font-medium text-brand-textPrimary hover:text-brand-gold transition-colors">Lead
                        Engine</a>`,
    `<a href="#services"
                        class="text-sm font-medium text-brand-textPrimary hover:text-brand-gold transition-colors">Services</a>`
);

// 2. Desktop Nav: ROI -> Lead Engine
content = content.replace(
    `<a href="#roi"
                        class="text-sm font-medium text-brand-textPrimary hover:text-brand-gold transition-colors">ROI</a>`,
    `<a href="#engine"
                        class="text-sm font-medium text-brand-textPrimary hover:text-brand-gold transition-colors">Lead Engine</a>`
);

// 3. Mobile Menu: Lead Engine -> Services
content = content.replace(
    `<a href="#engine"
                    class="block px-3 py-2 text-base font-medium text-brand-textPrimary hover:text-brand-gold hover:bg-brand-card rounded-md">Lead
                    Engine</a>`,
    `<a href="#services"
                    class="block px-3 py-2 text-base font-medium text-brand-textPrimary hover:text-brand-gold hover:bg-brand-card rounded-md">Services</a>`
);

// 4. Mobile Menu: ROI -> Lead Engine
content = content.replace(
    `<a href="#roi"
                    class="block px-3 py-2 text-base font-medium text-brand-textPrimary hover:text-brand-gold hover:bg-brand-card rounded-md">ROI</a>`,
    `<a href="#engine"
                    class="block px-3 py-2 text-base font-medium text-brand-textPrimary hover:text-brand-gold hover:bg-brand-card rounded-md">Lead Engine</a>`
);

// 5. Footer: ROI Calculator -> Lead Engine
content = content.replace(
    `<a href="#roi" class="text-brand-textSecondary text-xs hover:text-brand-gold transition-colors">ROI
                    Calculator</a>`,
    `<a href="#engine" class="text-brand-textSecondary text-xs hover:text-brand-gold transition-colors">Lead Engine</a>`
);

fs.writeFileSync('index.html', content);
console.log('Successfully updated all navbar and footer links');