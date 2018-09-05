// page/component/details/details.js
const app = getApp();
const WxParse = require('../wxParse/wxParse.js');
Page({
  data: {
    num: 1,
    goods: {
      id: 1,
      image: '/image/goods1.png',
      title: '新鲜梨花带雨',
      price: 0.01,
      stock: '有货',
      detail: '这里是梨花带雨详情。',
      parameter: '125g/个',
      service: '不支持退货'
    },
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    interval: 3000,
    duration: 800
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onLoad: function (options) {
    var self = this;
    var detail = this.data.goods.detail;
    var parameter = this.data.goods.parameter;
    var service = this.data.goods.service
    wx.request({
      url: app.globalData.host + '/shop/details?id=' + options.id,
      success(res) {
        self.setData({
          goods: res.data.retValue.good,
        })
          WxParse.wxParse('detail', 'html', res.data.retValue.good.detail, self, 5);
          WxParse.wxParse('parameter', 'html', res.data.retValue.good.parameter, self, 5);
          WxParse.wxParse('service', 'html', res.data.retValue.good.service, self, 5);
      }
    });
  },
  addCount() {
    let num = this.data.num;
    num++;
    console.log(num);
    this.setData({
      num: num
    })
  },

  minusCount() {
    let num = this.data.num;
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
      url: app.globalData.host + '/shop/addShoppingCart',
      data: {
        gid: self.data.goods.id,
        cid: wx.getStorageSync('cid'),
        spec: self.data.goods.price[0].spec,
        price: self.data.goods.price[0].price,
        createBy: wx.getStorageSync('openId'),
        updateBy: wx.getStorageSync('openId'),
        num: self.data.num
      },
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
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