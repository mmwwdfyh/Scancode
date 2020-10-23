// pages/settlement/settlement.js
import { OrderModel } from "../../model/order"
const md5 = require("../../utils/md5")
const ordermo = new OrderModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setlist: [],
    totalPrice: 0,
    totalNum: 0,
    len: 1,
    lengths: 0
  },
  // 商品展示
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
  // 点击swithch
  HeaderSwitch(e){
      console.log(e)
  },
  // 确认支付
  yespay() {
    const userinfo = wx.getStorageSync('userCode')
    const cartdata = wx.getStorageSync('data')

    const sign = this._sign({
      openid: userinfo.openid,
      uid: userinfo._id,
      salt: userinfo.salt
    })

    ordermo.doOrder({
      openid: userinfo.openid,
      uid: userinfo._id,
      total_price: this.data.totalPrice,
      total_num: this.data.totalNum,
      derate_price: 0,
      real_price: this.data.totalPrice,
      order: JSON.stringify(cartdata),
      sign: sign
    }).then(res => {
      console.log(res)
      this.wxPay(res.data.result);
    })
  },
  //拉起支付方法
  wxPay(data) {
    let pay_data = JSON.parse(data);
    console.log(pay_data)
    wx.requestPayment({
      timeStamp: pay_data.timeStamp,
      nonceStr: pay_data.nonceStr,
      package: pay_data.package,
      signType: 'MD5',
      paySign: pay_data.paySign,
      success(res) {
        wx.removeStorageSync("data");
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  //签名加密方法
  _sign(json) {
    var arr = [];

    for (var i in json) {
      arr.push(i);
    }
    arr = arr.sort();

    var str = "";

    for (let i = 0; i < arr.length; i++) {
      str += arr[i] + json[arr[i]]
    }
    return md5(str);
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
    let totalNum = 0
    setlist.forEach(v => {
      totalPrice += v.num * v.price;
      totalNum += v.num
      // 把购物车数据重新设置回data中和缓存中
      this.setData({
        setlist,
        totalPrice: totalPrice.toFixed(2),
        totalNum
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