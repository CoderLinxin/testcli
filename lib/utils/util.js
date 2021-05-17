/* 定义一些工具方法 */
const path = require('path');
const fs = require('fs');

const {promisify} = require('util');
const ejs = require('ejs');
const renderFile = promisify(ejs.renderFile);//封装成返回Promise对象的函数

//封装一个编译ejs文件的方法
const compileEjs = function (templateName, data) {
  //获取ejs模板文件所在路径
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);

  //编译对应ejs文件并传入数据
  return renderFile(templatePath, {data}, {});
};

//封装一个写入文件的方法
function writeToFile(path, content) {
  return fs.promises.writeFile(path, content);
}

//定义一个根据路径(pathName)递归创建文件夹的方法(pathName要求最内层路径也是文件夹而不是j具体文件)例如：src/pages/profile
function createDirSync(pathName) {
  if (!fs.existsSync(pathName)) {//当前路径不存在
    createDirSync(path.dirname(pathName));//继续向上寻找父路径
  } else//当前路径存在则退出方法
    return;

  fs.mkdirSync(pathName);//创建文件夹
}


module.exports = {
  compileEjs,
  writeToFile,
  createDirSync
};
