const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Remove the hardcoded script tags
const regexScripts = /\s*<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/r134\/three\.min\.js" defer><\/script>\s*<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/vanta@latest\/dist\/vanta\.fog\.min\.js" defer><\/script>\s*<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/vanta@latest\/dist\/vanta\.waves\.min\.js" defer><\/script>\s*/g;
content = content.replace(regexScripts, '\n');

// 2. Replace the old Vanta initialization block with a comment
const oldVantaInit = `            // Initialize Vanta.js FOG Effect
            if (window.innerWidth >= 768 && typeof VANTA !== 'undefined') {
                VANTA.FOG({
                    el: "#vanta-canvas",
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0x1e3a8a,
                    midtoneColor: 0x0a0f1e,
                    lowlightColor: 0x0a0f1e,
                    baseColor: 0x050505,
                    blurFactor: 0.60,
                    speed: 1.50,
                    zoom: 1.00
                });
            } else {
                // Mobile fallback: static deep navy background to prevent layout shift and save CPU
                const vantaCanvas = document.getElementById('vanta-canvas');
                if (vantaCanvas) {
                    vantaCanvas.style.background = '#0A0F1E';
                }
            }`;

const newVantaInit = `            // Vanta.js is now initialized dynamically via initVantaBackground() at the end of the file`;

content = content.replace(oldVantaInit, newVantaInit);

// 3. Add the dynamic loading script and initVantaBackground function right before </body>
const dynamicScript = `
    <script>
        // Define the initialization function globally so it can be called after dynamic loading
        window.initVantaBackground = function() {
            if (typeof VANTA !== 'undefined') {
                VANTA.FOG({
                    el: "#vanta-canvas",
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0x1e3a8a,
                    midtoneColor: 0x0a0f1e,
                    lowlightColor: 0x0a0f1e,
                    baseColor: 0x050505,
                    blurFactor: 0.60,
                    speed: 1.50,
                    zoom: 1.00
                });
            }
        };

        // Dynamically inject scripts only for desktop users
        if (window.innerWidth >= 768) {
            const scripts = [
                "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
                "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js",
                "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"
            ];

            let loadedCount = 0;
            scripts.forEach(src => {
                const script = document.createElement('script');
                script.src = src;
                script.defer = true;
                script.onload = () => {
                    loadedCount++;
                    if (loadedCount === scripts.length) {
                        // Trigger Vanta initialization once all files are loaded
                        window.initVantaBackground(); 
                    }
                };
                document.body.appendChild(script);
            });
        } else {
            // Mobile fallback: enforce flat background color immediately
            document.body.style.backgroundColor = "#0A0F1E";
            const vantaCanvas = document.getElementById('vanta-canvas');
            if (vantaCanvas) {
                vantaCanvas.style.background = '#0A0F1E';
            }
        }
    </script>
</body>`;

content = content.replace(/<\/body>\s*$/, dynamicScript);

fs.writeFileSync('index.html', content);
console.log('Successfully updated script loading strategy for mobile performance');