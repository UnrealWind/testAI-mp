<template>
  <fa-container :status="status">
    <div>
      <div class="bind-card">
        <div >
          <img
            class="loginBg"
            mode="widthFix"
            src="https://cty.tygps.com/gpsapi/sys/common/static/temp/20240102/loginBg_1704156891881.jpg"
          />
          <div v-if="phoneLogin === 'code'">
            <div class="btn-box center">
              <!--这个按钮以后封组件-->
              <div>
                <van-button
                    color="#2d3d61"
                    class="btn-icon"
                    @getphonenumber="getPhoneNum"
                    open-type="getPhoneNumber"
                    v-if="checked && (sysUser || tmnlUser)"
                >
                  手机号快捷登录
                </van-button>
                <van-button
                    color="#2d3d61"
                    class="btn-icon"
                    v-else
                    @click="showTip"
                >
                  手机号快捷登录
                </van-button>
              </div>

              <div class="input-box">
                <p>
                  <van-checkbox style="display: inline-block;position:relative;z-index: 999" :value="checked" shape="round" icon-size="15px" checked-color="#2d3d61" @change="onChange($event,'checked')">
                    阅读并同意以下协议 <span @click.stop="goAgreement" style=" color: #4a94f3"> 《服务协议》</span>
                  </van-checkbox>
                </p>

<!--                <p>-->
<!--                  <van-checkbox style="display: inline-block;position:relative;z-index: 999" :value="tmnlUser" shape="round" icon-size="15px" checked-color="#2d3d61" @change="onChange($event,'tmnlUser')">-->
<!--                    终端用户-->
<!--                  </van-checkbox>-->
<!--                </p>-->
<!--                <p>-->
<!--                  <van-checkbox style="display: inline-block;position:relative;z-index: 999;" :value="sysUser" shape="round" icon-size="15px" checked-color="#2d3d61" @change="onChange($event,'sysUser')">-->
<!--                    系统用户-->
<!--                  </van-checkbox>-->
<!--                </p>-->
              </div>
            </div>
            <p style="position: fixed;right: 10px;bottom: 50px;height: 30px;width: 90%;padding: 0 15px;text-align: center;color: #4a94f3" @click="changeLoginType('password')">
<!--              <span style="float:left;color: #4e90fc" @click.stop="jumpClink">去往clink小程序</span> -->
              账号密码登录
              <span style="color: red;display: block;text-align: center;font-size: 10px;margin-top: 5px">系统用户请使用账号密码登录！</span>
            </p>
          </div>
          <div v-if="phoneLogin === 'password'">
            <div class="btn-box center">

              <van-cell-group style="margin-bottom: 20px">
                <van-field
                    placeholder-style="color:#666;font-size:15px;"
                    :value="phone"
                    placeholder="请输入账号"
                    @change="onChange($event,'phone')"
                />
                <van-field
                    placeholder-style="color:#666;font-size:15px;"
                    :value="password"
                    type="password"
                    placeholder="请输入密码"
                    @change="onChange($event,'password')"
                />
              </van-cell-group>

              <!--这个按钮以后封组件-->
              <div>
                <van-button
                    color="#2d3d61"
                    class="btn-icon"
                    @click="loginByPhone(password)"
                    v-if="checked && (sysUser || tmnlUser)"
                >
                  登录
                </van-button>
                <van-button
                    color="#2d3d61"
                    class="btn-icon"
                    v-else
                    @click="showTipOther"
                >
                  登录
                </van-button>
              </div>

              <div class="input-box">
                <p>
                  <van-checkbox style="display: inline-block;position:relative;z-index: 999" :value="checked" shape="round" icon-size="15px" checked-color="#2d3d61" @change="onChange($event,'checked')">
                    阅读并同意以下协议 <span @click.stop="goAgreement" style=" color: #4a94f3"> 《服务协议》</span>
                  </van-checkbox>
                </p>

              </div>
            </div>
            <p style="position: fixed;right: 10px;bottom: 10px;height: 30px;width: 90%;padding: 0 15px;text-align: right;color: #4a94f3" @click="changeLoginType('code')">
<!--              <span style="float:left;color: #4e90fc" @click.stop="jumpClink">去往clink小程序</span>-->
              手机号快捷登录</p>
          </div>
        </div>
      </div>
    </div>

    <van-toast id="van-toast" />
  </fa-container>
</template>

<script>
// 这个以后封组件,ps 这里必须使用相对路径
// 授权这套以后封装，现在先都放在这
import Toast from '@/static/vant-weapp-new/dist/toast/toast'
import config from '../../config'
import moment from 'moment'


export default {
  data() {
    return {
      status: 'loading',
      userInfo: {},
      phoneLogin: 'code',
      title: '登录',
      phone: 'zhaileibing@tycmc.net',
      password: 'zlb@123456',
      code: '',
      sms: '',
      checked: null,
      tmnlUser: true,
      sysUser: false,
    }
  },
  filters: {},
  components: {},
  computed: {},
  methods: {
    async init() {
      this.judLogin()
      // Toast({
      //   message:'通知:  即日起C-LINK小程序正式更新2.0版本，本次升级将为您提供更美观页面、更便捷操作！',
      //   duration:6000
      // })
      this.status = 'success'
    },
    goIndex(){
      this.$route.reLaunch('/pages/common/index')
    },
    judLogin() {
      wx.login({
        success: async (code) => {
          this.code = code.code
        },
      })

      let that = this
      uni.getStorage({
        key:'tenantId',
        success(res) {
          if(res.data){
            that.$store.commit('setTenantId', res.data)
          }
        },
        fail(){
          // do fail
        }
      })

      uni.getStorage({
        key:'userInfo',
        success(res) {
          if(res.data){
            that.$store.commit('setUserInfo', JSON.parse(res.data))
            that.$route.reLaunch('/pages/common/index')
          }else {
            // that.$route.push('/pages/common/authorization')
          }
        },
        fail(e){
          // that.$route.push('/pages/common/authorization')
        }
      })

    },
    back() {
      this.$route.back()
    },
    changeLoginType(opt) {
      this.phoneLogin = opt
    },
    showTip(){
      Toast('请且阅读同意服务协议并选择用户类型！')
    },
    showTipOther(){
      Toast('请且阅读同意服务协议并填写账号信息！')
    },
    getPhoneNum(e) {
      console.log(e)
      this.login(e)
    },
    loginByPhone(type) {
      // let url = 'sys/login'
      let url = 'api/auth/login'
      let data = {
        username: this.phone,
        password: this.password,
      }

      this.$http.post(url, data).then((res) => {
        // 账号密码登录 usertype 必定为 sysuser
        // res.result['user-type'] = 'sysUser'
        uni.setStorage({
          key: 'userInfo',
          data: JSON.stringify(res),
          success: function () {
            //
          }
        });

        this.$store.commit('setUserInfo', res)

        this.$route.reLaunch('/pages/common/index')
      })
      // do login
    },
    // fydebug 获取用户信息相关,以后可能会用
    auth(e) {
      if (e.mp.detail.userInfo) Toast.success('授权成功！')
      this.userInfo = e.mp.detail.userInfo
      this.login()
    },
    async login(info) {
      wx.login({
        success: async (code) => {
          this.code = code.code

          // fydebugger  这里的层级有变化
          !info.detail?info['detail'] = info:''
          if (!info.detail.encryptedData && !info.detail.iv) {
            return
          }

          let res = await this.$http
            .post('sys/wechatCodeLogin', {
              authCode: this.code,
            })
            .then((res) => {
              return res
            })
          await this.$http
            .post('sys/wechatPhoneLogin', {
              authCode: info.detail.code,
              openId: res.result.openid,
              loginType: this.tmnlUser?'tmnlUser':'sysUser',
            })
            .then((res) => {
              !res.result['userInfo']? res.result['userInfo'] = JSON.parse(JSON.stringify(res.result)):''
              res.result['user-type'] = this.tmnlUser?'tmnlUser':'sysUser'
              uni.setStorage({
                key: 'userInfo',
                data: JSON.stringify(res.result),
                success: function () {
                  //
                }
              });

              this.$store.commit('setUserInfo', res.result)

              this.$http.post('backGroundPoint/add', {
                tenant: res.result.groupid,
                menu1:'登录',
                menu2:'',
                menu3:'',
                function:`${res.result.userInfo.realname || res.result.userInfo.username}登录`,
                account: res.result.userInfo.username,
                createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                eventType:'点击事件',
                appType:'小程序端',
              }).then((res) => {

              })

              this.goIndex()
            })

        },
      })
    },
    onChange(e, type) {
      type == 'tmnlUser' ? this.sysUser = '':''
      type == 'sysUser' ? this.tmnlUser = '':''

      e.type ? this[type] = e.detail: this[type] = e
    },
    goAgreement(){
      this.$route.push(
          `/pages/common/agreement`
      )
    },
    jumpClink(){
      wx.navigateToMiniProgram({
        appId: 'wx89e49ce5ba3b1241',
        success(res) {
          // 打开成功
        }
      })
    }
  },
  onShow() {
    // 调用应用实例的方法获取全局数据
    this.init()
  },
  onLoad() {},
}
</script>

<style lang="scss" scoped>
.loginBg {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.font-14 {
  font-size: 14px;
}
.changeType {
  margin: 10px;
  color: #1989fa;
}
.bind-card {
  text-align: center;
  h3 {
    font-size: 18px;
    margin: 10px 0 0 0;
    height: 60px;
    line-height: 60px;
    position: relative;
  }
  > ul {
    text-align: left;
    padding: 15px;
    font-size: 16px;
    color: rgba(102, 102, 102, 1);
    li {
      line-height: 30px;
    }
  }
  p.left {
    position: relative;
    text-align: left;
    margin-top: 15px;
    padding-left: 15px;
    color: #03a9f4;
  }
}
.btn-box {
  margin: 10px 0 0 0;
  background-color: #fff;
  width: 95%;
  padding: 10px;
  z-index: 99;
  van-icon {
    position: relative;
    top: 3px;
    left: -3px;
  }
}

.center {
  position: absolute;
  top: 70%;
  background: rgba(0, 0, 0, 0);
  p {
    position: relative;
    top: 10px;
  }
}
.bind-card {
  p {
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    margin: 0 auto;
  }
  .title-welcome {
    font-size: 18px;
    font-weight: 500;
  }
}

::v-deep .van-hairline--top-bottom:after {
  border-width: 0px 0;
}
.spe-btn {
  ::v-deep button {
    background: rgba(0, 0, 0, 0);
    padding: 3px 12px;
  }
}
.btn-icon {
  ::v-deep {
    .van-button {
      width: 250px;
      border-radius: 15px;
      height: 35px;
    }
  }
}

::v-deep .van-cell {
  background: rgba(0, 0, 0, 0);
  border-bottom: 0.5px solid #ccc;
}

van-cell-group {
  width: 95%;
  margin: 0 auto;
  display: inline-block;
}
::v-deep .header {
  display: none;
}
::v-deep .main {
  margin-top: 0 !important;
}

.input-box {
  width: 70%;
  margin: 0 auto;
  text-align: left;
  z-index: 99;
}
</style>
