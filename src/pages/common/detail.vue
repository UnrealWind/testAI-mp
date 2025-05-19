<template>
  <fa-container :status="status">
    <template>
      <div slot="header" >
        <div @click="back()" class="back">
          <van-icon :size="18" :name="'arrow-left'"></van-icon>
        </div>
        <span>详情</span>
      </div>
      <div>
        <div class="main-list">
          <div class="book" @click="">
            <div class="book-img">
              <img src="https://img3m3.ddimg.cn/0/32/28994823-1_w_9.jpg" />
            </div>
            <div class="info">
              <p class="name">《 {{bookDetail.bookName || '-'}} 》 </p>
              <p class="author"> &nbsp;作者：{{bookDetail.author || '-'}}</p>
              <p class="publishingHouse"> &nbsp; 出版社： {{bookDetail.publishingHouse || '-'}} </p>
              <p class="score"> &nbsp; 评分：{{bookDetail.score || '-'}}</p>
              <p class="introduction"><span> &nbsp; {{bookDetail.contentOverview|| '-'}}</span></p>
            </div>
          </div>
          <div class="introduct">
            <h3>简介</h3>
            <p>{{bookDetail.contentOverview|| '-'}}</p>
            <h3>作者简介 </h3>
            <p>{{bookDetail.authorIntroduction|| '-'}}</p>
            <h3> 评价</h3>
            <div v-for="(item,index) in bookDetail.bookReviews">书友： {{item.review.split('(展开')[0]}}
              <van-rate
                style="float: right"
                :value="judRate(item.scoreStar)"
                size="18"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                bind:change="onChange"
            /></div>
          </div>
        </div>
      </div>
    </template>
  </fa-container>

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
      bookDetail:{},
      ipagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      id:''
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
  },
  methods: {
    async init() {
      try {
        this.getBookDetail()
      } catch (e) {
        this.status = 'error'
        throw e
      }
      this.status = 'success'
    },
    getBookDetail(){
      this.$http
        .get(`system/book/more/${this.id}`, {})
        .then((res) => {
          this.bookDetail = res.data
        })
    },
    judRate(tar){
      let trans = {
        '力荐':5,
        '推荐':4,
        '还行':3,
        '较差':2,
        '很差':1,
      }
      return trans[tar]
    },
    back(){
      this.$route.back()
    }
  },
  onShow() {

  },
  onLoad(options) {
    console.log(options)
    this.id = options.id
  },
}
</script>

<style lang="scss" scoped>

  .main-list {
    .book {
      padding: 10px 15px 10px 15px;
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
    .introduct {
      background: #ffffff;
      padding: 10px 20px 20px 20px;
      p {
        font-size: 13px;
        text-indent: 25px;
      }
      h3 {
        font-size: 15px;
        margin-bottom: 10px;
        margin-top: 10px;
        font-weight: 700;
      }
      div {
        font-size: 13px;
        margin-top: 10px;
      }
    }
  }
</style>
