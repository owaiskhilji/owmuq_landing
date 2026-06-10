const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Replace literal backtick-n with actual newline
content = content.split('`n').join('\n');

fs.writeFileSync('index.html', content);
console.log('Successfully fixed backtick-n characters');