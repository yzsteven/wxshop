// page/component/list/list.js
const app = getApp();
Page({
  data:{},
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self = this;
    wx.request({
      url: app.globalData.host + '/shop/list', //仅为示例，并非真实的接口地址
      data: {
        cid: wx.getStorageSync('cid'),
        type: options.type
      },
      success: function (res) {
        self.setData({
          list: res.data.retValue.list
        });
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})