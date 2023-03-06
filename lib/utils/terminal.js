/**
 * 执行终端命令相关的代码
 */

// 开启子进程
const { spawn } = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    try {
      const childProcess = spawn(...args);
      childProcess.stdout.pipe(process.stdout);
      childProcess.stderr.pipe(process.stderr);
      childProcess.on("close", () => {
        resolve();
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  commandSpawn,
};
