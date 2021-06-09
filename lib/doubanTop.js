/**
 * 描述：豆瓣电影Top爬虫 导出到表格
 * 轮子：request-promise/cheerio/xlsx
 */
const rp = require("request-promise");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

// 请求 豆瓣top 每页25条数据
const request = async (page = 0) => {
    const url = `https://movie.douban.com/top250?start=${page * 25}&filter=`;
    const res = await rp(url);

    const $ = cheerio.load(res);
    const currentList = $(".grid_view li");

    let list = [];

    currentList.each((index, el) => {
        const bd = $(el)
            .find(".bd p")
            .html()
            .replace(/(\r\n\t|\n|\r\t|&nbsp;)/gm, "")
            .split("<br>")
            .map((n) => n.trim());

        list.push({
            sort: $(el).find(".pic em").first().text(),
            name: $(el).find(".title").first().text(),
            stars: $(el).find(".rating_num").text(),
            evaluate: $(el).find(".star span").last().text(),
            actor: bd[0],
            type: bd[1],
            description: $(el).find(".quote .inq").text(),
            img: $(el).find(".pic img").attr("src"),
        });
    });

    return list;
};

const toXlsx = (list = []) => {
    // 二维数组的形式
    let arr = [];
    // 表格的第一行
    const navBar = [
        "序号",
        "名称",
        "评分",
        "评价",
        "演员",
        "类型",
        "描述",
        "图片",
    ];
    arr.push(navBar);
    // 从第二行开始写入
    list.forEach((obj, index) => {
        const item = [];
        Object.keys(obj).forEach((key) => {
            item.push(obj[key]);
        });
        //   console.log(item)
        arr.push(item);
    });

    let filename = `豆瓣电影top${list.length}.xlsx`; // 导出表格名称
    let ws_name = "Sheet1"; // Excel第一个sheet的名称
    let wb = xlsx.utils.book_new();
    let ws = xlsx.utils.aoa_to_sheet(arr);
    // 宽度设置
    ws["!cols"] = [
        { wch: 5 },
        { wch: 20 },
        { wch: 5 },
        { wch: 14 },
        { wch: 30 },
        { wch: 48 },
        { wch: 72 },
        { wch: 10 },
    ];
    xlsx.utils.book_append_sheet(wb, ws, ws_name); // 将数据添加到工作薄
    xlsx.writeFile(wb, filename); // 导出Excel

    //   console.log(arr)
};

// 发起请求数量
const getTop = async (top = 100) => {
    const pagenation = Math.ceil((top > 250 ? 250 : top) / 25);

    const myRequest = [];

    for (let i = 0; i < pagenation; i++) {
        myRequest.push(await request(i));
    }

    Promise.all(myRequest)
        .then((res) => {
            //   console.log(res.flat())
            //
            toXlsx(res.flat());
        })
        .finally(console.log);
};

module.exports = getTop;
