const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let data = '';
const { stdout } = require('process')
stream.on('data', chunk => data += chunk);
stream.on('data', chunk => stdout.write(chunk));


