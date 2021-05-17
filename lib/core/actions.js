//actions.js
/* 集中管理actions */

/**
 * function download (repo, dest, opts, fn):Promise {}
 * repo:即github仓库地址(需要遵循一定的书写规范)
 * dest:输出的目标文件夹
 * opts:clone:true 表示clone仓库时包括一些.git文件也下载下来
 * fn:(err):void{} 用来处理错误的回调
 */

const path = require('path');
const repositoryConfig = require('../config/reposi-config');
const util = require('util');
const {commandSpawn} = require('../utils/terminal');
const {compileEjs, writeToFile, createDirSync} = require('../utils/util');

//将require('download-git-repo')请求到的download方法封装成返回promise对象的函数
const cloneRepository = util.promisify(require('download-git-repo'));
const open = require('open');

//使用async + await：可以看成promise的语法糖(更优雅)
const createAction = async (project, others) => {
  console.log('正在构建项目架构');
  //1. clone项目
  await cloneRepository(repositoryConfig.vueRepo, project, {clone: true});

  //2.执行cnpm/npm install 命令
  // 注意window平台执行npm命令实际上是npm.cmd,其他平台为npm
  // process.platform 属性会返回标识操作系统平台（Node.js 进程运行其上的）的字符串
  const command = process.platform === 'win32' ? 'cnpm.cmd' : 'npm';
  // 第三个参数中cwd表示子进程的当前工作目录,即我们需要进入到对应工作目录来执行命令(我们当前的目录是目标文件夹还没创建出来时的路径,我们需要在创建成功目标文件夹后进目标文件夹路径下执行命令)
  await commandSpawn(command, ['install'], {cwd: `./${project}`});

  //3.执行npm run serve(注意这里不要使用await,因为打开浏览器需要该服务不关闭,因此该服务所在的子进程也不会关闭,也就不会触发close事件)
  commandSpawn(command, ['run', 'serve'], {cwd: `./${project}`});

  //4.打开浏览器
  open('http://localhost:8080/');
};

//定义添加组件的action
const addCpnAction = async (templateName, dest) => {
  //1.编译ejs模板 result:对应html字符串
  const result = await compileEjs('vue-component.ejs', {name: templateName, lowerName: templateName.toLowerCase()});

  //2.将编译好的html字符串写入对应目录(注意使用resolve的目的是为了保证输出路径的正确性)
  const filePath = path.resolve(dest, `${templateName}.vue`);

  createDirSync(dest);//创建对应文件夹
  await writeToFile(filePath, result);
};

const addPageAction = async (pageName, dest) => {
  //1.编译ejs模板 result:对应html字符串
  const data = {name: pageName, lowerName: pageName.toLowerCase()};
  const pageResult = await compileEjs('vue-component.ejs', data);
  const routerResult = await compileEjs('vue-router.ejs', data);

  //2.将编译好的html字符串写入对应目录(注意使用resolve的目的是为了保证输出路径的正确性)
  const pagePath = path.resolve(dest, `${pageName}.vue`);
  const routerPath = path.resolve(dest, `router.js`);

  createDirSync(dest);//创建对应文件夹
  await writeToFile(pagePath, pageResult);
  await writeToFile(routerPath, routerResult);
};

const addStoreAction = async (storeName, dest) => {
  //1.编译ejs模板 result:对应html字符串
  const storeResult = await compileEjs('vue-store.ejs', {});
  const typesResult = await compileEjs('vue-types.ejs', {});

  //2.将编译好的html字符串写入对应目录(注意使用resolve的目的是为了保证输出路径的正确性)
  const storePath = path.resolve(dest, `store.js`);
  const typesPath = path.resolve(dest, `router.js`);

  createDirSync(dest);//创建对应文件夹
  await writeToFile(storePath, storeResult);
  await writeToFile(typesPath, typesResult);
};

module.exports = {
  createAction,
  addCpnAction,
  addPageAction,
  addStoreAction
};