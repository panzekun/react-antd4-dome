
/**
 * 获取流水号 <br/>
 * @param 无
 * @returns {String}
 */
export function initiationID() { // 获取流水号
  var date = new Date();
  var pwd = ''
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  var ss = date.getMilliseconds();
  var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var idvalue = '';
  let n = 9//这个值可以改变的，对应的生成多少个字母，根据自己需求所改
  for (var i = 0; i < n; i++) {
    idvalue += arr[Math.floor(Math.random() * 26)];
  }
  pwd = 'H5refe' + Y + M + D + h + m + s + ss + idvalue;
  return pwd
}

/**
 * **判断系统** <br/>
 * @returns {Boolen}
*/
export function wSystemtype() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return 'ios'
  } else if (/(Android)/i.test(navigator.userAgent)) {
    return 'Android'
  } else {
    return 'windows'
  }
}
/**
 *@param {String}
 * **将数字转为金额三位隔开带两位小数** <br/>
 * @returns {Number}
*/
export function fmoney(s) {
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(2) + ''
  var l = s.split('.')[0].split('').reverse(), r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}
/**
 * 节流
 * @param {*} fn 执行函数
 * @param {*} delay 节流时间,毫秒
 */
export function _throttle(fn, delay) {
  var last;
  var timer;
  var delay = delay || 200;
  return function () {
    var th = this;
    var args = arguments;
    var now = +new Date();
    if (last && now - last < delay) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(th, args);
      }, delay);
    } else {
      last = now;
      fn.apply(th, args);
    }
  }
}
/**
 * 防抖
 * @param {*} fn 执行函数
 * @param {*} wait 防抖时间,毫秒
 */
export function _debounce(fn, wait) {
  var wait = wait || 200;
  var timer;
  return function () {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(th, args);
    }, wait);
  };
}
/**
 * 根据字节 截取字符串函数
 * @param {*} str 字符串
 * @param {*} len 字节长度
 */
export function reBytesStr(str, len) {
  if ((!str && typeof (str) != 'undefined')) { return ''; }
  var num = 0;
  var str1 = str;
  var str = '';
  for (var i = 0, lens = str1.length; i < lens; i++) {
    num += ((str1.charCodeAt(i) > 255) ? 2 : 1);
    if (num > len) {
      break;
    } else {
      str = str1.substring(0, i + 1);
    }
  }
  return str;
}


/**
 * 将url变成数组格式
 * Convert the url to an array
 * @param {string} url 路由
 * /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
 */

export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`)
}