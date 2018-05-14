// page/component/new-pages/cart/cart.js
Page({
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:true,    // 全选状态，默认全选
    obj:{
        name:"hello"
    }
  },
  onShow() {
    var self = this;
    wx.request({
      url: 'https://www.lanrensc.cn/ysg-system/shop/queryShoppingCart', //仅为示例，并非真实的接口地址
      data: {
        cid: wx.getStorageSync('cid'),
        createBy: wx.getStorageSync('openId')
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var hasList = true;
        if (!res.data.retValue.glist.length){
          hasList = false;
        }
        self.setData({
          hasList: hasList,
          carts: res.data.retValue.glist,
          totalPrice : res.data.retValue.totalPrice
        });
      }
    })
    this.getTotalPrice();
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    wx.request({
      url: 'https://www.lanrensc.cn/ysg-system/shop/deleShoppingCart', //仅为示例，并非真实的接口地址
      data: {
        ids: e.currentTarget.dataset.id,
      },
      success: function (res) {
        if (res.data.retValue.result != "success"){
          wx.showModal({
            title: '提示',
            content: '删除失败',
            text: 'center',
          })
        }
      }
    })

    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    console.log(carts);
    carts.splice(index,1);
    this.setData({
      carts: carts
    });
    if(!carts.length){
      this.setData({
        hasList: false
      });
    }else{
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
      if(carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },

  /**
   * 去下单
   */
  goBalance(){
    let carts = this.data.carts;
    let total = 0;
    let array = new Array();
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price; 
        array.push(carts[i])
      }
    }
    console.log(array);
    wx.setStorage({
      key: "orders",
      data: array
    })
    wx.setStorage({
      key: "total",
      data: total
    })
    wx.navigateTo({
      url: "../orders/orders"
    });
  }

})