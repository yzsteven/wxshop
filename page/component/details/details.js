// page/component/details/details.js
Page({
  data: {
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

  minusCount(e) {
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
      url: 'https://www.lanrensc.cn/ysg-system/shop/addShoppingCart',
      data: {
        gid: this.data.goods.id,
        cid: 1,
        spec:this.data.goods.price.name,
        price: this.data.goods.price.price,
        createBy:'api',
        updateBy:'api',
        num:this.data.num
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        this.setData({
          num: 0
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