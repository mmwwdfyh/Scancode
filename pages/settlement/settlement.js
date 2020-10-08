// pages/settlement/settlement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setlist: [],
    totalPrice: 0,
    len: 1,
    lengths:0
  },
  toogle() {
    let setlist = wx.getStorageSync('data')
    if (this.data.len == 1) {
      this.setData({
        len: setlist.length,
        setlist
      })
    } else {
      setlist.length = 1
      this.setData({
        len: 1,
        setlist
      })
    }
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
    let setlist = wx.getStorageSync('data')
    let lengths = setlist.length
    this.setData({
      setlist,
      lengths
    })
    // 商品价格数量
    let totalPrice = 0

    setlist.forEach(v => {
      totalPrice += v.num * v.price;
      // 把购物车数据重新设置回data中和缓存中
      this.setData({
        setlist,
        totalPrice: totalPrice.toFixed(2),
      })
      wx.setStorageSync('data', setlist)
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