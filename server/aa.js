const fs = require('fs');
const AipOcrClient = require("baidu-aip-sdk").ocr;
const conf = require('./config')

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipOcrClient(conf.BAIDU.appId, conf.BAIDU.apiKey, conf.BAIDU.secretKey);


const image = fs.readFileSync("uploads/img1.jpg").toString("base64");

console.log(image.length)
const image2 = fs.readFileSync("static/image/baiDuAiImg/0ef909ba82984.jpeg").toString("base64");
console.log(image2.length)