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
   * 时间格式转化
   * @param time
   * @param fmt
   * @return {*}
   */
   dateFormat (time , fmt) {
  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  // Date.prototype.Format = function (fmt) {
  let _date = new Date(time);
  let o = {
    "M+": _date.getMonth() + 1,
    "d+": _date.getDate(),
    "h+": _date.getHours(),
    "m+": _date.getMinutes(),
    "s+": _date.getSeconds(),
    "q+": Math.floor((_date.getMonth() + 3) / 3),
    "S": _date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
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
