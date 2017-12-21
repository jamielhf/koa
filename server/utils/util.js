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



//接口登录判断
const isLogin = async (ctx, next) => {
    if(ctx.session&&ctx.session.isLogin&&ctx.session.userName){
        await next();
    }else{
        ctx.body = {
            success:false,
            message:'没有登录信息'
        }
    }
};

const postData =  async function (url,method,jsonObj) {

    if(typeof(jsonObj)==='string'){
        jsonObj =  qs.parse(jsonObj)
    }

   return new Promise((resolve,reject)=>{
       request({
           url: url,
           method: method,
           json: jsonObj
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
 * @param filePath 文件路径
 * @returns {Promise}
 */
function imageMinUtil(filePath) {

    return imagemin([filePath], './static/out', {
           plugins: [
               imageminJpegtran(),
               imageminPngquant({quality: '65-80'})
           ]
       })

}

async function test() {
    return new Promise((resolve,reject)=>{

        resolve(1111)

        console.log(2)

    })
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
        let result = {
            success: false,
            message: '',
            data: null
        }

        // 解析请求文件事件
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

            let fileName = Math.random().toString(16).substr(2) + '.' + mimetype.split('/')[1]
            let _uploadFilePath = path.join( filePath, fileName )
            saveTo = path.join(_uploadFilePath)

            console.log(_uploadFilePath)


            // 文件保存到制定路径
            file.pipe(fs.createWriteStream(saveTo))

            // 文件写入事件结束
            file.on('end', function() {

                result.success = true
                result.message = '文件上传成功'
                result.data = {
                    pictureUrl: `//localhost:${conf.port}/image/${fileType}/${fileName}`,
                }
                console.log('文件上传成功！')

            })
        })

        // 解析结束事件
        busboy.on('finish',async function( ) {

            console.log('文件上结束')
            resolve(result)


        })

        // 解析错误事件
        busboy.on('error', function(err) {
            console.log('文件上出错')
            reject(result)
        })

        req.pipe(busboy)
    })


}




module.exports = {
    isLogin,
    postData,
    uploadFile,
    imageMinUtil,
    test,
}