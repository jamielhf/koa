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
   * 获取账号信息
   * @return {Promise.<void>}
   */
  async getInfo(){
      return new Promise((resolve,reject)=>{
        superagent.post('https://pet-chain.baidu.com/data/user/get')
          .send({"petId":petId,"requestId":(new Date()).getTime(),"appId":1,"tpl":""})
          .set('Accept','application/json')
          .set('Cookie', '__cfduid=dbf8759957a4f5112ef785d7a53935dc61491011387; BAIDUID=9E66BBE6D343AE662D16DAA87DAA9386:FG=1; BIDUPSID=431D87B31DC4883AEF8F59B29BBE2BAF; PSTM=1498794747; MCITY=-%3A; PSINO=7; H_PS_PSSID=1446_21122_18559_17001_22158; FP_UID=ed470ee7366693b09d84195099113d9f; BDUSS=UNNRjItWlRWY0t5aGZPaGozTnhlU3VSS2NZMXV-UDZPYjJyU0J6Zm9hWHNRSjlhQVFBQUFBJCQAAAAAAAAAAAEAAAA2bF04amFtaWUyMDEzxdbX0wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOyzd1rss3daa; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598')
          .end(function(err, res) {
            if (err) {
              //do something
            } else {
              resolve(res.body)
            }
          })
      })

    },
    async createBuy(petId){
        return new Promise((resolve,reject)=>{


          superagent.post('https://pet-chain.baidu.com/data/market/shouldJump2JianDan')
            .send({"requestId":(new Date()).getTime(),"appId":1,"tpl":""})
            .end(async (err, res) =>{
              if (err) {
                console.log('发起购买失败')
              } else {
                superagent.post('https://pet-chain.baidu.com/data/txn/create')
                  .send({"petId":petId,"requestId":(new Date()).getTime(),"appId":1,"tpl":""})
                  .set('Cookie','__cfduid=dbf8759957a4f5112ef785d7a53935dc61491011387; BAIDUID=9E66BBE6D343AE662D16DAA87DAA9386:FG=1; BIDUPSID=431D87B31DC4883AEF8F59B29BBE2BAF; PSTM=1498794747; MCITY=-%3A; FP_UID=ed470ee7366693b09d84195099113d9f; BDUSS=R2NFdvZHh6QnNFZTk5a2JHTFVuNWpjbm5hYTlRSm02WVEzbnlhVX5QUjBVNTlhQVFBQUFBJCQAAAAAAAAAAAEAAAA2bF04amFtaWUyMDEzxdbX0wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHTGd1p0xndaen; PSINO=7; H_PS_PSSID=1446_21122_18559_17001_22158; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598')
                  .end(function(err, res) {
                    if (err) {
                      console.log('购买失败')
                      reject(err)
                    } else {
                      console.log('购买响应')
                      resolve(res.body)
                    }
                  })
              }
            })


        })
    },

    async article(ctx){
      let getUrl = ()=>{
        return new Promise((resolve,reject)=> {
          superagent.get('https://juejin.im/timeline/frontend').end(function (err, res) {
            if (err) {
              reject(err)
              console.log(err)
            } else {

              resolve(res.text)
            }
          })
        })
      }

      let r = await  getUrl()
    //cheerio 类似jq的操作，把拿到的html用jq的方式拿到数据
      let $ = cheerio.load(r, {decodeEntities: false});

      let content=[];

       if(r){
         $('.entry-box .title').each(function (idx, element) {

           let $element = $(element);
           content.push({
             title: $element.text()
           })
         })


         ctx.body =  {
           success:true,
           data:content,
           code:0
         }

       }else{
         ctx.body =  {
           success:false
         }
       }







    },




    /**
     * 上传 图片测试
     * @param ctx
     * @returns {Promise.<void>}
     */
    async testUploadImg(ctx){

        let result= {
            success:false
        };
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
    /**
     * 百度图片识别接口测试
     * @param ctx
     * @return {Promise.<void>}
     */
    async testImg(ctx){

        // 上传文件请求处理
        let result = { success: false }
        let serverFilePath = path.join( __dirname, '../static/image' )

        // 上传文件事件

        let img = await uploadFile( ctx, {
            fileType: 'baiDuAiImg',
            path: serverFilePath
        })

        try {

        console.log(fs.existsSync(img[0].s))
        const image = fs.readFileSync(img[0].s).toString("base64");


        // 调用通用文字识别, 图片参数为本地图片
        result.data = await client.generalBasic(image);
        if(!result.data.error_code){
            result.success = true
        }



        }catch (e){
            result.msg = e
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