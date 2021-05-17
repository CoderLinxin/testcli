/* 用于定义一些其他命令 */

const program = require('commander');

const {createAction, addCpnAction, addPageAction,addStoreAction} = require('./actions');

/**
 *  command(用于定义一个命令
 *      nameAndArgs: string,设置命令的名称
 *      opts?: CommandOptions
 *  ): ReturnType<this['createCommand']>;
 */

const createCommands = () => {
  //定义create命令
  program
      .command('create <project> [others...]')
      .description('clone a repository into a folder')//定义命令的描述信息
      .action(createAction);//定义命令的回调函数

  //定义addCpn命令:对应目录添加一个vue组件
  program
      .command('addcpn <templateName> [others...]')
      .description('add vue component,例子：linxin adcpn Swiper [-d src/components]')//定义命令的描述信息
      .action((templateName, others) => {
        //传递生成组件的名字和输入 -d 参数后获得的dest即输出目录(不写则有默认参数)
        addCpnAction(templateName, program._optionValues.dest || 'src/components')
      });//定义命令的回调函数

  //定义addpage命令:对应目录添加一个page组件和router.js
  program
      .command('addpage <page>')
      .description('add vue page and router config,例子：linxin addpage Profile [-d src/pages]')//定义命令的描述信息
      .action((pageName) => {
        addPageAction(pageName, program._optionValues.dest || `src/pages/${pageName.toLowerCase()}`)
      });

  //定义addstore命令:对应目录添加一个types.js和store.js
  program
      .command('addstore <store>')
      .description('add store.js and types.js,例子：linxin addstore audio [-d src/store/modules]')//定义命令的描述信息
      .action((storeName) => {
        addStoreAction(storeName, program._optionValues.dest || `src/store/modules/${storeName.toLowerCase()}`)
      });
};

module.exports = createCommands;