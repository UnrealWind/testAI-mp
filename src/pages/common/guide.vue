<template>
  <fa-container :status="status">
    <div slot="header">
      <div @click="back()" class="back">
        <van-icon :size="18" :name="'arrow-left'"></van-icon>
      </div>
      <span>寻车</span>
    </div>
    <div>
      <div class="main-info">
        <div class="basic-info">
          <h3>我的{{'deviceName'}} <span class="open">开机</span></h3>
          <p>车辆数据更新于： 2025-01-01 23:00:00</p>
        </div>
        <div>
          <img /> 石家庄市桥西区新华路112号  <span>点击导航</span>
        </div>
        <div class="map">
          <map v-if="active==2" style="width: 100%; height: 80vh;"
             :longitude="mapInfo.longitude" :latitude="mapInfo.latitude"
             :scale="mapInfo.scale" :markers="markers"
          >
          </map>
        </div>
      </div>
    </div>
  </fa-container>
</template>

<script>

import store from "../../store";
import Toast from '@/static/vant-weapp-new/dist/toast/toast'

export default {
  data() {
    return {
      status: 'loading',
      mapInfo:{
        longitude:'116.397128',
        latitude:'39.916527',
        scale:3
      },
      markers:[{
        id: 1,
        latitude: 139,
        longitude: 41,
        iconPath: 'http://gpsweb2.tygps.com/img/kind/web/180.png',
        width: 25,
        height: 25,
        joinCluster: true
      }]
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
    back(){
      this.$route.back()
    },
  },
  onLoad() {

  },
}
</script>

<style lang="scss" scoped>
.main-info{
  .open {
    background: #4cb24d;
  }
  p {
    font-size: 12px;
    color: #999;
    padding: 5px 10px 5px 0;
  }
  .basic-info {
    width: 92%;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 8px;
    margin-top: 10px;
    padding: 10px;
    span {
      width: 36px;
      display: inline-block;
      color: #ffffff;
      font-size: 11px;
      text-align: center;
      border-radius: 3px;
      margin-left: 15px;
      padding: 2px 8px 3px 8px;
    }
  }
}
</style>
