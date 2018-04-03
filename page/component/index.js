wx.request({
  url: 'http://localhost:8080/rebook/rflight', //仅为示例，并非真实的接口地址
  data: {
    cid : 1
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success: function (res) {
    console.log(res.data)
  }
})

Page({
  data: {
    imgUrls: [
      '/image/b1.jpg',
      '/image/b2.jpg',
      '/image/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  }
})