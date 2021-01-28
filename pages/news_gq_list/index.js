import { getArticleCategoryList, getArticleList, getArticleHotList, getArticleBannerList} from '../../api/api.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '供求信息',
      'color': false
    },
    imgUrls: [],
    articleList:[],
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    navList:[
      {id: 1, title: "求购信息"},
      {id: 2, title: "供应信息"}
    ],
    active: 1,
    page:1,
    limit:8,
    status:false,
    scrollLeft: 0,
    iShidden: true,
    isGoIndex:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.cat){
      this.setData({
        active: options.cat
      })
    }
    this.setData({ status: false, page: 1, articleList:[]});
    this.getArticleBanner();
  },
  getArticleHot: function () {
    var that = this;
    getArticleHotList().then(res=>{
      that.setData({ articleList: res.data });
    });
  },
  getArticleBanner: function () {
    var that = this;
    getArticleBannerList().then(res=>{
      that.setData({ imgUrls: res.data });
    });
  },
  getCidArticle: function () {
    var that = this;
    if (that.data.active == 0) return ;
    var limit = that.data.limit;
    var page = that.data.page;
    var articleList = that.data.articleList;
    
    if (that.data.status) return ;
    getArticleList(that.data.active, { page: page, limit: limit, userId: app.globalData.userInfo.uid}).then(res=>{
      var articleListNew = [];
      var newList = res.data;
      var len = newList.length;
      articleListNew = articleList.concat(newList);
      for(let i=0; i<articleListNew.length; i++){
        if(articleListNew[i].status == 0){
          if(articleListNew[i].user_id != app.globalData.userInfo.uid){
            articleListNew.splice(i, 1);
          }
        }
      }
      that.data.page++
      that.setData({ 
        articleList: articleListNew, 
        status: limit > len, 
        page: that.data.page,
      });
    });
  },
  getArticleCate:function(){
    var that = this;
    getArticleCategoryList().then(res=>{
      that.setData({ navList: res.data });
    });
  },
  tabSelect(e) {
    this.setData({
      active: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 50
    })
    if (this.data.active == 0) this.getArticleHot();
    else{
      this.setData({ articleList: [], page: 1, status: false});
      this.getCidArticle();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onLoadFun: function () {
    this.getCidArticle();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.globalData.isLog){
     // this.getArticleHot();
      this.setData({ status: false, page: 1, articleList:[]});
      // this.getArticleBanner();
      // this.getArticleCate();
      
      this.getCidArticle();
    }else{
      this.setData({ iShidden:false});
    }
    
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
    this.getCidArticle();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})