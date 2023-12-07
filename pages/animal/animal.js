// pages/animal/animal.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      access_token:'',
      imgsrc:"",
      rst:[],
      Rst:[],
      num:0,
      num1:0,
      maxscore:''
    },
    getAccessToken() {
      // 1.发送数据(网络)请求
      // 2.拼接url地址 服务器地址?属性名 = 属性值&属性名=属性值
      // url:服务器地址(接口) method:发送请求的方式(post get put head delete) header:请求(没有请求要求头,直接使用默认)success:成功回调函数(res)
      wx.request({
        url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=MNgyDDsAd1V19T8GF46NP5lW&client_secret=yfDRPlFbQ9tKjcDQz56DfVYqXUHsLACA',
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
  
          wx.setStorageSync('access_token', res.data.access_token)
          this.data.access_token = res.data.access_token
        }
      })
    },
    getAnimal() {
      let that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success:(res)=> {
          // 本地临时图片数据
          console.log(res.tempFilePaths[0]);
          // 1.再次调用下一个函数，转码
          // 2.res.tempFilePaths[0] 存在data里面某一个变量imgpath
          // 转换格式编码
          //百度ai:base64图片
          // 转换为base64的图片
          const fs = wx.getFileSystemManager()
          fs.readFile({
            // 本地路径             
            filePath:res.tempFilePaths[0] ,
            encoding: 'base64',
            position: 0,
            success(res) {
              console.log(res.data)
              that.setData({
                imgsrc:res.data
              })
            },
            fail(res) {
              console.error(res)
            }
          })
        }
      })
    },
    identifyPic(){
      let that = this
      if (that.data.num>0){
          that.data.num = 0
        }
      wx.request({
        
        // ``模板字符串 可以存放变量
        url: `https://aip.baidubce.com/rest/2.0/image-classify/v1/animal?access_token=${wx.getStorageSync('access_token')}`
        , 
        method:"POST",
        data: {
          image:this.data.imgsrc
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded' // 默认值
        },
        
        success (res) {
          console.log(that.data.num);
          console.log(res.data.result);
          let c= res.data.result;
          that.setData({
            num:that.data.num+1,
            rst:c
          })
        }
      }),
      wx.showToast({
        title: '处理中',
        icon:'loading',
        duration:2000
      })
    },
    showResult(){
      
      if (this.data.num1>0){
        this.data.num1 = 0
      }
        this.setData({
          num1:this.data.num1+1,
          Rst:this.data.rst
        })
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
  
    }
  })
  
  