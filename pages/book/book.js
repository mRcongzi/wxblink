// pages/book/book.js
import {
  BookModel
}
from '../../models/book.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList().then(res => {
      this.setData({
        books: res
      })
    })
  },

  onSearch(event){
    this.setData({
      searching: true
    })
  },

  onCancel(event){
    this.setData({
      searching: false
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

  },

  onReachBottom(){
    // 课程使用随机数来更新more属性的状态
    // 我这里使用缓存上个状态然后取反的方法来触发more的更新
    const last_status = wx.getStorageSync("more_status") | false
    const new_stauts = !last_status
    this.setData({
      more: new_stauts
    })
    wx.setStorageSync('more_status', new_stauts)
  }

})