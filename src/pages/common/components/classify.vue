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
        <van-tabs :active="tarTab" @change="changeTab">
          <van-tab :title="item.label" v-for="(item,index ) in tagInfo">
          </van-tab>
        </van-tabs>
        <div class="main-list" v-if="searching">
          <div class="book" @click="" v-for="(item,index) in searchList">
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
              <div v-for="(item,index) in tagList" :class="item.active?'active':''">{{item.dictLabel}}</div>
            </div>
            <div class="right">
              <div class="book-cont">
<!--                <h4>绘本</h4>-->
                <div class="book-item" v-for="(item,index) in bookList" @click="goBookDetail(item)">
                  <img :src="`http://172.16.2.113:8083/images/${item.coverUrl}`" />
                  <p>{{item.bookName}}</p>
                </div>
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
      tarTab:0,
      active:0,
      tagInfo:[{
        label:'0-3',
        key:'book_tag0'
      },{
        label:'3-6',
        key:'book_tag1'
      },{
        label:'6-9',
        key:'book_tag2'
      },{
        label:'9-12',
        key:'book_tag3'
      }],
      tagList:[],
      searchList:[],
      triggered: false,
      searchText:'',
      searching:false,
      bookList:[],
      ipagination: {
        pageNo: 1,
        pageSize: 15,
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
        this.getBookTag()
        this.getRecordList({
          pageNo: this.ipagination.pageNo,
        })

      } catch (e) {
        this.status = 'error'
        throw e
      }
      this.status = 'success'
    },
    goBookDetail(item){
      this.$route.push('/pages/common/detail?id='+ item.bookId)
    },
    getBookTag(){
      this.$http
        .get(`system/dict/data/type/book_tag${this.tarTab}`, {})
        .then((res) => {
          this.tagList = res.data
        })
    },
    changeTab(e){
      this.tarTab = e.detal.index
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
      this.bookList = []
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
                  this.bookList.length /
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
      this.bookList = []
      this.ipagination.pageNo = 1
    },

    // 获取列表
    async getRecordList(opt) {
      await this.$http
          .get('system/book/list', {
            pageSize: this.ipagination.pageSize,
            pageNum:opt.pageNo,
          })
          .then((res) => {
            this.bookList = this.bookList.concat(
                res.rows
            )
            this.ipagination.total = res.total
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
          p {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            margin-bottom: 10px;
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
