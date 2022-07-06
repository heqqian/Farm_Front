// pages/farm/farm.js
import farmApi from "../../api/farm"
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const key = 'E57BZ-OOY3W-ZLZR3-OWD7S-CYKEK-BRB6E'
const chooseLocation = requirePlugin('chooseLocation');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    markers: [
      {id: 1, title: '秋名山农场', latitude: 27.708482, longitude: 113.145435, iconPath: '../../images/map/farm.png', width: '55rpx', height: '69rpx'},
      {id: 2, title: '七里香农场', latitude: 27.700149, longitude: 113.144166, iconPath: '../../images/map/farm.png', width: '55rpx', height: '69rpx'},
      {id: 3, title: '蒲公英农场', latitude: 27.699291, longitude: 113.14368, iconPath: '../../images/map/farm.png', width: '55rpx', height: '69rpx'},
      {id: 4, title: '半岛农场', latitude: 27.699296, longitude: 113.144156, iconPath: '../../images/map/farm.png', width: '55rpx', height: '69rpx'},
      {id: 5, title: '彩虹农场', latitude: 27.708482, longitude: 113.145435, iconPath: '../../images/map/farm.png', width: '55rpx', height: '69rpx'},
      {id: 6, title: '西元前农场', latitude: 27.708482, longitude: 113.145435, iconPath: '../../images/map/farm.png', width: '55rpx', height: '69rpx'},
      {id: 7, title: '晴天农场', latitude: 27.708482, longitude: 113.145435, iconPath: '../../images/map/farm.png', width: '55rpx', height: '69rpx'},
      {id: 8, title: '断弦农场', latitude: 27.708482, longitude: 113.145435, iconPath: '../../images/map/farm.png', width: '55rpx', height: '69rpx'},
    ],

    farmList: [],
    dict: {
      'OPENING': '营业中',
      'CLOSED': '已关门'
    }
  },
  collapse: false,
  mapContext: null,
  mapSdk: null,
  // mapKey: key,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initMapSdk()
    this.loadCurrentLocation()
    this.initMapContext()
    this.fetchFarmList()
  },
  initMapSdk() {
    this.mapSdk = new QQMapWX({key})
  },

  //获取农场列表
  fetchFarmList() {
    farmApi.list().then(res=>{
      // const farmList = makeFarmList(res.data)
      this.setData({
        farmList: res.data
      })
    })
  },

  //导航功能（去这里）
  navigateLocation(e) {
    const latitude = e.currentTarget.dataset.latitude
    const longitude = e.currentTarget.dataset.longitude
    wx.openLocation({
      latitude,
      longitude
    })
  },

  collapse() {
    this.setData({
      collapse: !this.data.collapse
    })
  },

  initMapContext() {
    wx.createSelectorQuery().select('#store-map').context((res) => {
      this.mapContext = res.context
     }).exec()
  },

  loadCurrentLocation() {
    wx.getLocation({
      isHighAccuracy: true,
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          latitude,
          longitude
        })
      }
     })
  },

  goToCurrentLocation() {
    this.mapContext.moveToLocation()
  },

  //搜索农场
  goToFarmSearch() {
    // wx.navigateTo({
    //   url: '/pages/farm_s/farm_s',
    // })
    // const key = this.data.mapKey
    console.log(key)
    const referer = 'mall4m-master'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: this.data.latitude,
      longitude: this.data.longitude
    });
       
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
    });    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
  onShow() {
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    if (location) {
      const { latitude, longitude } = location
      this.setData({
        latitude,
        longitude
      })
      this.fetchFarmList();
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})