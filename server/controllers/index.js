/**
 * Created by linhaifeng
 * on 2017/11/29.
 */

const http = require('http');
const queryString = require('querystring');
const superagent = require('superagent');
const cheerio = require('cheerio');
const  { URL }  = require('url');
const conf = require('../config')
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const {postData,uploadFile,imageMinUtil,isLogin,isLogin2} = require('../utils/util')
const request = require('request');



const AipOcrClient = require("baidu-aip-sdk").ocr;



// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipOcrClient(conf.BAIDU.appId, conf.BAIDU.apiKey, conf.BAIDU.secretKey);





const indexControllers = {
    async getApiTest(ctx){

        const options={
            hostname:'webtest.yunyichina.cn',
            port:3000,
            path:'/api/yyt.base.user.sys.login',
            method:'GET'
        }

         async function getData() {
          return  new Promise((resolve,reject)=>{
                let req = http.request(options, function(res){
                    let result = '';
                    res.setEncoding('utf-8');
                    res.on('data',function(chunk){
                        result =chunk
                    });
                    res.on('end',function(){
                        resolve(result)
                        console.log('响应结束********');
                    });
                });

                req.end();
            })
        }

       ctx.body = await getData()



    },
    /**
     * 获取掘金文章列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    async article(ctx){

        const getUrl  = async ()=>{
            return new Promise((resovle,reject)=>{
                superagent.get('https://juejin.im/welcome/frontend')
                    .query({}) // query string
                    .end((err, res) => {
                        if(!err){
                            resovle(res)
                        }else{
                            reject(err)
                        }

                    });

            })

        }

        let res = {
            success:true,
            data:{}
        }
        let $ = cheerio.load((await getUrl()).text);
        res.data.article = [];
        $("ul.entry-list .title").map((k,i)=>{
           let dom = $(i);

            res.data.article.push({
                title:dom.text()||"",
                artUrl:('https://juejin.im'+dom.attr('href'))||""
            })
        })


        ctx.body =  res

    },
    /**
     * 上传 图片测试
     * @param ctx
     * @returns {Promise.<void>}
     */
    async testUploadImg(ctx){

        let result= {
            success:false
        }
         let handleForm = async function (ctx) {

            return new Promise((resolve,reject)=>{
                let req =  ctx.req;

                let form = new formidable.IncomingForm();
                let f = '',url = '';

                form.encoding = 'utf-8'; //设置编辑
                // form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;  //设置上传目录
                form.keepExtensions = true; //保留后缀
                form.maxFieldsSize = 20 * 1024 * 1024; //文件大小
                form.parse(req, function(err, fields, files) {

                    url = fields.url


                }).on("file", function(name, file) {
                    f = file.path;

                }).on("end",async function() {

                    let formData = {
                        attachments: [
                            fs.createReadStream(f)
                        ]
                    };

                    request.post({url:url, formData: formData}, function optionalCallback(err, httpResponse, body) {
                        if (err) {
                              console.error('upload failed:', err);

                            reject(err)
                        }
                        console.log('Upload successful!  Server responded with:', body);
                        result.success = true
                        resolve(body)

                    });

                })
            })

        }

        result.data =  JSON.parse(await handleForm(ctx));

        ctx.body = result


    },
    async testImg(ctx){
        console.log(1)
        // 上传文件请求处理
        let result = { success: false }
        let serverFilePath = path.join( __dirname, '../static/image' )

        // 上传文件事件

        let img = await uploadFile( ctx, {
            fileType: 'baiDuAiImg',
            path: serverFilePath
        })


        const image = fs.readFileSync(img[0].s).toString("base64");
//
// // 调用通用文字识别, 图片参数为本地图片
        try {
            result.data = await client.generalBasic(image);
            result.success = true
        }catch (e){

        }


        ctx.body = result


    },


    /**
     * 接口测试
     * @param ctx
     * @returns {Promise.<void>}
     */
    async testApi(ctx){


        let q = ctx.request.body;
        let res = {
            success:false
        }
        if(q.url&&q.method&&q.data){
             res = await  postData(q.url,q.method,q.data);
        }

        ctx.body = {
            data:res
        }

    },
    /**
     * 上传并压缩图片
     * @param ctx
     * @returns {Promise.<void>}
     */
    async uploadImg(ctx){
        // 上传文件请求处理
        let result = { success: false }
        let serverFilePath = path.join( __dirname, '../static/image' )

            // 上传文件事件

        let img = await uploadFile( ctx, {
            fileType: 'album',
            path: serverFilePath
        })


        let arr = [],min;
        img.map(function (i,k) {
            arr.push(i.s)
        })

        min  =   await imageMinUtil(arr);
        console.log(min)
        img.map(function (i,k) {
            delete i.s;
            try {
                i.minPath = min[k].minPath;
                i.minSize = min[k].minSize;
            }
            catch (e){
                console.log(e)
            }

        })
        if(img){
            result.success = true
            result.data = img
        }

        ctx.body = result


    }
}


module.exports = indexControllers;