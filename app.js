App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    userInfo : null,
    cid:"0002",
    host:"https://www.lanrensc.cn/ysg-system"
  }
})
