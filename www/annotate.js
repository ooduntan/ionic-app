var sh = require('shelljs');

function annotateFile (filePath) {
  console.log('annotate ' + filePath);
  var newFilePath = "annotate" + filePath;
  
  sh.exec('ng-annotate -a ' + filePath + ' -o ' + filePath);
}

function annotateFolder (folderPath) {
  console.log("annotate Folder " + folderPath);
  sh.cd(folderPath);
  var files = sh.ls() || [];

  for (var i=0; i<files.length; i++) {
    var file = files[i];
    if (file.match(/.*\.js$/))
      annotateFile(file);
    else if (!file.match(/.*\..*/)) {
      annotateFolder(file);
      sh.cd('../');
    }
  }
}
if (process.argv.slice(2)[0])
  annotateFolder(process.argv.slice(2)[0]);
else {
  console.log('There is no folder');
  console.log('--- node FILENAME.js FOLDER_PATH');
}