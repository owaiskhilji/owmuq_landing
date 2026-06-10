const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Split into lines to handle any line ending issues robustly
let lines = content.split(/\r?\n/);

let newLines = [];
let skipUntilVantaEnd = false;
let foundVantaInit = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 1. Remove hardcoded script tags
    if (line.includes('three.min.js') || line.includes('vanta.fog.min.js') || line.includes('vanta.waves.min.js')) {
        continue; // Skip this line
    }
    
    // 2. Handle Vanta initialization block replacement
    if (line.includes('// Initialize Vanta.js FOG Effect')) {
        foundVantaInit = true;
        skipUntilVantaEnd = true;
        newLines.push('            // Vanta.js is now initialized dynamically via initVantaBackground() at the end of the file');
        continue;
    }
    
    if (skipUntilVantaEnd) {
        if (line.includes('vantaCanvas.style.background = \'#0A0F1E\';') || line.includes('} else {') || line.includes('const vantaCanvas = document.getElementById') || line.includes('if (vantaCanvas) {') || line.includes('}')) {
            // We need to be careful to only skip the Vanta block. 
            // Let's use a simpler marker: skip until we see "// Apply 3D Tilt Effect"
        }
        if (line.includes('// Apply 3D Tilt Effect to major cards')) {
            skipUntilVantaEnd = false;
            newLines.push(line);
        }
        continue;
    }
    
    // 3. Add dynamic script before </body>
    if (line.trim() === '</body>') {
        newLines.push('    <script>');
        newLines.push('        window.initVantaBackground = function() {');
        newLines.push('            if (typeof VANTA !== \'undefined\') {');
        newLines.push('                VANTA.FOG({');
        newLines.push('                    el: "#vanta-canvas",');
        newLines.push('                    mouseControls: true,');
        newLines.push('                    touchControls: true,');
        newLines.push('                    gyroControls: false,');
        newLines.push('                    minHeight: 200.00,');
        newLines.push('                    minWidth: 200.00,');
        newLines.push('                    highlightColor: 0x1e3a8a,');
        newLines.push('                    midtoneColor: 0x0a0f1e,');
        newLines.push('                    lowlightColor: 0x0a0f1e,');
        newLines.push('                    baseColor: 0x050505,');
        newLines.push('                    blurFactor: 0.60,');
        newLines.push('                    speed: 1.50,');
        newLines.push('                    zoom: 1.00');
        newLines.push('                });');
        newLines.push('            }');
        newLines.push('        };');
        newLines.push('');
        newLines.push('        if (window.innerWidth >= 768) {');
        newLines.push('            const scripts = [');
        newLines.push('                "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",');
        newLines.push('                "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js",');
        newLines.push('                "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"');
        newLines.push('            ];');
        newLines.push('            let loadedCount = 0;');
        newLines.push('            scripts.forEach(src => {');
        newLines.push('                const script = document.createElement(\'script\');');
        newLines.push('                script.src = src;');
        newLines.push('                script.defer = true;');
        newLines.push('                script.onload = () => {');
        newLines.push('                    loadedCount++;');
        newLines.push('                    if (loadedCount === scripts.length) {');
        newLines.push('                        window.initVantaBackground();');
        newLines.push('                    }');
        newLines.push('                };');
        newLines.push('                document.body.appendChild(script);');
        newLines.push('            });');
        newLines.push('        } else {');
        newLines.push('            document.body.style.backgroundColor = "#0A0F1E";');
        newLines.push('            const vantaCanvas = document.getElementById(\'vanta-canvas\');');
        newLines.push('            if (vantaCanvas) vantaCanvas.style.background = \'#0A0F1E\';');
        newLines.push('        }');
        newLines.push('    </script>');
    }
    
    newLines.push(line);
}

fs.writeFileSync('index.html', newLines.join('\n'));
console.log('Successfully updated script loading strategy');