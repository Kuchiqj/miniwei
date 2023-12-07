//index.js
//获取应用实例
// const app = getApp()
 
Page({
  data: {
    username: '',
    password: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    // wx.hideTabBar({})
  },
  onLoad: function () {
   
  },
 
 
  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
 
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
 
  // 登录处理
  getimage(){
    let that = this
    

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        that.setData({
          imgsrc:tempFilePaths[0]
        })
      }
    })
  },
  getuserinfo(){
    let that= this
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })}
   else{wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
       console.log(res);s
       that.setData({
         userinfo:res.userInfo,
         userinfo:res.nickname
        //  因为是对象所以用res.来选中特定对象
       })
      //  同步缓存，将key值为user info，value值为res.userinfo存在本地
       wx.setStorageSync('userinfo', res.userInfo)
      }
    })
  }} ,
})
