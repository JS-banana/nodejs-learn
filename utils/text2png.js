"use strict"

/**
 * 描述: node文字转图片
 * 相关博客: https://cnodejs.org/topic/583c5d9fba57ffba06c24a89
 * 轮子: images、text-to-svg、svg2png
 */

const fs = require("fs")
const images = require("images")
const TextToSVG = require("text-to-svg")
const svg2png = require("svg2png")
const Promise = require("bluebird")

Promise.promisifyAll(fs)

const textToSVG = TextToSVG.loadSync("fonts/文泉驿微米黑.ttf")

const sourceImg = images("./i/webwxgetmsgimg.jpg")
const sWidth = sourceImg.width()
const sHeight = sourceImg.height()

const svg1 = textToSVG.getSVG("魏长青-人人讲App", {
  x: 0,
  y: 0,
  fontSize: 24,
  anchor: "top",
})

const svg2 = textToSVG.getSVG("邀请您参加", {
  x: 0,
  y: 0,
  fontSize: 16,
  anchor: "top",
})

const svg3 = textToSVG.getSVG("人人讲课程", {
  x: 0,
  y: 0,
  fontSize: 32,
  anchor: "top",
})

Promise.coroutine(function* generateInvitationCard() {
  const targetImg1Path = "./i/1.png"
  const targetImg2Path = "./i/2.png"
  const targetImg3Path = "./i/3.png"
  const targetImg4Path = "./i/qrcode.jpg"
  const [buffer1, buffer2, buffer3] = yield Promise.all([
    svg2png(svg1),
    svg2png(svg2),
    svg2png(svg3),
  ])

  yield Promise.all([
    fs.writeFileAsync(targetImg1Path, buffer1),
    fs.writeFileAsync(targetImg2Path, buffer2),
    fs.writeFileAsync(targetImg3Path, buffer3),
  ])

  const target1Img = images(targetImg1Path)
  const t1Width = target1Img.width()
  const t1Height = target1Img.height()
  const offsetX1 = (sWidth - t1Width) / 2
  const offsetY1 = 200

  const target2Img = images(targetImg2Path)
  const t2Width = target2Img.width()
  const t2Height = target2Img.height()
  const offsetX2 = (sWidth - t2Width) / 2
  const offsetY2 = 240

  const target3Img = images(targetImg3Path)
  const t3Width = target3Img.width()
  const t3Height = target3Img.height()
  const offsetX3 = (sWidth - t3Width) / 2
  const offsetY3 = 270

  const target4Img = images(targetImg4Path)
  const t4Width = target4Img.width()
  const t4Height = target4Img.height()
  const offsetX4 = (sWidth - t4Width) / 2
  const offsetY4 = 400

  images(sourceImg)
    .draw(target1Img, offsetX1, offsetY1)
    .draw(target2Img, offsetX2, offsetY2)
    .draw(target3Img, offsetX3, offsetY3)
    .draw(target4Img, offsetX4, offsetY4)
    .save("./i/card.png", { quality: 90 })
})().catch((e) => console.error(e))
