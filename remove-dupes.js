const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Remove the duplicate script tags from the head
const oldScripts = `    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"></script>
`;

content = content.replace(oldScripts, '');

fs.writeFileSync('index.html', content);
console.log('Removed duplicate render-blocking scripts from <head>');