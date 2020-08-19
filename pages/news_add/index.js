import {addArticle} from '../../api/api.js';
import Util from '../../utils/util.js';
let imageListArr = []

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
    imageList: [],
    cid: '1',
    content: '',
    showAddBtn: true
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

    Util.uploadImageMore({count:6, url: 'upload/image', inputName: 'file'}, function(res){
      console.log(res)
      if(that.data.imageList.length>0){
        imageListArr = that.data.imageList
        imageListArr = imageListArr.concat(res)
      }else{
        imageListArr = res
      }
      console.log(imageListArr)
      if(imageListArr.length>=6){
        that.setData({
          showAddBtn: false
        })
      }else{
        that.setData({
          showAddBtn: true
        })
      }
      that.setData({
        imageList: imageListArr
      })
     
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
  },
  delImgItem(e){
    let index = e.target.dataset.index;
    let newImageArr = this.data.imageList;
        newImageArr = newImageArr.splice(index);
    this.setData({
      imageList: newImageArr
    })
  }
})