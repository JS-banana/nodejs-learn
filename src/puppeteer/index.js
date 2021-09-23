const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const rm = require("rimraf");

const URL = "https://es6.ruanyifeng.com/";

const delay = (time) =>
    new Promise((resolve) => setTimeout(() => resolve(1), time));

// 返回路径
function resolve(dir, dir2 = "") {
    return path.posix.join(__dirname, "./", dir, dir2);
}

(async () => {
    const browser = await puppeteer.launch({
        // headless: false,
        // devtools: true,
    });
    let page = await browser.newPage();

    console.log("start load first page...");

    await page.goto(URL);
    await delay(2000);

    // 说明
    const license = `
     <p>
       本<a href="${URL}" target="_blank">《ECMAScript 6 入门》</a>的PDF版本
       <br />
       是由<a href="https://ssscode.com" target="_blank">
         小帅 https://ssscode.com
       </a>
       <br/>
       使用<a href="https://github.com/GoogleChrome/puppeteer" target="_blank">node 库 puppeteer爬虫生成</a>，
       仅供学习交流，严禁用于商业用途。
       <br/>
       <a href="" target="_blank">
         文章 前端使用puppeteer 爬虫生成《ECMAScript 6 入门》PDF并合并
       </a>
       <br/>
     <p>
   `;

    // 简单配置
    const config = {
        // 输出路径
        outputPath: "ES6/",
        // 生成pdf时的页边距
        margin: {
            top: "60px",
            right: "0px",
            bottom: "60px",
            left: "0px",
        },
        // 生成pdf时是否显示页眉页脚
        displayHeaderFooter: true,
        // 生成pdf页面格式
        format: "A4",
    };

    let wh = await page.evaluate((license) => {
        const content = document.querySelector("body #content");
        const div = document.createElement("div");
        div.innerHTML = `
       <div class="block">
         <h2>《ECMAScript 6 入门》的PDF版本说明</h2>
         ${license}
       </div>
     `;

        const pageNavigation = document.createElement("div");
        div.classList.add("PageNavigation");

        content.appendChild(pageNavigation);
        content.appendChild(div);

        return {
            width: 1920,
            height: document.body.clientHeight,
        };
    }, license);

    await page.setViewport(wh);

    await delay(2000);

    const outputPath = resolve(config.outputPath);

    const isExists = fs.existsSync(outputPath);

    console.log("isExists", isExists, "outputPath", outputPath);

    /**
     * @desc 创建输出路径
     * @author luoxiaochuan <lxchuan12@163.com>
     * @date 2018-08-25
     */
    function mkdirOutputpath() {
        try {
            fs.mkdirSync(outputPath);
            console.log("mkdir is successful!");
        } catch (e) {
            console.log("mkdir is failed!", e);
        }
    }
    // 如果不存在 则创建
    if (!isExists) {
        mkdirOutputpath();
    } else {
        // 存在，则删除该目录下的文件重新生成PDF 简单处理
        rm(outputPath, (err) => {
            if (err) throw err;
            console.log("remove the files is successful!");
            mkdirOutputpath();
        });
    }

    console.log("outputPath", outputPath);

    console.log("Now, creating the 0.ECMAScript 6 入门");

    // 创建PDF
    await page.pdf({
        path: resolve(config.outputPath, "0.ECMAScript 6 入门.pdf"),
        margin: config.margin,
        displayHeaderFooter: config.displayHeaderFooter,
        format: config.format,
    });

    console.log("created pdf for fisrt page is successful!");

    await page.close();

    console.log("start the other page...");

    page = await browser.newPage();

    await page.goto(`${URL}/#README`);

    await delay(2000);

    let aLinkArr = await page.evaluate(() => {
        // 隐藏左侧导航，便于生成pdf
        const currentNode = document.querySelector("#sidebar");
        if (currentNode) currentNode.style.display = "none";

        let aLinks = [...document.querySelectorAll("#sidebar ol li a")];
        console.log("aLinks.length", aLinks.length);

        return aLinks.map((a) => {
            return {
                href: a.href.trim(),
                text: a.innerText.trim(),
            };
        });
    });

    console.log("aLinkArr.length", aLinkArr.length);

    for (let i = 1; i < aLinkArr.length; i++) {
        let a = aLinkArr[i];
        let aPrev = aLinkArr[i - 1] || {};
        let aNext = aLinkArr[i + 1] || {};

        await page.goto(a.href);

        await delay(2000);

        console.log("go to ", a.href);
        page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
        //   await page.evaluate(() => console.log(`204 url is ${location.href}`));

        let wh = await page.evaluate(
            (i, a, aLinkArr, aPrev, aNext) => {
                // 隐藏左侧导航，便于生成pdf
                // 隐藏
                function hiddenNode(selector, node) {
                    const currentNode = document.querySelector(selector);
                    if (currentNode) currentNode.style.display = "none";
                }
                hiddenNode("#留言");
                hiddenNode("#disqus_recommendations");
                hiddenNode("#disqus_thread");
                // 给标题加上序号，便于查看
                let h1Node = document.querySelector("#content h1");
                if (h1Node) {
                    h1Node.innerText = a.text;
                }
                // 设置title 加上序号 页眉使用。
                document.title = `${a.text} | ECMAScript 6 入门`;
                console.log(217, document.title);

                let pageNavigation = document.querySelector(".PageNavigation");
                // 给pageNavigation 加上序号 便于查看
                if (pageNavigation) {
                    let prev = pageNavigation.querySelector("p a.prev");
                    let next = pageNavigation.querySelector("p a.next");
                    if (prev) {
                        prev.innerText = `上一节：${aPrev.text}`;
                    }
                    if (next) {
                        next.innerText = `下一节：${aNext.text}`;
                    }
                }

                return {
                    width: 1920,
                    height: document.body.clientHeight,
                };
            },
            i,
            a,
            aLinkArr,
            aPrev,
            aNext
        );

        //   console.log('i', i, 'wh', wh);

        await page.setViewport(wh);

        await delay(2000);
        /**
         * @desc 创建PDF
         * @author luoxiaochuan <lxchuan12@163.com>
         * @date 2018-08-25
         */
        console.log(`Now, creating the ${a.text}.pdf`);

        await page.pdf({
            path: resolve(config.outputPath, `${i}.${a.text}.pdf`),
            margin: config.margin,
            displayHeaderFooter: config.displayHeaderFooter,
            format: config.format,
        });
    }

    console.log("all is successful!");

    browser.close();
})();
