/**
 * Created by linhaifeng
 * on 2017/11/29.
 */

const http = require('http');
const queryString = require('querystring');
const superagent = require('superagent');
const cheerio = require('cheerio');
const  { URL }  = require('url');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const {postData,uploadFile,imageMinUtil} = require('../utils/util')
const request = require('request');

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
    async testUploadImg(ctx){


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


            // f = path.join(__dirname,'../static/image/album/1ae59b4974695.png')

            let formData = {
                attachments: [
                    fs.createReadStream(f)
                ]
            };

            request.post({url:'http://localhost:3000/api/upload2', formData: formData}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.log('Upload successful!  Server responded with:', body);

            });

        })


        ctx.body ={
            a:1
        }


    },
    async testApi(ctx){

        let q = ctx.request.body;

        console.log(q)

        let res = await  postData(q.url,q.method,q.data);
        console.log(res)

        ctx.body = {
            data:res
        }


    },

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