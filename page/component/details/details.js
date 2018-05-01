// page/component/details/details.js
Page({
  data: {
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    interval: 3000,
    duration: 800
  },
  onLoad: function (options) {
    var self = this;
    wx.request({
      url: 'https://www.lanrensc.cn/ysg-system/shop/details?id=' + options.id,
      success(res) {
        self.setData({
          goods: res.data.retValue.good,
        })
      }
    });
    console.log(options)
  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num: num
    })
  },

  minusCount() {
    let num = this.data.num;
    console.log(num);
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    this.setData({
      num: num
    });
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;
    self.setData({
      show: true
    })
    setTimeout(function () {
      self.setData({
        show: false,
        scaleCart: true
      })
      setTimeout(function () {
        self.setData({
          scaleCart: false,
          hasCarts: true,
          totalNum: num + total
        })
      }, 200)
    }, 300)
    
    wx.request({
      url: 'https://www.lanrensc.cn/ysg-system/shop/addShoppingCart',
      data: {
        gid: self.data.goods.id,
        cid: 1,
        spec: self.data.goods.price[0].spec,
        price: self.data.goods.price[0].price,
        createBy:'api',
        updateBy:'api',
        num: self.data.num
      },
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
        self.setData({
          num: 1
        })
      }
    });
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }

})