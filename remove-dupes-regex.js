const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Regex to match the three script tags with flexible whitespace
const regex = /\s*<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/r134\/three\.min\.js"><\/script>\s*<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/vanta@latest\/dist\/vanta\.fog\.min\.js"><\/script>\s*<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/vanta@latest\/dist\/vanta\.waves\.min\.js"><\/script>\s*/g;

content = content.replace(regex, '\n    ');

fs.writeFileSync('index.html', content);
console.log('Removed duplicate scripts using regex');