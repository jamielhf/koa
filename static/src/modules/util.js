/**
 * Created by linhaifeng
 * on 2017/12/8.
 */

export default {
  /**
   * 读cookie
   * @param name
   * @returns {null}
   */
   getCookie(name){
      let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
      else
        return null;
    },
  /**
   * 写cookie
   * @param name
   * @param value
   */
   setCookie(name,value){
     let Days = 30;
     let exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  }
}
