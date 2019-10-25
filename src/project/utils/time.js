const countDown =  (endTime)=> {
  // 目标日期时间戳
  const end = endTime
  // 当前时间戳
  const now = Date.parse(new Date())
  // 相差的毫秒数
  const msec = end - now
  // 计算时分秒数
  // let day = parseInt(msec / 1000 / 60 / 60 / 24)
  let hr = parseInt(msec / 1000 / 60 / 60 % 24)
  let min = parseInt(msec / 1000 / 60 % 60)
  let sec = parseInt(msec / 1000 % 60)

  let h = hr > 9 ? hr : '0' + hr;
  let m = min > 9 ? min : '0' + min;
  let s = sec > 9 ? sec : '0' + sec;
  return {h,m,s}
}


export {
  countDown
}