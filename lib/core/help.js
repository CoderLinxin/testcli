/* 脚手架的一些帮助文件的设置 */

const program = require('commander');

const help = () => {
  /**
   * option(即设置commander的选项options
   *    flags: string, 某个功能对应的可选参数
   *    description?: string, 某个功能的描述
   *    defaultValue?: string | boolean
   * ): this;
   */
  program
      .option('-l --linxin', 'a linxin cli')
      .option('-f --framework <framework> [framework]', 'your framework')
      .option('-d --dest <dest>', 'your directory')
      .on('--help', () => {
        console.log('');
        console.log('打开了帮助面板');
      });
};

module.exports = help;