#!/usr/bin/env node
/**
 * #!/usr/bin/env node
 * 固定格式表示在当前环境中找到node去执行当前文件
 */
// console.log('why cli');

const program = require("commander");

const { helpOptions } = require("./lib/core/help");
const createCommands = require("./lib/core/create");

// 获取package.json文件的版本号 第二个参数可以修改指令
program.version(require("./package.json").version, "-v, --version");

// 帮助和可选信息
helpOptions();

// 创建其他指令
createCommands()


// 解析指令
program.parse(process.argv);

console.log(program.dest, '===');
