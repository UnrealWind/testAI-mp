<template>
    <div>
        <van-collapse v-for="(item,index) in data" :key="index" :value="activeNames " @change="onChange($event,item)">
            <template v-if="item.title">
                <van-collapse-item  :name="item.key" :isLink="!item.isLeaf" >
                    <div slot="title" class="list-info trunk">
                        <p style="font-size: 13px;color: #000;"> {{item.title|judNull}}<i v-if="item.tags">：</i> {{item.tags|judNull}}</p>
                        <p v-if="item.deptBreadcrumb"> {{item.deptBreadcrumb}} </p>
                    </div>
                    <template v-if="(deptType === 1 &&  item.isLeaf )|| (deptType === 2 && (item.objType === 2 || item.isLeaf)) ">
                        <van-radio :value="item.targetId" slot="icon" :name="item.key" @change.stop="choseRadio($event,item)"/>
                    </template>
                    <template v-if="!item.isLeaf">
                        <fa-tree :data.sync="item.children" :deptType.sync="deptType" @choseRadio="choseRadio"></fa-tree>
                    </template>
                </van-collapse-item>
            </template>
            <template v-else>
                <van-collapse-item  :name="item.username" :isLink="item.title" >
                    <div slot="title" class="list-info trunk">
                        <p style="font-size: 13px;color: #000;"> {{item.realname|judNull}}<i v-if="item.tags">：</i> {{item.tags|judNull}}</p>
                        <p v-if="item.deptBreadcrumb"> {{item.deptBreadcrumb}} </p>
                    </div>
                    <template v-if="!item.title">
                        <van-radio slot="icon" :value="item.targetId" :name="item.deptId+','+item.userId" @change="choseRadio($event,item)"/>
                    </template>
                </van-collapse-item>
            </template>
        </van-collapse>
    </div>
</template>

<script>

import FaTree from "./FaTree";
export default {
    components: {FaTree},
    props: {
        data: {
          type: Array,
          default: []
        },
        deptType:{
            type: Number,
        }
    },
    filters:{
      judNull(val){
        if(!val) return ''
          return val
        }
    },
  data () {
    return {
        activeNames: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
      async init(){
        try {
        //
        }catch (e) {
          this.status = 'error'
          throw e
        }
        this.status = 'success'
      },
      onChange(event,item) {
          if(item.isLeaf || !item.title) return
          this.activeNames = event.detail
      },
      choseRadio(e,item){
          (function jud (arr) {
              arr.forEach((n,i)=>{
                  n.targetId = e.detail
                  n.children?jud(n.children):''
              })
          })(this.data)
          this.$emit('update:data',this.data)
          this.$emit('choseRadio',e,item)
      }
  },
}
</script>

<style lang="scss">
    .list-info {
        margin-left: 20px;
        span{
            margin-right: 10px;
            border-left: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            position: relative;
            top: -4px;
            display: inline-block;
            width: 20px;
            height: 10px;
        }
    }
    .trunk {
        font-size: 12px;
        color:#666666;
    }
    .list-box {
        ::v-deep .van-cell__right-icon-wrap {
            top:5px;
            position: relative;
        }
    }
    ::v-deep .van-button--block {
        margin: 20px auto;
        width: 90%;
    }
    ::v-deep .van-collapse-item__content {
        padding-right: 0 !important;
    }

    ::v-deep .van-cell {
        padding: 5px 16px;
    }

    ::v-deep .van-cell:after {
        border: 0;
    }
    i {
        display: inline-block;
    }
</style>
