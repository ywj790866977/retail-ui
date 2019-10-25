let _filters = {};

_filters.dateFormat = (dateStr, pattern = "") => {
  //根据给定的时间字符串，得到特定的时间
  var dt = new Date(dateStr); //yyy---mm-dd
  var y = dt.getFullYear(); //得到年份
  var m = dt.getMonth() + 1; //得到月份
  var d = dt.getDate(); //得到日期 // return y + '-' + m + '-' + d
  if (pattern.toLowerCase() === "yyyy-mm-dd") {
    return `${y}-${m}-${d}`;
  } else {
    var hh = dt.getHours(); //得到时
    var mm = dt.getMinutes(); //得到分
    var ss = dt.getSeconds(); //得到秒
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
}

export default Vue => {
  Object.keys(_filters).forEach(key => {
    Vue.filter(key, _filters[key]);
  });
};