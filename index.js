#!/usr/bin/env node
const program = require('commander');//引入commander库

const help = require('./lib/core/help.js');
const createCommands = require('./lib/core/create.js');

help();//设置option
createCommands();//创建create命令

/**
 * version(
 *    str: string, 即希望显示的版本号
 *    flags?: string,即可选参数的设置,注意该参数只能一次设置两个可选参数
 *    description?: string
 * ): this;
 */
/**
 * parse(需要对命令行输入的可选参数进行解析(这一步是必须的)
 *    argv?: string[],
 *    options?: ParseOptions
 * ): this;
 */
program
    .version(require('./package.json').version, '-v --version')
    .version(require('./package.json').version, '-V')
    .parse(process.argv, {from: 'node'});

