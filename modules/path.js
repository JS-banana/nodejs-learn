/**
 * 内置模块 path
 */
const path = require("path");

// 1.dirname 获取所在路径
// var filepath = "/tmp/demo/js/test.js";
// console.log(path.dirname(filepath)); // /tmp/demo/js

// 2.basename 获取文件名
console.log(path.basename("/tmp/demo/js/test.js")); // test.js
console.log(path.basename("/tmp/demo/js/test/")); // test
console.log(path.basename("/tmp/demo/js/test")); // test

// console.log(path.basename("/tmp/demo/js/test.js", ".js")); // test

// 3.extname 获取文件扩展名
// 从B的最后一个.开始截取，直到最后一个字符
// 如果B中不存在.，或者B的第一个字符就是.，那么返回空字符串。
// console.log(path.extname("/tmp/demo/js/test.js")); // .js
// console.log(path.extname("/tmp/demo/js/test.module.js")); // .js
// console.log(path.extname("/tmp/demo/js/test.module.")); // .
// console.log(path.extname("/tmp/demo/js/test")); // ''
// console.log(path.extname(".test")); // ''

// 4.join 路径组合
// console.log(path.join("/foo", "bar", "baz/asdf", "quux", ".."));

// resolve
// 相当于 命令行 cd
// 当前路径 \Users\yue\Desktop\nodejs
// console.log(path.resolve("")); // \Users\yue\Desktop\nodejs
// console.log(path.resolve("/test")); // \test
// console.log(path.resolve("test")); // \Users\yue\Desktop\nodejs\test
// console.log(path.resolve("/test", "/demo")); // \demo
// console.log(path.resolve("/test", "./demo")); // \test\demo

// __dirname // \Users\yue\Desktop\nodejs\modules
// __filename // \Users\yue\Desktop\nodejs\modules\path.js

// 5.parse 路径解析

// console.log(path.parse("/tmp/demo/js/test.js"));
// {
//     root: '/',
//     dir: '/tmp/demo/js',
//     base: 'test.js',
//     ext: '.js',
//     name: 'test'
// }

// normalize

// var index = 0;

// var compare = function (desc, callback) {
//     console.log("[用例%d]：%s", ++index, desc);
//     callback();
//     console.log("\n");
// };

// compare("路径为空", function () {
//     // 输出 .
//     console.log(path.normalize(""));
// });

// compare("路径结尾是否带/", function () {
//     // 输出 /tmp/demo/js/upload
//     console.log(path.normalize("/tmp/demo/js/upload"));

//     // /tmp/demo/js/upload/
//     console.log(path.normalize("/tmp/demo/js/upload/"));
// });

// compare("重复的/", function () {
//     // 输出 /tmp/demo/js
//     console.log(path.normalize("/tmp/demo//js"));
// });

// compare("路径带..", function () {
//     // 输出 /tmp/demo/js
//     console.log(path.normalize("/tmp/demo/js/upload/.."));
// });

// compare("相对路径", function () {
//     // 输出 demo/js/upload/
//     console.log(path.normalize("./demo/js/upload/"));

//     // 输出 demo/js/upload/
//     console.log(path.normalize("demo/js/upload/"));
// });

// compare("不常用边界", function () {
//     // 输出 ..
//     console.log(path.normalize("./.."));

//     // 输出 ..
//     console.log(path.normalize(".."));

//     // 输出 ../
//     console.log(path.normalize("../"));

//     // 输出 /
//     console.log(path.normalize("/../"));

//     // 输出 /
//     console.log(path.normalize("/.."));
// });

// 6.format 文件路径分解/组合
// path.parse(filepath)：path.format()方法的反向操作。
// root vs dir：两者可以互相替换，区别在于，路径拼接时，root后不会自动加/，而dir会。
// var p1 = path.format({
//     root: "/tmp/",
//     base: "hello.js",
// });
// console.log(p1); // 输出 /tmp/hello.js

// var p2 = path.format({
//     dir: "/tmp",
//     name: "hello",
//     ext: ".js",
// });
// console.log(p2); // 输出 /tmp/hello.js

// 7.relative 获取相对路径
// 从from路径，到to路径的相对路径。
// 如果from、to指向同个路径，那么，返回空字符串。
// 如果from、to中任一者为空，那么，返回当前工作路径。
// var p1 = path.relative("/data/orandea/test/aaa", "/data/orandea/impl/bbb");
// console.log(p1); // 输出 "../../impl/bbb"

// var p2 = path.relative("/data/demo", "/data/demo");
// console.log(p2); // 输出 ""

// var p3 = path.relative("/data/demo", "");
// console.log(p3); // ..\..\Users\yue\Desktop\nodejs
