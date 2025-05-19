<template>
  <div>
    <div class="containerBg">
<!--      <div class="userHeader" @click="goChangeUser">-->
<!--        <img :src="avatarUrl" alt />-->
<!--      </div>-->
      <img style="width: 100%" src="../../../static/img/min-bg.jpg" />
      <div class="userName">
        <p>{{user.nickName || '-'}}</p>
        <span>账号：{{user.phonenumber}}</span>
      </div>
    </div>
    <van-cell-group>
      <van-cell title="退出登录" @click="logout">
        <view slot="icon">
          <van-icon size="20px" name="close" />
        </view>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import Dialog from '@/static/vant-weapp-new/dist/dialog/dialog'
import store from '@/store'

export default {
  components: {},
  data() {
    return {
      status: 'loading',
      user: {},
      coupon: [],
      vipInfo:{},
      needRead: false,
      userType:store.state.userInfo['user-type'],
    }
  },
  computed: {
    avatarUrl() {
      try {
        return  this.user.userInfo.avatar || '../../static/img/defaultAvatar.png'
      } catch {
        return '../../static/img/defaultAvatar.png'
      }
    },
  },
  mounted() {
    let that = this
    uni.getStorage({
      key:'userInfo',
      success(res) {
        if(res.data){
          that.user = JSON.parse(res.data)
        }else {
          // that.$route.push('/pages/common/authorization')
        }
      },
      fail(e){
        // that.$route.push('/pages/common/authorization')
      }
    })
    this.init()
  },
  methods: {
    async login() {},
    async init() {
      try {
        this.getVipInfo()
        this.getVipRecord()
      } catch (e) {
        this.status = 'error'
        throw e
      }
      this.status = 'success'
    },
    getVipInfo(){
      //
      this.$http
          .get(`book/user/vipInfo`, {})
          .then((res) => {
            this.vipInfo = res.data
          })
    },
    getVipRecord(){
      this.$http
          .get(`book/user/borrowRecord`, {})
          .then((res) => {
            debugger
          })
    },
    goAuthority() {
      this.$route.push('/pages/common/authority')
    },
    logout() {
      Dialog.confirm({
        title: '提示',
        message: '是否确定退出？',
      }).then(() => {
          uni.setStorage({
            key: 'userInfo',
            data: '',
            success: function () {
            }
          });
          store.commit('setUserInfo', '')
          setTimeout(() => {
            uni.reLaunch({
              url: '/pages/common/authorization'
            })
          }, 0)
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>
<style lang=scss scoped>
  $border-right: 1px solid #dfdfdf;
  $border-bottom: 1px solid #ececec;
  van-cell-group {
    width: 95%;
    display: block;
    margin: 0 auto;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }
  .warp {
    width: 95%;
    margin: 0 auto;
  }
  van-icon {
    position: relative;
    top: 2px;
    margin-right: 10px;
  }
  ::v-deep .header {
    background: #4a94f3;
    color: #ffffff;
  }
  .containerBg {
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    width: 100%;
    line-height: 60px;
    display: inline-block;
    position: relative;
    text-align: center;
    .userName {
      color: #323232;
      line-height: 30px;
      display: inline-block;
      text-align: left;
      font-size: 15px;
      background: #ffffff;
      width: 90%;
      margin: 0 auto;
      padding: 10px;
      border-radius: 8px;
      text-align: left;
      p {
        font-size: 18px;
        font-weight: 700;
        padding-left: 10px;
      }
      span {
        font-size: 13px;
        padding-left: 10px;
      }
    }
  }
  .flex {
    display: -webkit-flex;
    display: flex;
  }
</style>
