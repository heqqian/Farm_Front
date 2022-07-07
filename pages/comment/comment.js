var http = require('../../utils/http.js');

// pages/evaluate/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_score: 0,
    score:0,//评分
    score_text_arr: ['非常差', '差', '一般', '好', '非常好'],//等级
    score_text: "",
    score_img_arr: [],
    upload_pic: [],
    is_upload: false,
    delete_ico: "/images/icon/delete.png",
    camera_pic: "/images/icon/camera.png",
    time:null,
    upload_img:[],
    text:"",
    orderNum:0,
    prodId:0,
    orderItemDtos: [],
  },

  /**
   * 加载订单数据
   */
  loadOrderDetail: function(orderNum) {
    var that = this;
    wx.showLoading();
    //加载订单详情
    var params = {
      url: "/p/myOrder/orderDetail",
      method: "GET",
      data: {
        orderNumber: orderNum
      },
      callBack: function(res) {
        that.setData({
          orderId:  res.orderId,
          actualTotal: res.actualTotal,
          userAddrDto: res.userAddrDto,
          remarks: res.remarks,
          orderItemDtos: res.orderItemDtos,
          createTime: res.createTime,
          status: res.status,
          productTotalAmount: res.orderItemDtos[0].productTotalAmount,
          transfee: res.transfee,
          reduceAmount: res.reduceAmount,
          actualTotal: res.actualTotal,
          shopId: res.shopId,
          productId:res.orderItemDtos[0].prodId,
        });
        wx.hideLoading();
      }
    };
    http.request(params);
  },

  /**
   * 加入购物车
   */
  addToCart: function(event) {
    let index = event.currentTarget.dataset.index
    var that = this;
    wx.showLoading({
      mask: true
    });
    var params = {
      url: "/p/shopCart/changeItem",
      method: "POST",
      data: {
        basketId: 0,
        count: this.data.orderItemDtos[index].prodCount,
        prodId: this.data.orderItemDtos[index].prodId,
        shopId: this.data.shopId,
        skuId: this.data.orderItemDtos[index].skuId
      },
      callBack: function(res) {
        //console.log(res);
        wx.hideLoading();
        wx.showToast({
          title: "加入购物车成功",
          icon: "none"
        })
        wx.switchTab({
          url: '/pages/basket/basket',
        })
      }
    };
    http.request(params);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._default_score(this.data.default_score);//设置默认星级为0
    this.setData({
      orderNum:options.orderNum,
    });
    this.loadOrderDetail(options.orderNum);
  },

//初始化星的数量
  _default_score: function (tauch_score = 0) {
    var score_img = [];
    var score = 0;
    for (let i = 0; i < 5; i++) {
      if (i < tauch_score) {
        score_img[i] = "/images/icon/star_on.png"
        score = i;
      } else {
        score_img[i] = "/images/icon/star_off.png"
      }
    }
    this.setData({
      score_img_arr: score_img,
      score_text: this.data.score_text_arr[score]
    });
  },

  //点击星级
  onScore: function (e) {
    var score = e.currentTarget.dataset.score;
    this._default_score(score);
    this.setData({
      score:score
    });
  },

  //选择图片，最多四张
  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var addImg = res.tempFilePaths;
        var upload_pic = that.data.upload_pic;
        for(var i in addImg){
          //判断已选图片数量
          if (upload_pic.length<4){
              upload_pic.push(addImg[i]);
          }
        } 
        var is_upload = false;
        if (upload_pic.length >= 4) {
          is_upload = true;
        }
        that.setData({
          upload_pic: upload_pic,
          is_upload: is_upload
        })
      }
    })

  },

  //上传评论
  onSubmit:function(e){
    wx.showLoading({
      title: '上传中',
    })
    var that = this;
    var prodid=e.currentTarget.dataset.prodid;
    this.setData({
      text: e.detail.value.text
    })

    wx.request({
      url: 'http://1.12.249.224:8086' + '/prodComm/addProdComm',
      method: "POST",
      //发送的数据
      data: {
        /**
         * text: that.data.text,
           urls: JSON.stringify(upload_img),
           score1: that.data.score
         */
        prodId:that.data.productId,
        orderItemId:that.data.orderId,
        score:that.data.score,
        content:that.data.text,
        //evaluate:that.data.score_text
      },
      //成功回调
      success: res => {
        wx.hideLoading();
        console.log(res);
        that.submit();
      }
    });
  },

/**
 * onSubmit: function (e) {
    wx.showLoading({
      title: '上传中',
    })
    var that = this;
    var is = false;
    var picture_list = that.data.upload_pic;
    var upload_img = [];
    var flag = false;
    var index=0;
  
    for (var i in picture_list) {
      this.upload_file_server(picture_list[i]).then(res=>{
        upload_img.push({id:index,url:res});
        index+=1;
        that.setData({
          upload_img: upload_img
        })
      }); 
    }
    this.setData({
      text: e.detail.value.text
    })
    //判断图片上传成功后，再上传评论到服务器，解决异步问题
    this.setTime(e);
    this.submit();
  },
 setTime:function(){
   var that= this;
   var time = setTimeout(function(){
     var upload_img = that.data.upload_img;
     var picture_list = that.data.upload_pic;

     var prodid=e.currentTarget.dataset.prodid;
     var orderNumber=e.currentTarget.dataset.orderNumber;

     //判断是否成功
     if (upload_img.length == picture_list.length){
       //清除定时
       clearTimeout(that.data.time);
       //添加评论
       wx.request({
         url: 'http://1.12.249.224:8086' + '/prodComm/addProdComm',
         method: "POST",
         //发送的数据
         data: {
           /**
            * text: that.data.text,
              urls: JSON.stringify(upload_img),
              score1: that.data.score
            
           prodId:prodid,
           orderItemId:orderNumber,
           score:that.data.score,
           content:that.data.text,
           evaluate:that.data.score_text
         },
         //成功回调
         success: res => {
           wx.hideLoading();
           console.log(res);
         }
       });
     }else{
       //执行定时判断
       that.setTime();
     }
   },400);
   that.setData({
     time:time
   })
 },
//上传图片
  upload_file_server: function (path) {
    return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: 'http://localhost:8080' + '/uploadFile',
      filePath: path,
      name: 'file',
      success: res => {
        var result = JSON.parse(res.data);
        resolve(result.msg);
      }
    });
    });
  },
//删除图片
  deletePic: function (e) {
    var pic_index = e.currentTarget.dataset.pic_index;
    var upload_pic = [];
    for (let i in this.data.upload_pic) {
      if (i != pic_index) {
        upload_pic.push(this.data.upload_pic[i])
      }
    }
    this.setData({
      upload_pic: upload_pic,
      is_upload: false
    })

  },
 */  


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  submit(){
    wx.navigateTo({
      url: '/pages/com-success/com-seccess',
    })
  },

    //跳转商品详情页
    toProdPage: function(e) {
      var prodid = e.currentTarget.dataset.prodid;
      wx.navigateTo({
        url: '/pages/prod/prod?prodid=' + prodid,
      })
    },

})

