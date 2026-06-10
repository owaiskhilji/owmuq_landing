const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const newScript = `    <script>
      if (window.innerWidth >= 768) {
        // 1. Load Three.js first
        const threeScript = document.createElement('script');
        threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        threeScript.defer = true;
        
        threeScript.onload = () => {
          // 2. Once Three.js is ready, load Vanta Fog
          const vantaScript = document.createElement('script');
          vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";
          vantaScript.defer = true;
          
          vantaScript.onload = () => {
            // 3. Both libraries loaded, now safely initialize the smoke effect
            VANTA.FOG({
              el: "#vanta-canvas",
              mouseControls: true,
              touchControls: false,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              highlightColor: 0xc9a84c,
              midColor: 0x0d1528,
              lowColor: 0x0a0f1e,
              baseColor: 0x0a0f1e,
              blurFactor: 0.6,
              speed: 1.5
            });
          };
          document.body.appendChild(vantaScript);
        };
        document.body.appendChild(threeScript);
      } else {
        // Mobile strict fallback: Clean static background, no scripts downloaded
        const hero = document.querySelector('#vanta-canvas');
        if (hero) hero.style.background = '#0A0F1E';
      }
    </script>
</body>`;

// Replace the old script block (starting from window.initVantaBackground) up to </body>
const regex = /window\.initVantaBackground\s*=\s*function\(\)\s*\{[\s\S]*?document\.body\.appendChild\(script\);\s*\}\);\s*\}\s*else\s*\{[\s\S]*?if\s*\(vantaCanvas\)\s*vantaCanvas\.style\.background\s*=\s*'#0A0F1E';\s*\}\s*\}\s*<\/script>\s*<\/body>/;

if (regex.test(content)) {
    content = content.replace(regex, newScript);
    fs.writeFileSync('index.html', content);
    console.log('Successfully replaced with sequential loader');
} else {
    console.log('Regex did not match. Trying alternative...');
    // Fallback: find the index of "window.initVantaBackground" and replace everything until "</body>"
    const startIdx = content.indexOf('window.initVantaBackground = function()');
    const endIdx = content.lastIndexOf('</body>');
    if (startIdx !== -1 && endIdx !== -1) {
        content = content.substring(0, startIdx) + newScript;
        fs.writeFileSync('index.html', content);
        console.log('Successfully replaced using index fallback');
    } else {
        console.log('Could not find the target block to replace.');
    }
}