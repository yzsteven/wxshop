// page/component/orders/orders.js
const app = getApp();
Page({
  data:{
    address:{
      name: "",
      phone: "",
      detail: ""
    },
    hasAddress: false,
    total:0,
    orders:[
        
      ]
  },

  onReady() {
    this.getTotalPrice();
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        });
      }
    })

    wx.getStorage({
      key: 'orders',
      success(res) {
        self.setData({
          orders: res.data,
        });
      }
    })

    wx.getStorage({
      key: 'total',
      success(res) {
        self.setData({
          total: res.data,
        });
      }
    })

  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

    toPay() {
      var self = this;
      let orders = this.data.orders;
      var arr = new Array;
      for (let i = 0; i < orders.length; i++) {
      var array = orders[i].title.split(" ");
      var obj = { "gid": orders[i].gid, "spec": array[1], "price": orders[i].price, "num": orders[i].num};
      arr.push(obj);
      }

      if (self.data.address.name == '' || self.data.address.phone == '' || self.data.address.detail == ''){
        wx.showModal({
          title: '下单异常',
          content: '联系人信息必填！',
          showCancel: true
        })
        return;
      }
      wx.request({
        url: app.globalData.host +'/shop/createOrder', //仅为示例，并非真实的接口地址
        data: {
          orderGoods: arr,
          cid: wx.getStorageSync('cid'),
          totalprice: self.data.total,
          payprice: self.data.total,
          expressfee: "0",
          contactname: self.data.address.name,
          contactphone: self.data.address.phone,
          address: self.data.address.detail,
          createBy: wx.getStorageSync('openId'),
          orderstatus:"1"
        },
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res);
          if (res.data.retValue.result == "success"){
            self.payOrders(res.data.retValue.orderId);
            wx.switchTab({
              url: '/page/component/user/user'
            })
          }
        }
      })
    },

      /**
   * 发起支付请求
   */
  payOrders(orderId) {
    console.log(orderId);
    console.log(wx.getStorageSync('openId'));
      wx.request({
        url: app.globalData.host + '/wx/queryPayPackageInfo', //仅为示例，并非真实的接口地址
        data: {
          id: orderId,
          openId: wx.getStorageSync('openId')
        },
        success: function (res) {
          wx.requestPayment({
            timeStamp: res.data.retValue.timeStamp,
            nonceStr: res.data.retValue.nonceStr,
            package: res.data.retValue.package,
            signType: res.data.retValue.signType,
            paySign: res.data.retValue.paySign,
            success: function (res) {
             console.log("支付成功！")
            },
            fail: function (res) {
              
            },
            complete:function(res){
              wx.switchTab({
                url: '../../user/user',
              })
            }
          })
        }
      })
    }

})