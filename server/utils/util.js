/**
 * Created by linhaifeng
 * on 2017/11/23.
 */

const { URL } = require('url');
const request = require('request');
const http = require('http')
const qs = require('querystring');
const conf = require('../config');

const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')  //解析post数据

const imagemin = require('imagemin'); //压缩图片
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');


/**
 * 接口登录判断
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
async function isLogin(ctx, next){
    if(ctx.session&&ctx.session.isLogin&&ctx.session.userName){
        await next();
    }else{
        ctx.body = {
            success:false,
            message:'没有登录信息'
        }
    }
};

/**
 * 时间格式转化
 * @param time
 * @param fmt
 * @return {*}
 */
function dateFormat (time , fmt) {
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    // Date.prototype.Format = function (fmt) {
    let _date = new Date(time);
    let o = {
        "M+": _date.getMonth() + 1,
        "d+": _date.getDate(),
        "h+": _date.getHours(),
        "m+": _date.getMinutes(),
        "s+": _date.getSeconds(),
        "q+": Math.floor((_date.getMonth() + 3) / 3),
        "S": _date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

async function  postData(url,method,jsonObj) {




    if(typeof(jsonObj)==='string'){
        jsonObj = jsonObj.replace(/\s/g,'').replace(/:/g,'=');
        jsonObj =  qs.parse(jsonObj)
    }

   return new Promise((resolve,reject)=>{
       request({
           url: url,
           method: method,
           json: true,
           qs:jsonObj
       }, function (error, response, body) {
           if (error) {
               reject(error);
           } else {
               resolve(body);
           }
       });
   })

}

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync( dirname ) {
    if (fs.existsSync( dirname )) {
        return true
    } else {
        if (mkdirsSync( path.dirname(dirname)) ) {
            fs.mkdirSync( dirname )
            return true
        }
    }
}

/**
 *
 * @param imgList 文件路径
 * @returns {Promise}
 */
async function imageMinUtil(imgList) {

    return new Promise((resolve,reject)=>{
        imagemin(imgList, './static/out', {
            plugins: [
                imageminJpegtran(),
                imageminPngquant({quality: '40-60'})
            ]
        }).then(function(f){
            let arr = [];

            f.map(function (i, k) {

                let t = i.path.split('\\');

                let p = path.join(__dirname,'..',i.path)
                console.log(p)

                let minSize =  fs.readFileSync(p).length||0;

                arr.push({
                    minPath:`//localhost:${conf.port}/${t[1]}/${t[2]}`,
                    minSize
                });
                // arr.push(`//localhost:${conf.port}/${i.path}}`);
            });

            resolve(arr)
        })
    })

    // return await  imagemin(imgList, './static/out', {
    //     plugins: [
    //         imageminJpegtran(),
    //         imageminPngquant({quality: '65-80'})
    //     ]
    // })


}


/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */
async function uploadFile( ctx, options) {

    let req = ctx.req
    let res = ctx.res
    let busboy = new Busboy({headers: req.headers})

    // 获取类型
    let fileType = options.fileType || 'common'
    let filePath = path.join( options.path,  fileType)

    let mkdirResult = mkdirsSync( filePath )
    let saveTo = ''
    return new Promise((resolve, reject) => {
        console.log('文件上传中...')
        let imgList = [] ;
        // 解析请求文件事件
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

            let fileName = Math.random().toString(16).substr(2) + '.' + mimetype.split('/')[1]
            let _uploadFilePath = path.join( filePath, fileName )
            saveTo = path.join(_uploadFilePath)


            // 文件保存到制定路径
            file.pipe(fs.createWriteStream(saveTo))


            // 文件写入事件结束
            file.on('end', function() {

                let s = path.join( filePath, fileName );
                let size =  fs.readFileSync(s).length;

                imgList.push({
                    name: fileName,
                    pictureUrl: `//localhost:${conf.port}/image/${fileType}/${fileName}`,
                    s,
                    size
                });


                console.log('文件上成功')
            })
        })

        // 解析结束事件
        busboy.on('finish',async function( ) {

            console.log('文件上结束')
            resolve(imgList)


        })

        // 解析错误事件
        busboy.on('error', function(err) {
            console.log('文件上出错')

            reject(err)
        })

        req.pipe(busboy)
    })


}


module.exports = {
    isLogin,
    dateFormat,
    postData,
    uploadFile,
    imageMinUtil,
}