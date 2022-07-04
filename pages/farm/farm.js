// pages/farm/farm.js
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
    ]
  },

  mapContext: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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

     wx.createSelectorQuery().select('#store-map').context((res) => {
      this.mapContext = res.context
     }).exec()
  },

  goToCurrentLocation() {
    this.mapContext.moveToLocation()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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