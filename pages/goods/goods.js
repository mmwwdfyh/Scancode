// pages/ption/ption.js
import { home } from '../../model/home'
import { getScode } from '../../utils/axyncWx'

const homedata = new home()
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
    console.log(index)
    // 判断小于1是否删除
    if (ptionlist[index].num === 1 && operation === -1) {
      // 弹框提示
      wx.showModal({
        title: '提示',
        content: '是否要删除',
        success(res) {
          // console.log(res)
          if (res.confirm) {
            ptionlist.splice(index, 1)
            then.setCart(ptionlist)
          } else if (res.cancel) {
            console.log("用户点击取消")
          }
        }
      })
    } else {
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
      totalPrice += v.num * v.price;
      totalNum += v.num
      // 把购物车数据重新设置回data中和缓存中
      this.setData({
        ptionlist,
        totalPrice: totalPrice.toFixed(2),
        totalNum,
      })
      wx.setStorageSync('data', ptionlist)
    })
  },

  // 继续添加
  async headeryes() {
    let res = await getScode()
    console.log(res)
    // 允许从相机和相册扫码
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

    })

  },
  // 去结算
  headerset() {
    wx.navigateTo({
      url: '/pages/settlement/settlement',
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
    console.log(ptionlist)
    this.setCart(ptionlist)   //添加商品选中价格
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