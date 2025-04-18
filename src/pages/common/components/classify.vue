<template>
  <div>
    <scroll-view
        :style="customHeight"
        scroll-y="true"
        refresher-enabled="true"
        :refresher-triggered="triggered"
        :refresher-threshold="100"
        refresher-background="#fff"
        @refresherpulling="onPulling"
        @refresherrefresh="onRefresh"
        @scrolltolower="scrolltolower"
    >
      <div class="record-info">
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
        <div class="main-list" v-if="searching">
          <div class="book" @click="" v-for="(item,index) in list0">
            <div class="book-img">
              <img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" />
            </div>
            <div class="info">
              <p class="name">《 {{item.bookName}} 》 </p>
              <p class="author"> &nbsp;作者：{{item.author}}</p>
              <p class="publishingHouse"> &nbsp; 出版社： {{item.publishingHouse}} </p>
              <p class="score"> &nbsp; 评分：{{item.score}}</p>
              <p class="introduction"><span> &nbsp; {{item.introduction}}</span></p>
            </div>
          </div>
        </div>
        <div class="main-list" v-else>
          <div class="classify" >
            <div class="left">
              <div class="active">0-1岁</div>
              <div>1-2岁</div>
              <div>2-3岁</div>
              <div>3-4岁</div>
              <div>4-5岁</div>
              <div>5-6岁</div>
            </div>
            <div class="right">
              <div class="book-cont">
                <h4>绘本</h4>
                <div class="book-item"><img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" /></div>
                <div class="book-item"><img src="https://img3m0.ddimg.cn/27/30/25217010-1_w_2.jpg" /></div>
                <div class="book-item"><img src="https://img3m8.ddimg.cn/54/10/29305638-1_w_10.jpg" /></div>
                <div class="book-item"><img src="https://img3m0.ddimg.cn/85/33/29189740-1_w_10.jpg" /></div>
                <div class="book-item"><img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" /></div>
                <div class="book-item"><img src="https://img3m0.ddimg.cn/27/30/25217010-1_w_2.jpg" /></div>
                <div class="book-item"><img src="https://img3m8.ddimg.cn/54/10/29305638-1_w_10.jpg" /></div>
                <div class="book-item"><img src="https://img3m0.ddimg.cn/85/33/29189740-1_w_10.jpg" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from '@/static/vant-weapp-new/dist/toast/toast'
export default {
  data() {
    return {
      status: 'loading',
      _freshing: false,
      active:0,
      triggered: false,
      searchText:'',
      searching:false,
      list0:[{
        bookName:'我想和你做朋友',
        author:'一个作者',
        publishingHouse:'一个出版社',
        score:'一个评分',
        coverUrl:'',
        introduction:'一段特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别长的简介',
      },{
        bookName:'我想和你做朋友',
        author:'一个作者',
        publishingHouse:'一个出版社',
        score:'一个评分',
        coverUrl:'',
        introduction:'一段特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别特别长的简介',
      }],
      ipagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  filters: {

  },
  components: {},
  computed: {
    customHeight() {
      let sysinfo = wx.getSystemInfoSync()
      let sysHeight = wx.getSystemInfoSync().windowHeight
      let height = wx.getSystemInfoSync().statusBarHeight
      sysinfo.system.indexOf('iOS') > -1 ? (height += 4) : (height += 8)
      return `height:${sysHeight - height - 150}px`
    },
  },
  mounted() {
    // 这个标记主要是因为 scroll-view 中的状态标识变化不同步导致的，需要手动标记一下
    this.init()
    this._freshing = false
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

    onPulling(e) {
      console.log('onpulling', e)
    },
    async onRefresh() {
      if (this._freshing) return
      this._freshing = true
      if (!this.triggered)
          //界面下拉触发，triggered可能不是true，要设为true
        this.triggered = true
      this.ipagination.pageNo = 0
      this['list'+this.active] = []
      this.markers = []
      this.getRecordList({
        pageNo: ++this.ipagination.pageNo,
      }).then(() => {
        setTimeout(() => {
          this.triggered = false //触发onRestore，并关闭刷新图标
          this._freshing = false
          this.status = "success"
        }, 0)
      })
    },
    // 触底
    scrolltolower() {
      // 进一法下 两者相当相当于目前已经在最后一页
      if (
          Math.floor(
              Math.ceil(
                  this['list'+this.active].length /
                  this.ipagination.pageSize
              ) ===
              Math.ceil(
                  this.ipagination.total /
                  this.ipagination.pageSize
              )
          )
      ) {
        return
      }
      this.getRecordList({
        pageNo: ++this.ipagination.pageNo,
      })
    },

    // 清空工单列表
    clearRecord() {
      this.searchText = ''
      this.resetRecordList()
    },
    // 重置工单列表
    resetRecordList() {
      // todo
      this.onRefresh()
    },

    //工单查询
    searchRecord(e) {
      e.type?this.searchText = e.detail: this.searchText =e
      this.resetRecordList()
      this['list'+this.active] = []
      this.ipagination.pageNo = 1
    },

    // 获取列表
    async getRecordList(opt) {
      let data = {
        pageSize: this.active == 2 ?  9999:this.ipagination.pageSize,
        page:opt.pageNo,
      }
      await this.$http
          .get('api/tenant/deviceInfos', {
            pageSize: this.active == 2 ?  9999:this.ipagination.pageSize,
            page:opt.pageNo,
            sortProperty: 'createdTime',
            sortOrder: 'DESC'
          })
          .then((res) => {
            this['list'+this.active] = this['list'+this.active].concat(
                res.data
            )
            this.ipagination.total = res.data.length0
          })
    },
    onChange(e){
      console.log(e)
    },
  },
  onShow() {

  },
  onLoad() {

  },
}
</script>

<style lang="scss" scoped>
.record-info {
  width: 95%;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: 40px;
  .classify {
    display: flex;
    flex-direction: row;
    background: #ffffff;
    .left {
      width: 15%;
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      div {
        width: 100%;
        height: 50px;
        line-height: 64px;
        text-align: center;
        font-size: 13px;
      }
      .active {
        border-bottom: 1px solid #4a94f3;
      }
    }
    .right {
      width: 85%;
      .book-cont {
        width: 95%;
        margin: 0 auto;
        border-radius: 8px;
        padding: 10px 0 0 0;
        background: #ffffff;
        h4 {
          padding: 10px 25px;
          font-weight: 700;
          font-size: 14px;
        }
        .book-item {
          width: 60px;
          height: 100px;
          margin-left: 13px;
          display: inline-block;
          padding: 5px;
          image {
            width: 70px;
            height: 90px;
          }
        }
      }
    }
  }
  .main-list {
    .book {
      padding: 0px 15px 10px 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      background: #ffffff;
      margin-top: 5px;
      border-radius: 4px;
      .book-img{
        width: 30%;
        display: inline-block;
        image {
          width: 100px;
          height: 130px;
        }
      }
      .info{
        width: 70%;
        display: inline-block;
        p,text {
          font-size: 13px;
          margin-top: 5px;
        }
        .author,.publishingHouse,.score {
          font-size: 12px;
          padding-left: 5px;
        }
        .introduction {
          padding-left: 5px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          word-break: keep-all;
          width: 100%;
          font-size: 12px;
          margin-top: 8px;
        }
        .name {
          font-weight: 700;
          font-size: 15px;
        }
      }
    }
  }
}
</style>
