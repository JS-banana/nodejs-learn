# Node Js 学习

## 前言

通过自学并实践一些demo巩固nodejs基础。

文件目录：

```js
/docs // 学习记录文档
/lib  // 小功能
/utils // 插件及方法
/tests // 测试
```

## 学习记录

记录一些nodejs实现的小功能。

### 豆瓣电影Top250爬虫

```js
const doubanTop = require("../lib/doubanTop");
// 获取Top250数量
doubanTop(50);
```
