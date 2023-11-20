const util = require('../../utils/util.js')

Page({
  data: {
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
        this.fetchData();
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
          this.fetchData();
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
        this.fetchData();
      }
    });
  },
  fetchData: function () {
    const curDate = util.formatDate(new Date());
    wx.request({
      url: 'https://skytools.cn/sky-apps/daily-poetry/' + curDate,
      method: 'GET',
      success: (res) => {
        const data = res.data;
        console.log("获取后台数据成功!");
        this.setData({
          date: curDate,
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
        //TODO:
        console.log("从后台获取数据失败，暂时默认数据填充")
      }
    });
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
  }
});
