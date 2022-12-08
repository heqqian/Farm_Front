// pages/farm/farm.js
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
    hotelList:[
      {id:1,name:'威廉古堡',latitude: 25.140072, longitude: 108.990552, detail: '华丽烛台 摇曳灯火 欧式复古风',  status: 'OPENING',distance:'1.2'},
      {id:2,name:'禾栖民宿',latitude: 20140072, longitude: 100.990552, detail: '独立超大落地窗 竹景大床房',  status: 'OPENING',distance:'2.8'},
      {id:3,name:'三十六季客栈',latitude: 25.140072, longitude: 90.990552, detail: '幽静天窗 禅意空间 温馨一居',status: 'OPENING',distance:'0.9'},
      {id:4,name:'丹丘里民宿',latitude: 20.140072, longitude: 89.990552, detail: '大浴缸 星空房 落地窗',status: 'OPENING',distance:'3.6'},
      {id:5,name:'夕霞小筑',latitude: 25.140072, longitude: 98.990552, detail: '现代风 高品质 简约灰白风',status: 'OPENING',distance:'2.4'},
      {id:6,name:'觅屿民宿',latitude: 29.140072, longitude: 120.990552, detail: '日式榻榻米 清新度假居所',status: 'OPENING',distance:'1.8'}
    ],
    changeTabs:0,
    showView: true,

//    farmList: [],
    dict: {
      'OPENING': '营业中',
      'CLOSED': '已关门'
    }
  },
  collapse: false,
  mapContext: null,
  mapSdk: null,
  // mapKey: key,

  change2: function(e) {
    var changeTabs = e.detail
    console.log(changeTabs)
    var that = this
    if (changeTabs == 0){
      that.setData({
        showView: true
      })
    }
    if (changeTabs == 1){
      that.setData({
        showView: false
      })
    }
  },

  toMine() {
    wx.navigateTo({
      url: '/pages/farm_rent/farm_rent',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    showView: (options.showView == "true" ? true : false)
    this.initMapSdk()
    this.loadCurrentLocation()
    this.initMapContext()
//    this.fetchFarmList()
    
  },
  initMapSdk() {
    this.mapSdk = new QQMapWX({key})
  },

  //获取农庄列表
  /*
  fetchFarmList() {
    farmApi.list().then(res=>{
      // const farmList = makeFarmList(res.data)
      this.setData({
        farmList: res.data
      })
    })
  },
  */
  

  //导航功能（去这里）
  navigateLocation(e) {
    const latitude = e.currentTarget.dataset.latitude
    const longitude = e.currentTarget.dataset.longitude
    wx.openLocation({
      latitude,
      longitude
    })
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/farm-detail/farm-detail',
    })
  },
  toHotelDetail() {
    wx.navigateTo({
      url: '/pages/hotel/hotel',
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

  //搜索农庄
  goToFarmSearch() {
    // wx.navigateTo({
    //   url: '/pages/farm_s/farm_s',
    // })
    // const key = this.data.mapKey
    // console.log(key)
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
//      this.fetchFarmList();
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