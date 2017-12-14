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

        const postData = queryString.stringify({a:123});


        let url = new URL(q.url)


        let option = {
            hostname:url.hostname,
            port:url.port,
            path:url.pathname,
            method:q.type,
            header:{
                'Content-Type':'application/json',
                'Content-Length':postData.length
            }
        }
        let getData = async ()=>{
            return  new Promise((resolve,reject)=>{
                const req = http.request(option, (res) =>{
                    let result = '';
                    res.setEncoding('utf-8');
                    res.on('data',(chunk)=>{
                        result = chunk;
                        console.log(`响应主体${chunk}`);
                    })

                    res.on('end',()=>{
                        resolve(result)
                    })

                })
                // 写入数据到请求主体
                req.write(postData);
                console.log(postData)
                req.end();

            })
        }



        ctx.body = await getData()
    }
}


module.exports = indexControllers;