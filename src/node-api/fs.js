/**
 * 内置模块 fs
 */
const fs = require("fs");

const basePath = "C:/Users/yue/Desktop/nodejs/files/fileTxt.txt";

// 1.readFileSync 普通读取
// 同步读取
// var data;
// try {
//     data = fs.readFileSync(basePath, "utf8");
//     console.log("文件内容: " + data);
// } catch (err) {
//     console.error("读取文件出错: " + err.message);
// }
// 异步读取
// fs.readFile(basePath, "utf8", (err, data) => {
//     if (err) {
//         return console.error("读取文件出错: " + err.message);
//     }
//     console.log("文件内容: " + data);
// });

// 2.createReadStream 通过文件流读取
// 适合读取大文件
// fs.createReadStream(basePath, "utf8")
//     .on("data", function (chunk) {
//         console.log("读取数据: " + chunk);
//     })
//     .on("error", function (err) {
//         console.log("出错: " + err.message);
//     })
//     .on("end", function () {
//         console.log("没有数据了");
//     })
//     .on("close", function () {
//         console.log("已经关闭");
//     });

// 3.writeFile 文件写入
// 以下代码，如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
// fs.writeFile(basePath, "hello world", "utf8", function (err) {
//     if (err) throw err;
//     console.log("文件写入成功");
// });

// var writeStream = fs.createWriteStream(basePath, "utf8");

// writeStream.on("close", function () {
//     // 已经关闭，不会再有事件抛出
//     console.log("已经关闭");
// });

// writeStream.write("hello");
// writeStream.write("world");
// writeStream.end("");

// 5.stat/access 文件是否存在
// access 访问/权限检测
// fs.access("C:/Users/yue/Desktop/nodejs/files/fileTxt.js", function (err) {
//     if (err) throw err;
//     console.log("存在");
// });

// fs.stat(basePath, function (err, state) {
//     if (err) console.log("不存在");
//     if (state) console.log("存在", state.isFile());
// });

// 6.mkdir/mkdirSync 创建目录
// 如果目录已存在，会报错
// fs.mkdir("./hello", function (err) {
//     console.log(err);
// });

// 7. 删除文件
// fs.unlink(basePath, function (err) {
//     console.log(err || "成功");
// });

// 8. readdirSync遍历目录
// fs.readdirSync()只会读一层，所以需要判断文件类型是否目录，如果是，则进行递归遍历。
// const files = fs.readdirSync("./");
// console.log(files);

// 9.rename 文件重命名
// fs.renameSync("./hello", "./world");

// 10. 监听文件修改
// fs.watchFile(basePath, {}, function (curr, prev) {
//     console.log("修改时间为: " + curr.mtime);
// });
