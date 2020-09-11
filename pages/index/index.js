const app = getApp();

import { getIndexData, getCoupons, getTemlIds, getLiveList, getArticleList} from '../../api/api.js';
import { CACHE_SUBSCRIBE_MESSAGE } from '../../config.js';
import Util from '../../utils/util.js';
import wxh from '../../utils/wxh.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      {
        avatar: 'https://thirdwx.qlogo.cn/mmhead/gELOOosNsHXVRysCzpY4ezhstic4nvFyYR5VmXgibBXOU/132',
        nickname: '杜力玮'
      },
      {
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/NYfjRelia7DOWgU7lhNAjqyrsibkvrDegCw4iaVpJaWXiaFYtckiaWU140AUrXMGZUpGHrYkoqfdiaE42cLHzSbWdI4g/132',
        nickname: '小倩'
      },
      {
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKpH0SbfEicR8diaQjW11Sahicysj62kYrs529tIBuZ9Pjib2qhpAzJZqnpLxaO2ncYVCq4ZWicC5reaBw/132',
        nickname: '闫东'
      },
      {
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqOatxYpMBYMd27oJCQVKuuQkfltV6Y67q2RyrBMNzhicGKoJjUR8rTScZX0dYKPsOxDCCaztyVNPA/132',
        nickname: '徐坤'
      },
      {
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epibHqWEX3sxJCMXibiarRqXRtnX1s3micdEO8gHqPhEd4j6liaz4GS1PQnRMicptkD3ZePcVIHW7eG03EA/132',
        nickname: '涂洋'
      },
      {
        avatar: 'https://thirdwx.qlogo.cn/mmhead/l9Z9MJZIaMm2gRME6Ye7nRltRxTGDMRbG9cmDLYmAKc/132',
        nickname: '蔡宥木'
      },
      {
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIxOBzeNetkzuW1BqS87ZCmUQqZoAqR2icSZJFn7Sa8BLS2q8cP21ZlzMF5of9ZTg3XOXCRWsGJRJQ/132',
        nickname: '辛福'
      },
      {
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKCRgkdTtUQckpp1Nia3g2ksMd2icXeS61qgPSiaGU5tbdGBMAZufvzgdeTspibbtZhicGRw3sGUZSq02A/132',
        nickname: '杨娟'
      }
    ],
    imgUrls: [],
    itemNew:[],
    activityList:[],
    menus: [],
    bastBanner: [],
    bastInfo: '',
    bastList: [],
    fastInfo: '',
    fastList: [],
    firstInfo: '',
    firstList: [],
    salesInfo: '',
    likeInfo: [],
    lovelyBanner: {},
    benefit:[],
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    parameter:{
      'navbar':'0',
      'return':'0'
    },
    window: false,
    iShidden:false,
    navH: "",
    newGoodsBananr:'',
    selfLongitude: '',
    selfLatitude: '',
    liveList: [],
    liveInfo:{},
    logoUrl: 'http://oss.asheep.cn/590c8202008262054433617.png',
    articleList3: [], //农技知识
    articleList4: [],  //农产品收购
    articleList5: [] //新闻资讯
  },
  closeTip:function(){
    wx.setStorageSync('msg_key',true);
    this.setData({
      iShidden:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wxh.selfLocation(1);
    this.setData({
      navH: app.globalData.navHeight
    });
    if (options.spid) app.globalData.spid = options.spid;
    if (options.scene) app.globalData.code = decodeURIComponent(options.scene);
    if (wx.getStorageSync('msg_key')) this.setData({ iShidden:true});
    this.getTemlIds();
    this.getLiveList();
    setTimeout(function(){that.getCidArticle()}, 3000)
  },
  getLiveList:function(){
    getLiveList(1,20).then(res=>{
      if(res.data.length == 1){
        this.setData({liveInfo:res.data[0]});
      }else{
        this.setData({liveList:res.data});
      }
    }).catch(res=>{

    })
  },
  /**
   * 商品详情跳转
   */
  goDetail: function (e) {
    let item = e.currentTarget.dataset.items
    if (item.activity && item.activity.type === "1") {
      wx.navigateTo({
        url: `/pages/activity/goods_seckill_details/index?id=${item.activity.id}&time=${item.activity.time}&status=1`
      });
    } else if (item.activity && item.activity.type === "2") {
      wx.navigateTo({ url: `/pages/activity/goods_bargain_details/index?id=${item.activity.id}` });
    } else if (item.activity && item.activity.type === "3") {
      wx.navigateTo({
        url: `/pages/activity/goods_combination_details/index?id=${item.activity.id}`
      });
    } else {
      wx.navigateTo({ url: `/pages/goods_details/index?id=${item.id}` });
    }
  },
  getTemlIds(){
    let messageTmplIds = wx.getStorageSync(CACHE_SUBSCRIBE_MESSAGE);
    if (!messageTmplIds){
      getTemlIds().then(res=>{
        if (res.data) 
          wx.setStorageSync(CACHE_SUBSCRIBE_MESSAGE, JSON.stringify(res.data));
      })
    }
  },
  catchTouchMove: function (res) {
    return false
  },
  onColse:function(){
    this.setData({ window: false});
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
    this.getIndexConfig();
    if(app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
  },
  get_issue_coupon_list:function(){
    var that = this;
    getCoupons({page:1,limit:3}).then(res=>{
      that.setData({ couponList: res.data });
      if (!res.data.length) that.setData({ window: false });
    });
  },
  getIndexConfig:function(){
    var that = this;
    getIndexData().then(res=>{
      that.setData({
        imgUrls: res.data.banner,
        menus: res.data.menus,
        itemNew: res.data.roll,
        activityList: res.data.activity,
        bastBanner: res.data.info.bastBanner,
        bastInfo: res.data.info.bastInfo,
        bastList: res.data.info.bastList,
        fastInfo: res.data.info.fastInfo,
        fastList: res.data.info.fastList,
        firstInfo: res.data.info.firstInfo,
        firstList: res.data.info.firstList,
        salesInfo: res.data.info.salesInfo,
        likeInfo: res.data.likeInfo,
        lovelyBanner: res.data.lovely.length ? res.data.lovely[0] : {},
        benefit: res.data.benefit,
        logoUrl: res.data.logoUrl,
        couponList: res.data.couponList,
        newGoodsBananr: res.data.newGoodsBananr
      });
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            that.setData({ window: that.data.couponList.length ? true : false });
          } else {
            that.setData({ window: false, iShidden: true});
          }
        }
      });
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ window:false});
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
    this.getIndexConfig();
    if (app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
    wx.stopPullDownRefresh();
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
  getCidArticle: function () {
    var that = this;
    
    getArticleList(3, { page: 1, limit: 5}).then(res=>{
      that.setData({ 
        articleList3: res.data
      });
    });
    getArticleList(4, { page: 1, limit: 5}).then(res=>{
      that.setData({ 
        articleList4: res.data
      });
    });
    getArticleList(5, { page: 1, limit: 5}).then(res=>{
      that.setData({ 
        articleList5: res.data
      });
    });
  },
})