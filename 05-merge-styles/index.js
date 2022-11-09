const fs = require('fs');
const path = require('path');

const dirStylesNew = path.join(__dirname, 'project-dist');
const dirStyles = path.join(__dirname, 'styles');

function isErr(err) {
  if (err) throw err;
}

function createStyle(err, files) {
  isErr(err);
  files.forEach(file =>{
    if (file.isFile()) {
      let fileName = file.name;
      //path.join(__dirname, 'styles', file.name);
      let fileType = path.extname(fileName);
      if (fileType ==='.css') {
        fs.readFile(path.join(dirStyles, fileName), 'utf-8', writeStyles);
      }
    }
  })
}

function writeStyles(err, data) {
  isErr(err);
  fs.appendFile(path.join(dirStylesNew, 'bundle.css'), `${data}\n`, isErr);
}

fs.readdir(dirStyles, {withFileTypes: true}, createStyle);
fs.writeFile(path.join(dirStylesNew, 'bundle.css'), '', isErr);
//fs.readdir(dirStyles, {withFileTypes: true}, createStyle);

