// pages/ption/ption.js
// import {ption} from '../../model/ption'
// const ptiondata = new ption()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品信息
    ptionlist: [],
    totalPrice: 0,
    totalNum: 0
  },

  // 商品加减
  headershu(e) {
    // console.log(e)
    // 获取传递过来的值
    const { operation, id } = e.currentTarget.dataset
    // 获取购物车数据
    let { ptionlist } = this.data
    let then = this
    // 找到需要修改的商品的索引
    const index = ptionlist.findIndex(v => v._id === id)
    // 判断小于1是否删除
    if (ptionlist[index].num === 1 && operation === -1) {
      // 弹框提示
      wx.showModal({
        title: '提示',
        content: '是否要删除',
        success(res) {
          if (res.confirm) {
            ptionlist.splice(index, 1)
            then.setCart(ptionlist)
          } else if (res.cancel) {
            console.log("用户点击取消")
          }
        }
      })
    } else{
          // 进行修改数量
    ptionlist[index].num += operation
    }

    // 设置回缓存和data中
    this.setCart(ptionlist)
  },
  // 封装
  setCart(ptionlist) {
    // 商品价格数量
    let totalPrice = 0
    let totalNum = 0

    ptionlist.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.price;
        totalNum += v.num
      }
      // 把购物车数据重新设置回data中和缓存中
      this.setData({
        ptionlist,
        totalPrice,
        totalNum,
      })
      wx.setStorageSync('data', ptionlist)
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let ptionlist = wx.getStorageSync('data')
    // console.log(ptionlist)
    this.setData({
      ptionlist
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})