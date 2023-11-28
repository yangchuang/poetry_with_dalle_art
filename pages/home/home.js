const util = require('../../utils/util.js')

const audio = wx.createInnerAudioContext({
  useWebAudioImplement: false
});

wx.setInnerAudioOption({
  obeyMuteSwitch:false,
  success: function(e) {
    console.log(e)
    console.log("开启静音播放成功")
  },
  fail: function(e) {
    console.error(e)
    console.error("开启静音播放失败")
  }
})

Page({
  data: {
    preDayBtnProps:{
      icon: 'arrow-left',
      size: 'small',
      theme:'light',
      disabled: false
    },
    nextDayBtnProps:{
      icon: 'arrow-right',
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
    ttsBtnProps:{
      icon: 'play-circle',
      size: 'small',
      theme:'light'
    },
    has_audio:false
  },
  
  onLoad: function () {
    //无论登录与否，都加载数据
    this.fetchData(util.formatDate(new Date()));
    //登录
    this.checkSession();
    //音频自然结束后，更改图标
    this.bingAudioOnEnded();
  },
  checkSession: function () {
    wx.checkSession({
      success: (res) => {
        console.log("session未过期，直接获取数据")
        console.log(res)
      },
      fail: () => {
        console.warn("session已过期，重新登录")
        this.login();
      }
    });
  },
  login: function () {
    console.log("准备login");
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log("调用wx.login()接口，登录成功");
          this.requestLogin(res.code);
        } else {
          console.warn('调用wx.login()接口，登录失败！' + res.errMsg);
        }
      },
      fail: (err) => {
        console.log("wx.login fail")
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
          img_list: data.img_list,
          has_audio: data.has_audio ? true:false
        });
        if(data.has_audio) {
          audio.src = "https://skytools.cn/audios/poetry/"+ date +"/1.mp3";
        }
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
    if(!audio.paused) {
      this.stopAudio();
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
    if(!audio.paused) {
      this.stopAudio();
    }
    this.fetchData(nextDate);
  },
  togglePreDayDtn: function(flag) {
    this.setData({
      preDayBtnProps:{
        icon: 'arrow-left',
        size: 'small',
        theme:'light',
        disabled: flag
      }
    })
  },
  toggleNextDayDtn: function(flag) {
    this.setData({
      nextDayBtnProps:{
        icon: 'arrow-right',
        size: 'small',
        theme:'light',
        disabled: flag
      }
    })
  },
  beginAudio:function() {
    if (!audio.paused) {
      this.stopAudio()
    } else {
      this.playAudio()
    }
  },

  stopAudio: function () {
    audio.stop();
    this.setData({
      'ttsBtnProps.icon': 'play-circle'
    });
  },
  playAudio: function () {
    // 播放音频
    audio.play()
    this.setData({
      'ttsBtnProps.icon': 'stop-circle'
    });
  },
  bingAudioOnEnded: function() {
    const page = this;
    audio.onEnded(() => {
      page.setData({
        'ttsBtnProps.icon': 'play-circle'
      });
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
  },
});
