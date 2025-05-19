<template>
  <fa-container :status="status" :tabbar="tabbar" @changeTabbar="changeTabbar">
    <template v-if="tabbar==1">
      <div slot="header" >
        <span>首页</span>
      </div>
      <index @changeTabbar="changeTabbar"></index>
    </template>
    <template v-if="tabbar==2">
      <div slot="header">
        <span>分类</span>
      </div>
      <classify ></classify>
    </template>
    <template v-if="tabbar==3">
      <div slot="header">
        <span>推荐</span>
      </div>
      <recommend></recommend>
    </template>

    <template v-if="tabbar==4">
      <div slot="header">
        <span>我的</span>
      </div>
      <mine></mine>
    </template>

    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
  </fa-container>
</template>

<script>
// 这个以后封组件,ps 这里必须使用相对路径
import config from '../../config'
import moment from 'moment'
import store from '../../store'
import Toast from '@/static/vant-weapp-new/dist/toast/toast'

import index from './components/index'
import mine from './components/mine'
import classify from './components/classify'
import recommend from "./components/recommend";

export default {
  data() {
    return {
      status: 'loading',
      tabbar: 4,
    }
  },
  filters: {

  },
  components: {
    index,
    mine,
    classify,
    recommend
  },
  computed: {

  },
  mounted() {

  },
  onPullDownRefresh() {
    console.log('refresh');
    let origin = this.tabbar+0
    this.tabbar = 0
    setTimeout( () =>{
      this.tabbar = origin
      uni.stopPullDownRefresh();
    }, 0);
  },
  methods: {
    async init() {
      try {
        //
      } catch (e) {
        this.status = 'error'
        throw e
      }
      this.status = 'success'
    },
    changeTabbar(index){
      this.tabbar = index
    },
  },
  onShow() {
    let that = this
    uni.startPullDownRefresh();
    uni.getStorage({
      key:'token',
      success(res) {
        if(res.data){
          that.$store.commit('setToken', res.data)
        }
      },
    })
    this.init()
  },
  onLoad() {

  },
}
</script>

<style lang="scss" scoped>
::v-deep .header {
  background: #ffffff;
  color: #000;
  overflow: hidden;
  img {
    position: absolute;
    left: 0;
    bottom: -20px;
  }
}

.main {
  background-color: #eaecf9;
}
</style>
