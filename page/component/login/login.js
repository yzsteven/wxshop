const app = getApp();
Page({

  data: {
    　　canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onLoad: function (options) {
    console.log(wx.canIUse('button.open-type.getUserInfo'));
    　　// 查看是否授权
    　　wx.getSetting({
      　　　　success: function (res) {
        　　　　　　console.log(res.authSetting['scope.userInfo'])
        　　　　　　if (res.authSetting['scope.userInfo']) {
                      console.log("已经授权");
          　　　　　　// 已经授权，可以直接调用 getUserInfo 获取头像昵称
                      wx.switchTab({
                        url: '/page/component/index',
                      })
        　　　　}
      　　}
    　　})
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo){
      console.log(e.detail.userInfo);
    　　getApp().globalData.userInfo = e.detail.userInfo;   //将授权信息传递给全局变量
        wx.switchTab({
          url: '/page/component/index',
        })
      }
  },

})