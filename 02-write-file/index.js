const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join(__dirname, 'newtext.txt'), '',
  err => {
      if (err) throw err;
     });
const {stdin, stdout} = process;
stdout.write('Write your text:\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
fs.appendFile(
    path.join(__dirname, 'newtext.txt'), data,
    err => {
    if (err) throw err;
    }
);
});
process.on('SIGINT', () =>process.exit());
process.on('exit', () => stdout.write('Good bye!'));
