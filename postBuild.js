const fs = require('fs');

console.log('Adding config files to dist');
fs.copyFileSync('.env', './dist/.env');
fs.copyFileSync('firebase-credentials.json', './dist/firebase-credentials.json');

