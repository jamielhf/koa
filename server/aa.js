const fs = require('fs');
const AipOcrClient = require("baidu-aip-sdk").ocr;
const conf = require('./config')

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipOcrClient(conf.BAIDU.appId, conf.BAIDU.apiKey, conf.BAIDU.secretKey);


const image = fs.readFileSync("uploads/img1.jpg").toString("base64");

const url = 'http://www.gloryren.com/img/index/banner3.jpg';

// 调用通用文字识别, 图片参数为本地图片
client.generalBasic(image).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});
// client.generalBasicUrl(url).then(function(result) {
//     console.log(JSON.stringify(result));
// }).catch(function(err) {
//     // 如果发生网络错误
//     console.log(err);
// });