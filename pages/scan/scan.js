// pages/scan/scan.js
import { home } from '../../model/home'
const homedata = new home()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  herdcode() {
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        // console.log(res)
        homedata.getsao(res.result).then(res => {
          console.log(res)
          // 获取本地缓存的数据
          let cart = wx.getStorageSync("data") || [];
          // console.log(cart)
          // 判断对象是否在购物车数据中
          let index = cart.findIndex(v => v._id === res.data.result[0]._id)
          console.log(index)
          if (index === -1) {
            // 不存在第一次添加
            res.data.result[0].num = 1
            res.data.result[0].checked = true
            cart.push(res.data.result[0])
          } else {
            // 已经存在执行++
            cart[index].num++
          }
          // 把购物车重新添加到缓存中
          wx.setStorageSync('data', cart)
          // 弹框提示
          wx.showToast({
            title: '加入成功',
            icon: 'success',
            // true 防止用户 手抖 疯狂点击按钮
            mask: true,
          })

          wx.navigateTo({
            url: '/pages/goods/goods',
          })
        })
      }
    })
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