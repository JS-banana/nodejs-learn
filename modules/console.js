/**
 * 内置模块 console
 */

// 自定义
// 将调试信息打印到本地文件

const fs = require("fs");

const basePath = "C:/Users/yue/Desktop/nodejs/files/fileTxt.txt";

const file = fs.createWriteStream(basePath);

const logger = new console.Console(file, file);

logger.log("hello");

logger.log("123");
