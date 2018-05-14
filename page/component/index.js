Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  onLoad : function(options){
    var that = this;
    var data;
    var openId = wx.getStorageSync('openId');
    if (options.cid){
      wx.setStorageSync('cid', options.cid);
    }else{
      wx.setStorageSync('cid', 1);
    }
    if (!openId){
      wx.login({
        success: function (res) {
          console.log(res.code);
          wx.request({
            url: "https://www.lanrensc.cn/ysg-system/wx/queryOpenId",
            data : {
              code : res.code
            },
            success: function (res) {
              console.log(res.data);
              if (res.data){
                console.log(res.data)
                wx.setStorageSync('openId', res.data);
              }
            }
          })  
        }
      })
    };


    wx.request({
      url: 'https://www.lanrensc.cn/ysg-system/shop/index', //仅为示例，并非真实的接口地址
      data: {
        cid: wx.getStorageSync('cid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        console.log(res.data.retValue.banner);
        that.setData({
          banner:res.data.retValue.banner,
          newlist: res.data.retValue.newlist
        });
      }
    })
  }

 
})