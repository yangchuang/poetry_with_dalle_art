const util = require('../../utils/util.js')

Page({
  data: {
    preDayBtnProps:{
      icon: 'chevron-left-circle',
      size: 'small',
      theme:'light',
      disabled: false
    },
    nextDayBtnProps:{
      icon: 'chevron-right-circle',
      size: 'small',
      theme:'light',
      disabled: true
    },
    shareBtnProps:{
      icon: 'share',
      openType: 'share',
      size: 'small',
      theme:'light'
    },
    date: "",
    content: "",
    title: "",
    dynasty: "",
    author: "",
    origin_content: [],
    img_list: [],
  },
  onLoad: function () {
    this.checkSession();
  },
  checkSession: function () {
    wx.checkSession({
      success: () => {
        console.log("session未过期，直接获取数据")
        // session未过期，直接获取数据
        this.fetchData(util.formatDate(new Date()));
      },
      fail: () => {
        console.warn("session已过期，重新登录")
        this.login();
      }
    });
  },
  login: function () {
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log("调用wx.login()接口，登录成功");
          this.requestLogin(res.code);
        } else {
          console.warn('调用wx.login()接口，登录失败！' + res.errMsg);
          //失败也运行正常显示数据
          this.fetchData(util.formatDate(new Date()));
        }
      },
      fail: (err) => {
        console.error(err);
      }
    });
  },
  requestLogin: function (code) {
    wx.request({
      url: 'https://skytools.cn/sky-apps/api/login',
      data: {
        code: code
      },
      success: (res) => {
        console.log("小程序登录成功:" + res.data.token);
        // 获取数据
        this.fetchData(util.formatDate(new Date()));
      }
    });
  },
  fetchData: function (date) {
    wx.request({
      url: 'https://skytools.cn/sky-apps/daily-poetry/' + date,
      method: 'GET',
      success: (res) => {
        const data = res.data;
        console.log("获取后台数据成功!");
        this.setData({
          date: date,
          content: data.content,
          title: data.title,
          dynasty: data.dynasty,
          author: data.author,
          origin_content: data.origin_content,
          img_list: data.img_list
        });
      },
      fail: (err) => {
        console.error(err.data);
        console.log("从后台获取数据失败，暂时默认数据填充")
      }
    });
  },
  preDay: function () {
    this.toggleNextDayDtn(false);
    const currentDate = new Date(this.data.date);
    currentDate.setDate(currentDate.getDate() - 1);
    const preDate = util.formatDate(currentDate);
    console.log("上一天"+preDate);
    //11-18前还没有数据
    if(preDate === '2023-11-18') { 
      this.togglePreDayDtn(true);
    }
    this.fetchData(preDate);
  },
  
  nextDay: function () {
    this.togglePreDayDtn(false);
    const currentDate = new Date(this.data.date);
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDate = util.formatDate(currentDate);
    if (nextDate === util.formatDate(new Date())) {
      this.toggleNextDayDtn(true);
    }
    console.log("下一天"+nextDate);
    this.fetchData(nextDate);
  },
  togglePreDayDtn: function(flag) {
    this.setData({
      preDayBtnProps:{
        icon: 'chevron-left-circle',
        size: 'small',
        theme:'light',
        disabled: flag
      }
    })
  },
  toggleNextDayDtn: function(flag) {
    this.setData({
      nextDayBtnProps:{
        icon: 'chevron-right-circle',
        size: 'small',
        theme:'light',
        disabled: flag
      }
    })
  },
  onShareAppMessage() {
    return {
      title: '诗画共赏',
      path: '/pages/home/home',
    };
  },
  onShareTimeline() {
    console.log('onShareTimeline');
    return {
      title: '诗画共赏',
      imageUrl: 'https://skytools.cn/images/poetry/daily_poetry_logo.jpeg'
    };
  },
});
