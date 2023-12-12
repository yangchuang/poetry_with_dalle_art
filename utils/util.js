const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${[year, month, day].map(formatNumber).join('-')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatTime = (val) => {
  const date = new Date(val);
  return formatDate(date);
};

const convertToTimestamp = dateString => {
  // 使用JavaScript的Date对象来解析日期字符串并转换为时间戳
  const timestamp = new Date(dateString).getTime();
  // 返回时间戳
  return timestamp;
};

module.exports = {
  formatDate, formatTime, convertToTimestamp
}
