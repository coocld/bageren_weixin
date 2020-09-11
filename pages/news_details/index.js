import { getArticleDetails } from '../../api/api.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '新闻详情',
      'color': false
    },
    id:0,
    articleInfo:[],
    store_info:{},
    imgList: [],
    view: 0,
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.hasOwnProperty('id')){
      this.setData({ 
        id: options.id
      });
      
    }else{
      wx.navigateBack({delta: 1 });
    }
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
    this.getArticleOne();
  },
  getArticleOne:function(){
    var that = this;
    getArticleDetails(that.data.id).then(res=>{
      that.setData({ 
        'parameter.title': res.data.title, articleInfo: res.data, store_info: res.data.store_info ? res.data.store_info : {},
        content: res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '),
        view: res.data.visit,
        imgList: res.data.image_input
      });
      
    });
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
    return {
      title: this.data.parameter.title,
      path: '/pages/news_details/index?id=' + this.data.id,
      imageUrl: this.data.articleInfo.image_input.length ? this.data.articleInfo.image_input[0] : '',
    }
  },
   //预览图片
   topic_preview: function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var url = e.currentTarget.dataset.url;
    var previewImgArr = [];
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = that.data.topic_recomData;
    for (var i in data) {
      if (id == data[i].id) {
        previewImgArr = data[i].pic;
      }
    }
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: that.data.imgList // 需要预览的图片http链接列表
    })
  }
})