<template>
  <div :status="status" class="container">
    <div v-if="status === 'loading'" class="cover loading">
      <van-loading size="50px" color="#666" />
    </div>
    <div v-if="status === 'error'" class="cover error">
      <van-icon :name="'warning-o'">warning-o</van-icon>
      <p>加载错误</p>
      <van-button @click="reload" type="default" size="normal" btnClass="mb15">重新加载</van-button>
    </div>
    <div v-if="status === 'empty'" class="cover empty">
      <p>没有找到数据哦 (*￣︶￣*)</p>
      <van-icon :name="'smile-comment-o'">smile-comment-o</van-icon>
    </div>
    <div v-if="status === 'waiting'" class="cover waiting">
      <van-loading size="50px" color="#666" />
    </div>
    <header v-if="customNavBarH" :style="customNavBarH" class="header">
      <slot name="header"></slot>
    </header>
    <main class="main" v-if="status === 'success'" :style="customMain">
      <div class="scroll">
        <slot></slot>
        <div :style="customSafeArea"></div>
      </div>
      <slot name="body-cover" class="body-cover"></slot>
    </main>
    <div v-if="status === 'loading'" class="cover-translucent"></div>
    <footer v-if="tabbar" class="footer">
<!--      <van-tabbar :active="active" @change>-->
<!--        &lt;!&ndash;        <van-tabbar-item name="home"&ndash;&gt;-->
<!--        &lt;!&ndash;                         icon="home-o">首页</van-tabbar-item>&ndash;&gt;-->
<!--        <van-tabbar-item name="home" @click="goRecordList" icon="home-o">工单</van-tabbar-item>-->
<!--        <van-tabbar-item name="mine" @click="goMine" icon="user-circle-o">我的</van-tabbar-item>-->
<!--      </van-tabbar>-->

<!--      改用动态tabbar好看一些-->
      <div class="nav">
        <ul style="position: relative">
          <li @click="changePage('/pages/view/index',1)" :class="tabbar==1?'active':''" style="--clr:#fff">
            <span><img mode="widthFix" class="nav-icon" src="@/static/img/home.png" />首页</span></li>
          <li @click="changePage('/pages/view/community',2)" :class="tabbar==2?'active':''" style="--clr:#fff">
            <span><img mode="widthFix" class="nav-icon" src="@/static/img/device.png" />分类</span></li>
          <li @click="changePage('/pages/view/device',3)" :class="tabbar==3?'active':''" style="--clr:#fff">
            <span><img mode="widthFix" class="nav-icon" src="@/static/img/mall.png" />推荐</span></li>
          <li @click="changePage('/pages/view/mine',4)" :class="tabbar==4?'active':''" style="--clr:#fff">
            <span><img mode="widthFix" class="nav-icon" src="@/static/img/mine.png" />我的</span></li>
          <div class="indicator" :class="'indicator'+tabbar"></div>
        </ul>
      </div>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import config from '../config'

export default {
  props: {
    status: {
      type: String,
      default: 'loading', // error empty waiting
    },
    active: {
      type: String,
      default: 'home',
    },
    tabbar: {
      type: Number,
      default: 0,
    },
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      height: 0,
      tabbarFix:0
    }
  },
  computed: {
    customNavBarH() {
      // 不论如何这里都要变成loading状态.
      let status
      if (this.status === 'success') {
        this.status = 'loading'
        status = 'success'
      }
      // 安卓刘海屏未测试，ios刘海屏未测试，ios未测试
      let sysinfo = wx.getSystemInfoSync()
      let height = wx.getSystemInfoSync().statusBarHeight
      this.height = height
      sysinfo.system.indexOf('iOS') > -1
        ? (this.height += 4)
        : (this.height += 8)
      if (status === 'success') this.status = 'success'
      return `padding:${this.height}px 10px 15px 10px;`
    },
    customMain() {
      return `margin-top:${this.height + 46}px;`
    },
    customSafeArea() {
      let safearea = uni.getSystemInfoSync().safeArea.bottom
      let total = uni.getSystemInfoSync().windowHeight
      return `height:${total - safearea}px;`
    },
  },
  methods: {
    reload() {
      /* global getCurrentPages */
      let pages = getCurrentPages() // 获取页面数组
      let curPage = pages[pages.length - 1] // 获取当前页
      curPage.onShow() // 手动调用生命周期函数
    },
    changePage(url,index){
      let pages = getCurrentPages()
      this.tabbarFix = index
      // this.$route.reLaunch(url)
      this.$emit('changeTabbar', index);
    },

  },
  onShow() {

  },
  onLoad() {
    // fydebugger wx 如果直接在组件中对父组件的参进行修改会报错
    this.tabbarFix = this.tabbar
  },
}
</script>

<style lang="scss">
  page {
    width: 100%;
    height: 100%;
    background: rgba(239, 239, 239, 0.39);
  }
  .cover-translucent {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
  .body-cover {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
  .back {
    display: inline-block;
  }
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  }

  .header {
    background: #fff;
    color: #000;
    font-size: 16px;
    font-weight: 500;
    line-height: 32px;
    height: 32px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    text-align: center;
    > view {
      width: 90%;
    }
    van-icon {
      position: relative;
      top: 3px;
    }
    view {
      display: inline-block;
      float: left;
    }
  }

  .main {
    flex: 1;
    position: relative;
    .scroll {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }

  //.footer {
  //  background: #fff;
  //  color: #000;
  //  line-height: 50px;
  //  z-index: 0;
  //  position: relative;
  //}
  .footer {
    position: fixed;
    bottom: 0;
    z-index: 999;
  }

  .cover {
    z-index: 999;
    text-align: center;
    position: absolute;
    padding: 200px 0 0 0;
    min-width: 100%;
    min-height: 100%;
    background-color: #fff;
    > van-icon {
      font-size: 48px;
    }
  }
  .empty {
    > p {
      text-align: center;
      font-size: 16px;
    }
  }
  .waiting {
    background-color: #ccc;
  }
  .error {
    > p {
      text-align: center;
      font-size: 16px;
    }
    > van-button {
      position: relative;
      top: 20px;
    }
  }

  .nav {
    position: relative;
    width: 100vmin;
    height: 60px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px -10px 10px rgba(0,0,0, 0.05);
    ul {
      display: flex;
      width: 360px;
      margin: 0 auto;
      li {
        height: 60px;
        flex: 1;
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: center;

        span {
          box-shadow: 0px -5px 5px rgba(0,0,0, 0.05);
          position: relative;
          color: #94a3bf;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 11px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          /* 设置鼠标移入的样式 */
          cursor: pointer;
          /* 设置动画过度事件以及延迟 */
          transition: 0.5s;
          transition-delay: 0s;
          van-icon {

          }
          .nav-icon {
            width: 32px;
          }
        }
      }
      li.active {
        span {
          background: orange;
          transform: translateY(-17px);
          transition-delay: 0.25s;
          color: #94a3bf;
          font-weight: 700;
          i {
            color: #94a3bf;
          }
          background: var(--clr);
        }
        span::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 0;
          width: 100%;
          height: 100%;
          background: orange;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0;
          transition: 0.5s;
          transition-delay: 0s;
          opacity: 0.5;
          transition-delay: 0.25s;
          background: var(--clr);
        }
      }
    }
  }

  .indicator {
    position: absolute;
    top: -25px;
    left: 8px;
    width: 75.5px;
    height: 75px;
    background: #ffffff;
    border-radius: 50%;
    z-index: 1;
    transition: 0.5s;
  }
  .indicator::before {
    content: '';
    position: absolute;
    top: 6px;
    left: -28px;
    width: 10px;
    height: 5px;
    background: transparent;
    border-radius: 50%;
    box-shadow: 20.5px 19px 0 4px #fff;
  }
  .indicator::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 52px;
    width: 10px;
    height: 5px;
    background: transparent;
    border-radius: 50%;
    box-shadow: 20px 19px 0 4px #fff;
  }

  .indicator1 {
    transform: translateX(calc(90px*0));
  }

  .indicator2 {
    transform: translateX(calc(90px *1 ));
  }

  .indicator3 {
    transform: translateX(calc(90px*2 ));
  }

  .indicator4 {
    transform: translateX(calc(90px*3));
  }

</style>
