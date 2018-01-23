/**
 * Created by linhaifeng
 * on 2018/1/23.
 */

import  * as http   from './module/http'


export default  {

  async articleList(){
    return await  http.get('index/article')
  },
  /**
   *
   * @param url
   * @param type
   * @param data
   * @param header
   * @returns {Promise}
   */
  async testApi(url,type,data,header = ''){
    return await http.post('index/testApi',{
        url,
        method:type,
        data
      }
   )
  },

  /**
   * 提交图片
   * @param data
   * @returns {Promise}
   */
  async upload(data){
    return await http.post('index/uploadImg',
      data,
      {'content-type': 'multipart/form-data'},
    )
  },

}
