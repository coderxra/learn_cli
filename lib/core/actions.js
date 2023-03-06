const { promisify } = require("util");

const path = require("path");

// 下载GitHub仓库的工具
const download = promisify(require("download-git-repo"));
// 打开浏览器的工具包
const open = require("open");

// vue模板的地址
const { vueRepo } = require("../config/repo-config");

// 封装的执行终端命令的函数
const { commandSpawn } = require("../utils/terminal");

// 封装解析模板的函数
const { compile, writeToFile, createDirSync } = require("../utils/utils");

const createProjectAction = async (project) => {
  console.log("why helps you create your project~");

  // 1、clone项目
  await download(vueRepo, project, { clone: true });

  // 2、执行npm install
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], { cwd: `./${project}` });
  // await commandSpawn('npm', ['install'], {cwd: `./${project}`}) // mac
  // await commandSpawn('npm.cmd', ['install'], {cwd: `./${project}`}) //windon

  // 3、运行npm run serve
  commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });

  // 4、打开浏览器
  open("http://localhost:8080/");
};

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1、编译ejs模板
  // console.log( {name, lowerName: name.toLowerCase()});
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });

  // 2、写入文件的操作
  const targetPath = path.resolve(dest, `${name}.vue`);
  // console.log(targetPath, result, '-----');

  writeToFile(targetPath, result)
    .then((res) => {})
    .catch((err) => {
      // console.log(err);
    });
};

// 添加组件和路由
const addPageAndRouter = async (name, dest) => {
  // 1.编译ejs模板
  const data = { name, lowerName: name.toLowerCase() };
  const pageResult = await compile("vue-component.ejs", data);
  const routeResult = await compile("vue-router.ejs", data);

  // 3.写入文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`);
    const targetRoutePath = path.resolve(targetDest, "router.js");
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
};

const addStoreAction = async (name, dest) => {
  // 1.遍历的过程
  const storeResult = await compile('vue-store.ejs', {});
  const typesResult = await compile('vue-types.ejs', {});

  // 2.创建文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`);
    const targetRoutePath = path.resolve(targetDest, 'types.js')
    writeToFile(targetPagePath, storeResult);
    writeToFile(targetRoutePath, typesResult);
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouter,
  addStoreAction
};
