// page/component/new-pages/user/user.js
Page({
  data:{
    "thumb": "",
    "nickname": "",
    "orders": [
      {
        "number": "123",
        "gInfo": [
          {
            "thumb": "",
            "name": "苹果",
            "count": "1"
          }, {
            "thumb": "",
            "name": "苹果",
            "count": "1"
          }
        ],
        "status": "已支付",
        "money": "10"
      }
    ],
    "hasAddress": false,
    "address": {
      "name": "",
      "phone": "",
      "detail": ""
    }
  },
  onLoad: function (options){
    var self = this;

    /**
         * 获取用户信息
         */
    wx.getUserInfo({
      success: function (res) {
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    })
  },
  onShow(){
    var self = this;
      /**
       * 发起请求获取订单列表信息
       */
      wx.request({
        url: 'https://www.lanrensc.cn/ysg-system/shop/queryOrderListByUID',
        data: {
          "cid": wx.getStorageSync('cid'),
          "createBy": wx.getStorageSync('openId'),
          "pageHelper": {
            "pageNumber": "",
            "pageSize": "",
            "searchParam": ""
          }
        },
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          self.setData({
            orders: res.data.retValue.orders
          })
        }
      })


    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  }
})