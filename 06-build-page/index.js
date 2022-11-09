const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

const dirProject = path.join(__dirname, 'project-dist');
const dirStyles = path.join(__dirname, 'styles');
const dirCurrent = path.join(__dirname, 'assets');
const dirAssets = path.join(__dirname, 'project-dist', 'assets');

function isErr(err) {
  if (err) throw err;
}
// fs.rm(dirProject, { recursive: true, force: true }, ((err) => {
//   isErr(err);
fs.mkdir(dirProject, {recursive: true}, isErr);
//}));

async function createHtml() {
  let template = await fsPromise.readFile(path.join(__dirname, 'template.html'));
  let files = await fsPromise.readdir(path.join(__dirname, 'components'), {withFileTypes: true});
  let newHtml = template.toString();
  let htmlComp = '';
  for (let file of files) {
    if (file.isFile() && path.extname(file.name) === '.html'){
      let fileName = file.name.split('.')[0];
      htmlComp = await fsPromise.readFile(path.join(__dirname, 'components', file.name));
      newHtml = newHtml.replace(`{{${fileName}}}`, htmlComp.toString());
    }
    }
  fsPromise.writeFile(path.join(dirProject, 'index.html'), newHtml);
}

createHtml();


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
fs.writeFile(path.join(dirProject, 'style.css'), '', isErr);
function writeStyles(err, data) {
  isErr(err);
  fs.appendFile(path.join(dirProject, 'style.css'), `${data}\n`, isErr);
}

fs.readdir(dirStyles, {withFileTypes: true}, createStyle);
//fs.writeFile(path.join(dirProject, 'style.css'), '', isErr);

function copyFolder() {
  fs.mkdir(dirAssets, { recursive: true }, isErr);

  fs.readdir(dirAssets, { withFileTypes: true },
    (err, files) => {
      isErr(err);
      files.forEach(file => {
      if (file.isFile()) {
        fs.unlink(path.join(dirAssets, file.name), isErr);
        } 
      });
    });

  fs.readdir(dirAssets, { withFileTypes: true },
    (err, files) => {
      isErr(err);

      files.forEach(file => {
        if (file.isDirectory()) {
          fs.readdir(path.join(dirAssets, file.name),{withFileTypes: true}, (err, items) =>{
            isErr(err);
            
              items.forEach(item =>{
                if (item.isFile()) {
                 fs.unlink(path.join(dirProject, 'assets', file.name, item.name), isErr);
                } 
              })
        })
        } 
        });
    });
    copyAssets();
  }

  function copyAssets() {
    fs.readdir(dirCurrent, { withFileTypes: true },
      (err, files) => {
        isErr(err);
        files.forEach(file => {
          if (file.isDirectory()) {fs.mkdir(path.join(dirAssets, file.name), {recursive:true}, (err)=>{isErr(err);
            fs.readdir(path.join(__dirname, 'assets', file.name), {withFileTypes: true}, (err, items) =>{
              isErr(err);
              items.forEach(item =>{
                if (item.isFile()) {
                  fs.copyFile(path.join(__dirname, 'assets', file.name, item.name), path.join(dirProject, 'assets', file.name, item.name),
                  isErr);
                } 
              })
            })
          });
          }
          })
        });
  }

  copyFolder();