// page/component/details/details.js
var app = getApp();
var WxParse = require('../wxParse/wxParse.js');
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
  onLoad: function (options) {
    var self = this;
    var detail = this.data.goods.detail;
    var parameter = this.data.goods.parameter;
    var service = this.data.goods.service
    wx.request({
      url: 'https://www.lanrensc.cn/ysg-system/shop/details?id=' + options.id,
      success(res) {
        self.setData({
          goods: res.data.retValue.good,
        })
        self.setData({
          [detail]: WxParse.wxParse('detail', 'html', res.data.retValue.good.detail, self, 5) ,
          [parameter]: WxParse.wxParse('parameter', 'html', res.data.retValue.good.parameter, self, 5),
          [service]: WxParse.wxParse('service', 'html', res.data.retValue.good.service, self, 5),
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