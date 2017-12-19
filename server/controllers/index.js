/**
 * Created by linhaifeng
 * on 2017/11/29.
 */

const http = require('http');
const queryString = require('querystring');
const request = require('superagent');
const cheerio = require('cheerio');
const URL = require('url');
const fs = require('fs');
const path = require('path');
const {postData,uploadFile,imageMin} = require('../utils/util')




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
                request.get('https://juejin.im/welcome/frontend')
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
    async testApi(ctx){

        let q = ctx.request.body;

        let res = await  postData(q.url,q.method,q.data);

        ctx.body = {
            data:res
        }
    },
    async uploadImg(ctx){
        // 上传文件请求处理
        let result = { success: false }
        let serverFilePath = path.join( __dirname, '../static/image' )

        // 上传文件事件

        result = await uploadFile( ctx, {
            fileType: 'album',
            path: serverFilePath
        })
        ctx.body = result

    }
}


module.exports = indexControllers;