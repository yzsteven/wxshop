const app = getApp();
Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  onPullDownRefresh: function () {
        wx.setStorageSync('cid', app.globalData.cid);
        wx.stopPullDownRefresh()
  },
  onLaunch:function(){
    var that = this;
    var data;
    var openId = wx.getStorageSync('openId');
    console.log(app.globalData.cid);
    wx.setStorageSync('cid', app.globalData.cid);
    if (!openId) {
      wx.login({
        success: function (res) {
          console.log(res.code);
          wx.request({
            url: app.globalData.host + "/wx/queryOpenId",
            data: {
              cid: wx.getStorageSync('cid'),
              code: res.code
            },
            success: function (res) {
              console.log(res.data);
              if (res.data) {
                console.log(res.data);
                wx.setStorageSync('openId', res.data);
              }
            }
          })
        }
      })
    };


    wx.request({
      url: app.globalData.host + '/shop/index', //仅为示例，并非真实的接口地址
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
          banner: res.data.retValue.banner,
          newlist: res.data.retValue.newlist
        });
      }
    })
  },
  onShow : function(options){
    var that = this;
    var data;
    var openId = wx.getStorageSync('openId');
    console.log(app.globalData.cid);
    wx.setStorageSync('cid', app.globalData.cid);
    if (!openId){
      wx.login({
        success: function (res) {
          console.log(res.code);
          wx.request({
            url: app.globalData.host + "/wx/queryOpenId",
            data : {
              cid: wx.getStorageSync('cid'),
              code : res.code
            },
            success: function (res) {
              console.log(res.data);
              if (res.data){
                console.log(res.data);
                wx.setStorageSync('openId', res.data);
              }
            }
          })  
        }
      })
    };


    wx.request({
      url: app.globalData.host + '/shop/index', //仅为示例，并非真实的接口地址
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