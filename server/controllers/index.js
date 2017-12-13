/**
 * Created by linhaifeng
 * on 2017/11/29.
 */

const http = require('http');
const request = require('superagent');



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
    async test(ctx){

        const getUrl  = async ()=>{
            return new Promise((resovle,reject)=>{
                request.get('https://juejin.im/')
                    .query({}) // query string
                    .end((err, res) => {
                        if(!err){
                            resovle(res)
                        }else{
                            reject()
                        }

                    });

            })

        }
        console.log((await getUrl()).text)

                ctx.body =  (await getUrl()).text

    }
}


module.exports = indexControllers;