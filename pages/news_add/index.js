import {addArticle} from '../../api/api.js';


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '发布',
      'color': false
    },
    typeList: ['求购', '供应'],
    bannerUrl: '',
    cid: '1',
    content: ''
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
  bindPickerChange: function(e) {
    this.setData({
      cid: e.detail.value
    })
  },
  bindTextAreaBlur: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
   /**
   * 添加图片
   */
  addImg: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      itemColor: '#00923f',
      success: function (res) {
        var choseType = res.tapIndex == 0 ? "album" : res.tapIndex == 1 ? "camera" : "";
        if (choseType != "") {
          wx.chooseImage({
            sizeType: ['original'],//原图
            sourceType: [choseType],
            count: 6,//每次添加一张
            success: function (res) {
              console.log(res.tempFilePaths)
              // wx.showLoading({
              //   title: '图片上传中',
              // })
              // wx.uploadFile({
              //   url: 'http://127.0.0.1/admin/widget.images/upload', // 仅为示例，非真实的接口地址
              //   filePath: res.tempFilePaths[0],
              //   name: 'file',
              //   success: function(updata) {
              //     console.log(updata.data)
              //     // that.setData({
              //     //   bannerUrl:JSON.parse(updata.data).src
              //     // })
              //     wx.hideLoading()
              //   }
              // })
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  addNew(){
    var that = this;
    var newDataObj = {
      cid: that.data.cid,
      author: '大作者',
      image_input: '',
      content: that.data.content,
    }
    console.log(newDataObj)
    // addArticle(newDataObj).then(res=>{
    //   console.log(res);
    // });
  }
})