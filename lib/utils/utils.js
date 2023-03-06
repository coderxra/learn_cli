const fs = require("fs");

const ejs = require("ejs");
const path = require("path");

const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);
  // console.log(templatePath);

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      // console.log(result, '----compile');
      resolve(result);
    });
  });
};
// 判断path是否存在, 如果不存在, 创建对应的文件夹
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
};

const writeToFile = (path, content) => {
  // console.log(path, content, '====');
  return fs.promises.writeFile(path, content);
};

module.exports = {
  compile,
  writeToFile,
  createDirSync,
};
