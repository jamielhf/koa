/**
 * Created by linhaifeng
 * on 2017/12/15.
 */
//
const request = require('request');
// const http = require('http')
// const queryString = require('querystring');
//
// const requestData = {"timestamp":1513321681533,"doctor_id":"82891d606c3511e791d000163e00065f","doctor_type":"1"};
// //
// //
// // request({
// //     url: 'http://localhost:3009/api/index/article',
// //     method: "get",
// // }, function(error, response, body) {
// //     // console.log(error)
// //     console.log(response.statusCode )
// //     if (!error && response.statusCode == 200) {
// //         console.log(body)
// //     }
// // });
// //
// let content = queryString.stringify(requestData)
//
// const option = {
//     url:'localhost',
//     port:'3009',
//     path:'/api/index/article',
//     method:'get'
// }
//
// let req = http.request(option,function (res) {
//     let body = '';
//     res.on('data',function (d) {
//         body+=d;
//     })
//     res.on('end',function (d) {
//         console.log(body)
//         console.log('请求结束')
//     })
// })
//
// req.on('error',function (err) {
//     console.log(err)
// })
//
// // req.write(content);
// req.end()



var http = require('http');

var qs = require('querystring');

var post_data = {
    email: 123,
    pwd: new Date().getTime()};//这是需要提交的数据

const postData =  function (url,jsonObj,res) {
    request({
        url: url,
        method: 'POST',
        json: jsonObj
    }, function (error, response, body) {
        if (error) {
            console.log(error);
            transfor.translate(error, null);
        } else {
            res(body);
        }
    });

}
postData('http://localhost:3009/api/login',post_data,function (res) {
    console.log(res)
})


var data = {
    email: 123,
    pwd: new Date().getTime()};//这是需要提交的数据


var content = JSON.stringify(data);

var options = {
    hostname:'localhost',
    port:'3009',
    path:'/api/login',
    method:'POST',
    header:{
        'Content-Type': 'application/json',
        'Content-Length':content.length
    }
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
    req.on('error', function(e) {
        console.log('-----error-------',e);
    });
});

req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
req.write(content)
req.end()

