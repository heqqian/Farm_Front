//index.js
//获取应用实例
var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    indicatorColor: '#d1e5fb',
    indicatorActiveColor: '#1b7dec',
    autoplay: true,
    interval: 2000,
    duration: 1000,
    indexImgs: [],
    seq: 0,
    news: [],
    taglist: [],
    sts: 0,

    //按钮位置参数
    buttonTop: 0,
    buttonLeft: 0,
    windowHeight: '',
    windowWidth: '',
    //角标显示数字
    corner_data:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.getAllData();

    var that =this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          windowHeight:  res.windowHeight,
          windowWidth:  res.windowWidth,
          buttonTop:res.windowHeight*0.10,//这里定义按钮的初始位置
          buttonLeft:res.windowWidth*0.80,//这里定义按钮的初始位置
        })
      }
    })
  },

  // 页面滚动到指定位置指定元素固定在顶部
  onPageScroll: function(e) { //监听页面滚动
    this.setData({
      scrollTop: e.scrollTop
    })
  },

  toProdPage: function(e) {
    var prodid = e.currentTarget.dataset.prodid;
    if (prodid) {
      wx.navigateTo({
        url: '/pages/prod/prod?prodid=' + prodid,
      })
    }
  },

  toCouponCenter: function() {
    wx.showToast({
      icon:"none",
      title: '该功能仍在开发中，敬请期待'
    })
  },

  // 跳转搜索页
  toSearchPage: function() {
    wx.navigateTo({
      url: '/pages/search-page/search-page',
    })
  },

  //跳转农庄页面
  toFarmPage: function(e) {
    var url = '/pages/farm_index/farm_index';
    wx.navigateTo({
      url: url
    })
  },

  //跳转限时特惠页面
  toLimitedTimeOffer: function(e) {
    wx.showToast({
      icon:"none",
      title: '该功能仍在开发中，敬请期待~'
    })
  },

  //跳转酒店页面
  toHotelPage:function(){
    wx.navigateTo({
      url: '/pages/hotel_index/hotel_index',
    })
  },

  toClassifyPage:function(){
    wx.navigateTo({
      url: '/pages/category/category',
    })
  },

  //跳转公告列表页面
  onNewsPage: function() {
    wx.navigateTo({
      url: '/pages/recent-news/recent-news',
    })
  },

  onShow: function() {
  },
  getAllData() {
    http.getCartCount(); //重新计算购物车总数量
    this.getIndexImgs();
    this.getNoticeList();
    this.getTag();
  },
  //加载轮播图
  getIndexImgs() {
    //加载轮播图
    var params = {
      url: "/indexImgs",
      method: "GET",
      data: {},
      callBack: (res) => {
        this.setData({
          indexImgs: res,
          seq: res
        });
      }
    };
    http.request(params);
  },
  getNoticeList() {
    // 加载公告
    var params = {
      url: "/shop/notice/topNoticeList",
      method: "GET",
      data: {},
      callBack: (res) => {
        this.setData({
          news: res,
        });
      }
    };
    http.request(params);
  },


  // 加载商品标题分组列表
  getTag() {
    var params = {
      url: "/prod/tag/prodTagList",
      method: "GET",
      data: {},
      callBack: (res) => {
        this.setData({
          taglist: res,
        });
        for (var i = 0; i < res.length; i++) {
          this.getTagProd(res[i].id, i);
        }
      }
    };
    http.request(params);
  },

  getTagProd(id, index) {
    var param = {
      url: "/prod/prodListByTagId",
      method: "GET",
      data: {
        tagId: id,
        size: 6
      },
      callBack: (res) => {
        var taglist = this.data.taglist;
        taglist[index].prods = res.records

        this.setData({
          taglist: taglist,
        });
      }
    };
    http.request(param);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  //     wx.request({
  //       url: '',
  //       data: {},
  //       method: 'GET',
  //       success: function (res) { },
  //       fail: function (res) { },
  //       complete: function (res) {
  //         wx.stopPullDownRefresh();
  //       }
  //     })
  // },

  onPullDownRefresh: function() {

    // wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    var ths = this;
    setTimeout(function() {

      ths.getAllData();

      // wx.hideNavigationBarLoading() //完成停止加载

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 100);

  },

  /**
   * 跳转至商品详情
   */
  showProdInfo: function(e) {
    let relation = e.currentTarget.dataset.relation;
    if (relation) {
      wx.navigateTo({
        url: 'pages/prod/prod',
      })
    }
  },

  //可拖动悬浮按钮点击事件
  btn_Suspension_click:function(){
    wx.navigateTo({
      url: '/pages/live2d-view/live2d-view',
    })    
  }

  /**
   //以下是按钮拖动事件
  buttonStart: function (e) {
    startPoint = e.touches[0]//获取拖动开始点
    print(startPoint)
  },
  buttonMove: function (e) {
    var endPoint = e.touches[e.touches.length - 1]//获取拖动结束点
    //计算在X轴上拖动的距离和在Y轴上拖动的距离
    var translateX = endPoint.clientX - startPoint.clientX
    var translateY = endPoint.clientY - startPoint.clientY
    startPoint = endPoint//重置开始位置
    var buttonTop = this.data.buttonTop + translateY
    var buttonLeft = this.data.buttonLeft + translateX
    //判断是移动否超出屏幕
    if (buttonLeft+50 >= this.data.windowWidth){
      buttonLeft = this.data.windowWidth-50;
    }
    if (buttonLeft<=0){
      buttonLeft=0;
    }
    if (buttonTop<=0){
      buttonTop=0
    }
    if (buttonTop + 50 >= this.data.windowHeight){
      buttonTop = this.data.windowHeight-50;
    }
    this.setData({
      buttonTop: buttonTop,
      buttonLeft: buttonLeft
    })
  },
  buttonEnd: function (e) {
  } 
   */
})