<script>
export default {
  onLaunch: function(e) {

  },
  onShow: function(e) {
    //  微信跳转接参
    //  e.referrerInfo.extraData?wx.setStorageSync('jumpPara', e.referrerInfo.extraData):''
  },
  onHide: function() {
    console.log('App Hide')
  },
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // eslint-disable-next-line
    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style></style>
