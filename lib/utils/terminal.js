/* 执行终端命令相关的代码 */
/**
 * child_process.spawn(command,args,options)
 * 方法使用给定的 command 衍生新的进程，并传入 args 中的命令行参数。
 */
const {spawn} = require('child_process');//引入子进程模块

//平时执行npm install 都会另外开启一个子进程去执行(可能是因为假设安装失败子进程挂掉不会影响父进程,也可能是因为执行install命令不是在当前目录(当前进程)而是在目标子目录(开启一个对应子目录的子进程)
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);//开启子进程执行对应的命令
    //把子进程的 stdout 通过管道传到父进程,也可以在spawn的options中设置
    //由于执行终端命令在子进程上执行,因此执行命令打印的一些信息也在子进程显示,需要pipe到当前进程显示
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);

    //当子进程的 stdio 流已被关闭时会触发 'close' 事件,代表终端命令执行完毕(需要通知主进程)
    childProcess.on('close',()=>{
      resolve();
    })
  })
};

module.exports = {
  commandSpawn
};

