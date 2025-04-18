<template>
  <view class="content">
    <div class="main-info">
      <van-search
          background="#fff"
          shape="round"
          :value="searchText"
          input-align="center"
          placeholder="请输入书籍名称"
          @clear="clearRecord"
          @cancel="clearRecord"
          @search="searchRecord"
      />
      <swiper class="swiper-box" autoplay="true" interval="5000" @change="change" :indicator-dots="true" indicator-color="#fff" indicator-active-color="#ccc" >
        <swiper-item @click="">
          <view class="swiper-item">
            <img class="w-full h-full" :src="swiperList[0].url" />
          </view>
        </swiper-item>
      </swiper>
      <h3 >精品推荐 <span>查看更多>></span></h3>
      <scroll-view class="book-cont" scroll-x style='display: flex; white-space: nowrap;'>
        <div class="book"><img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/27/30/25217010-1_w_2.jpg" /></div>
        <div class="book"><img src="https://img3m8.ddimg.cn/54/10/29305638-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/85/33/29189740-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/27/30/25217010-1_w_2.jpg" /></div>
        <div class="book"><img src="https://img3m8.ddimg.cn/54/10/29305638-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/85/33/29189740-1_w_10.jpg" /></div>
      </scroll-view>
      <h3 >3-6岁绘本 <span>查看更多>></span></h3>
      <scroll-view class="book-cont" scroll-x style='display: flex; white-space: nowrap;'>
        <div class="book"><img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/27/30/25217010-1_w_2.jpg" /></div>
        <div class="book"><img src="https://img3m8.ddimg.cn/54/10/29305638-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/85/33/29189740-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/27/30/25217010-1_w_2.jpg" /></div>
        <div class="book"><img src="https://img3m8.ddimg.cn/54/10/29305638-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/85/33/29189740-1_w_10.jpg" /></div>
      </scroll-view>
      <h3 >6-12岁书籍 <span>查看更多>></span></h3>
      <scroll-view class="book-cont" scroll-x style='display: flex; white-space: nowrap;'>
        <div class="book"><img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/27/30/25217010-1_w_2.jpg" /></div>
        <div class="book"><img src="https://img3m8.ddimg.cn/54/10/29305638-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/85/33/29189740-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/27/30/25217010-1_w_2.jpg" /></div>
        <div class="book"><img src="https://img3m8.ddimg.cn/54/10/29305638-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/85/33/29189740-1_w_10.jpg" /></div>
      </scroll-view>
      <h3 >12-18岁书籍 <span>查看更多>></span></h3>
      <scroll-view class="book-cont" scroll-x style='display: flex; white-space: nowrap;'>
        <div class="book"><img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/27/30/25217010-1_w_2.jpg" /></div>
        <div class="book"><img src="https://img3m8.ddimg.cn/54/10/29305638-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/85/33/29189740-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/27/30/25217010-1_w_2.jpg" /></div>
        <div class="book"><img src="https://img3m8.ddimg.cn/54/10/29305638-1_w_10.jpg" /></div>
        <div class="book"><img src="https://img3m0.ddimg.cn/85/33/29189740-1_w_10.jpg" /></div>
      </scroll-view>
    </div>
<!--    <div class="model-front"></div>-->
    <div class="ai-btn"> <img mode="widthFix" src="@/static/img/button.png"/> </div>
<!--    <img mode="widthFix" src="@/static/img/bg.png" />-->
  </view>
</template>

<script>

import store from "../../../store";
import Toast from '@/static/vant-weapp-new/dist/toast/toast'

export default {
  data() {
    return {
      status: 'loading',
      swiperList:[{
        url:'../../../static/img/testSwiper.png'
      }],
      searchText:''
    }
  },
  filters: {},
  components: {},
  computed: {},
  created(){

  },
  mounted() {
    // 这个标记主要是因为 scroll-view 中的状态标识变化不同步导致的，需要手动标记一下
    this.init()
  },
  methods: {
    async init() {
      try {

      } catch (e) {
        this.status = 'error'
        throw e
      }
      this.status = 'success'
    },
    clearRecord() {
      this.searchText = ''
    },
    searchRecord(e) {
      e.type?this.searchText = e.detail: this.searchText =e
    },
    change(){

    }
  },
  onLoad() {

  },
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
  position: relative;
  .swiper-box {
    height: 180px;
    width: 100%;
    margin: 0 auto;
  }
  .swiper-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ccc;
    height: 100%;
    position: relative;
    width: 95%;
    border-radius: 6px;
    overflow: hidden;
    margin: 0 auto;
    image {
      width: 100%;
    }
  }
  .main-info {
    position: absolute;
    z-index: 99;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 80px;
    //height: 90%;
    //overflow-y: scroll;
    h3 {
      font-weight: 500;
      font-size: 14px;
      color: #000;
      display: inline-block;
      padding: 8px 12px;
      width: 90%;
      span {
        float: right;
        margin-right: 18px;
        font-size: 12px;
        color: #999;
      }
    }
    .book-cont {
      width: 95%;
      margin: 0 auto;
      height: 120px;
      border-radius: 8px;
      padding: 10px 0 0 0;
      background: #ffffff;
      .book {
        width: 80px;
        height: 100px;
        margin-left: 13px;
        display: inline-block;
        image {
          width: 80px;
          height: 100px;
        }
      }
    }
  }
  .model-front {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-y: scroll;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
  }
  >image {
    width: 100%;
    height: 100%;
  }
  .ai-btn {
    width: 120px;
    height: 120px;
    position: fixed;
    bottom: 50px;
    right: 10px;
    z-index: 999;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
