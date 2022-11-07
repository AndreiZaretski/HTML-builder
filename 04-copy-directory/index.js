const fs = require('fs');
const path = require('path');

const dirCurrent = path.join(__dirname, 'files');
const dirNew = path.join(__dirname, 'files-copy');

function isErr(err) {
  if (err) throw err;
}
  function copyFolder() {
 fs.mkdir(dirNew, { recursive: true }, isErr);
 fs.readdir(dirNew, { withFileTypes: true },
    (err, files) => {
      isErr(err);
      files.forEach(file => {
      if (file.isFile()) {
        fs.unlink(path.join(dirNew, file.name), isErr);
        }
      });
      fs.readdir(dirCurrent, { withFileTypes: true },
        (err, files) => {
          isErr(err);
          files.forEach(file => {
              if (file.isFile()) {
                fs.copyFile(path.join(dirCurrent, file.name), path.join(dirNew, file.name),
                isErr);
              }
            })
          });
    });
  }

  copyFolder(dirCurrent, dirNew);
  