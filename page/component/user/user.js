// page/component/new-pages/user/user.js
const app = getApp();
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
  onPullDownRefresh: function () {
    var self = this;
    /**
     * 发起请求获取订单列表信息
     */
    wx.request({
      url: app.globalData.host + '/shop/queryOrderListByUID',
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
        });
        wx.stopPullDownRefresh()
      }
    })

  },
  onLoad(){
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
      /**
       * 发起请求获取订单列表信息
       */
      wx.request({
        url: app.globalData.host + '/shop/queryOrderListByUID',
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
  },
  onShow:function(){
    var self = this;
    /**
   * 获取本地缓存 地址信息
   */
    wx.getStorage({
      key: 'address',
      success: function (res) {
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
  payOrders(event) {
    var self = this;
    console.log(event.currentTarget.dataset.orderId);
    console.log(wx.getStorageSync('openId'));
    wx.request({
      url: app.globalData.host + '/wx/queryPayPackageInfo', //仅为示例，并非真实的接口地址
      data: {
        id: event.currentTarget.dataset.orderId,
        openId: wx.getStorageSync('openId')
      },
      success: function (res) {
        console.log(res.data.retValue);
        wx.requestPayment({
          timeStamp: res.data.retValue.timeStamp,
          nonceStr: res.data.retValue.nonceStr,
          package: res.data.retValue.package,
          signType: res.data.retValue.signType,
          paySign: res.data.retValue.paySign,
          success: function (res) {
            //修改订单状态
            let orders = self.data.orders;
            for (let i = 0; i < orders.length; i++){
              if (event.currentTarget.dataset.orderId == orders[i].number){
                orders[i].status == 2
                break;
              }
            }
            self.setData({
              orders: orders
            });
          },
          fail: function (res) {

          }
        })
      }
    })
  }

})