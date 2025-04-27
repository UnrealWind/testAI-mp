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
          <div class="introduct">
            <h3>简介</h3>
            <p>这是一本培养儿童社交能力的绘本，讲述了两个陌生人如何成为好朋友的的故事。</p>
            <p> 阿米尔和路易斯是邻居，他们每天都见面，但从不说话。因为一些原因，他们的父母互不往来。阿米尔和路易斯很想一起玩儿，想互相了解，他们该怎么做呢？是谁迈出了第一步？又是谁打破了尴尬呢？</p>
            <p>培养孩子的社交能力，需要让孩子走出去。孩子在同别的小伙伴们玩耍的时候，会逐渐学会交朋友，并能够尝试着学会信任他人、尊重他人，在同他人的交往中培养自己乐于助人等的、有助于人际交往的优秀品质。《我想和你做朋友》用一个简单但又温馨愉快的故事鼓励孩子主动去结交朋友。同时，也让父母学习到，父母的交往态度直接影响孩子交往能力的发展，所以要从小为孩子创设交往机会，同时尊重孩子的交往需求，孩子的“朋友圈”由孩子自己做主。</p>
            <p>适读人群 ：3-5岁</p>
            <h3>作者简介 </h3>
            <p>娜塔莎·安德里亚米拉多，出生于马达加斯加，后在法国索邦大学学习哲学，是一名年轻的童书作家，为孩子创作过不少优秀的图画书作品。</p>
            <p>马加利·勒·于谢，1979年出生于法国巴黎。在斯特拉斯堡的装饰艺术学院学习工作了五年。 自2004年以来，她一直从事儿童出版，为多家出版商工作，创作作品，并于2006年获得法国非常重要的儿童和青少图书奖——女巫奖。</p>

            <h3> 评价</h3>
            <p>书友A： 好书
              <van-rate
                style="float: right"
                value="4"
                size="18"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                bind:change="onChange"
            /></p>
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
      list0:[{
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
    }
  },
  onShow() {

  },
  onLoad() {

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
    .introduct {
      background: #ffffff;
      padding: 10px 20px 20px 20px;
      p {
        font-size: 13px;
      }
      h3 {
        font-size: 14px;
        margin-bottom: 10px;
        margin-top: 10px;
      }
    }
  }
</style>
