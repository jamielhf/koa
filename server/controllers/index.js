/**
 * Created by linhaifeng
 * on 2017/11/29.
 */

const http = require('http');
const queryString = require('querystring');
const request = require('superagent');
const cheerio = require('cheerio');
const { URL } = require('url');

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

        // const postData = queryString.stringify(q.data);
        //
        //
        // let url = new URL(q.url)
        //
        //
        // let option = {
        //     hostname:url.hostname,
        //     port:url.port,
        //     path:url.pathname,
        //     method:'POST',
        //     header:{
        //
        //     }
        // }


        const postData = queryString.stringify({
            doctor_id:'82891d606c3511e791d000163e00065f',
            org_id:'01e57290710c11e7938e00163e0c0311',
            id:'0e38ac40dfd611e79de200163e00065f'
        });

        const options = {
            hostname: 'webtest.yunyichina.cn',
            port: 3000,
            path: '/api/yyt.bone.visit.template.list',
            method: 'get',

        };

        const req = http.request(options, (res) => {
            console.log(`状态码: ${res.statusCode}`);
            console.log(`响应头: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`响应主体: ${chunk}`);
            });
            res.on('end', () => {
                console.log('响应中已无数据。');
            });
        });

        req.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });

// 写入数据到请求主体
        req.write(postData);
        req.end();

        // let getData = async ()=>{
        //     return  new Promise((resolve,reject)=>{
        //         const req = http.request(option, (res) =>{
        //             let result = '';
        //             res.setEncoding('utf-8');
        //             res.on('data',(chunk)=>{
        //                 result = chunk;
        //                 console.log(`响应主体${chunk}`);
        //             })
        //
        //             res.on('end',()=>{
        //                 resolve(result)
        //             })
        //
        //         })
        //          let data = {user:"hello",password:"world"};
        //         req.write(require('querystring').stringify(data));
        //
        //         req.end();
        //
        //     })
        // }



        ctx.body = {
            a:1
        }
    }
}


module.exports = indexControllers;