## 诗画共赏

“诗画共赏”是一个展示唐诗宋词和DALL-E3 AI配图的小程序。每天，你可以在这里欣赏到一首精选的唐诗宋词，以及根据诗句生成的DALL-E3 AI配图。

#### 运行截图

<img src="./assets/screen_shot.jpeg" alt="诗画共赏" width=300px/>

#### 体验小程序⬇️

<img src="./assets/gh_71c17530cffe_1280.jpg" alt="诗画共赏" width=300px/>

最开始用Taro+VUE3+[NutUI](https://nutui.jd.com/taro/vue/4x/#/zh-CN/guide/intro)开发，感觉有点卡。后来用原生的微信小程序+[TDesign](https://tdesign.tencent.com/miniprogram/overview)重构了现在这个版本。

TDesign需要执行下面的npm命令安装, 安装之后通过微信开发工具的 “工具➡️构建npm” 生成`miniprogram_npm`
```
npm init
npm i tdesign-miniprogram -S --production
```

## 后端代码

[vertx starter](https://github.com/yangchuang/vertx-starter)

## 感谢 

- [今日诗词](https://www.jinrishici.com/) 提供的API获取每天的推荐诗词
- [https://devv.ai/](https://devv.ai/) 很好用的一个AI搜索引擎，帮我这个后台开发解决了很多前端微信小程序开发的问题

## 灵感来源

- [yihong0618/2023](https://github.com/yihong0618/2023)
