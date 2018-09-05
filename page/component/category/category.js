const app = getApp();
Page({
    data: {
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    onReady(){
        var self = this;
        wx.request({
          url: app.globalData.host + '/shop/category?cid=' + wx.getStorageSync('cid'),
            success(res){
              console.log(res.data);
                self.setData({
                  detail: res.data.retValue.detail,
                  category: res.data.retValue.category
                })
            }
        });
        
    },
    switchTab(e){
      const self = this;
      this.setData({
        isScroll: true
      })
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      },0)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1)
        
    }
    
})