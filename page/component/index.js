Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  onLoad : function(){
    var that = this;
    var data;
    wx.request({
      url: 'https://www.lanrensc.cn/ysg-system/shop/index', //仅为示例，并非真实的接口地址
      data: {
        cid: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        console.log(res.data.retValue.banner);
        that.setData({banner:res.data.retValue.banner});
        console.log(data);
      }
    })
  }
})