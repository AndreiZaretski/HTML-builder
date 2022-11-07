const fs = require('fs');
const path = require('path');

const dirProject = path.join(__dirname, 'project-dist');
const dirStyles = path.join(__dirname, 'styles');
const dirCurrent = path.join(__dirname, 'assets');
const dirAssets = path.join(__dirname, 'project-dist', 'assets');

function isErr(err) {
  if (err) throw err;
}

fs.mkdir(dirProject, {recursive: true}, isErr);

fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, files) =>{
  isErr(err);
  fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) =>{
    isErr(err);
    let template = data.toString();
    for(let file of files) {
      let fileName = file.name.split('.')[0];
      fs.readFile(path.join(__dirname, 'components', file.name), 'utf-8', (err, comp)=>{
        isErr(err);
        template= template.replace(`{{${fileName}}}`, comp.toString());
        fs.writeFile(path.join(dirProject, 'index.html'), template, isErr)
      })
    }
  })
})


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
fs.writeFile(path.join(dirProject, 'style.css'), '',isErr);
function writeStyles(err, data) {
  isErr(err);
  fs.appendFile(path.join(dirProject, 'style.css'), data, isErr);
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

      copyAssets(dirCurrent, dirAssets);
    });
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

  copyFolder(dirCurrent, dirAssets);