const fs = require('fs');
const path = require('path');

function isErr(err) {
  if (err) throw err;
}
fs.readdir(path.join(__dirname, 'secret-folder') , {withFileTypes: true}, (err, folderItem)=>{
  isErr(err);
  folderItem.forEach(fileRes => {
  if(fileRes.isFile()) {
      
    let filePath = path.join(__dirname, "secret-folder", fileRes.name);
    //let fileName = filePath.split('.')[0];
    let fileType = path.extname(filePath).replace('.', '');
    let fileName = path.basename(filePath).replace(`.${fileType}`, '');
    fs.stat(filePath, (err, stats) => {
      //if (err) throw err;
      isErr(err);
      let fileSize = stats.size;
      console.log(`${fileName} - ${fileType} - ${fileSize}b`);
    });
    }
  })
});
