const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
// Replace literal backslash-n with actual newline using split/join for foolproof replacement
content = content.split('\\n').join('\n');
fs.writeFileSync('index.html', content);
console.log('Fixed literal \\n characters');