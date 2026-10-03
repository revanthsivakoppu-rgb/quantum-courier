// Publish only the files used by the game, excluding development history and tools.
const fs = require('node:fs');
const path = require('node:path');
const destination = path.join(__dirname, 'dist');
fs.mkdirSync(destination, { recursive: true });
for (const file of ['index.html', 'style.css', 'quantum.js', 'replay.js', 'levels.js', 'onboarding.js', 'game.js', 'home-lab.js']) {
  fs.copyFileSync(path.join(__dirname, file), path.join(destination, file));
}
console.log('Static game ready in dist/');
