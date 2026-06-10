const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const idx = content.indexOf('} else {');
if (idx !== -1) {
    console.log('Found "} else {" at index', idx);
    console.log('Raw context (JSON):', JSON.stringify(content.substring(idx, idx + 150)));
    
    // Try to fix it by replacing the literal \n with actual newlines
    const fixed = content.substring(idx, idx + 150).replace(/\\n/g, '\n');
    console.log('Fixed context:', fixed);
} else {
    console.log('"} else {" not found');
}