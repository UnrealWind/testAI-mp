<template xmlns="">
  <van-cell-group>
    <view v-for="(item,index) in data" :key="index">
      <div
        v-if="item.type === 'select' || item.type === 'radio'"
      >
        <div @click="changePickerModel($event,`${index}|value`)">
          <van-field
              :value="item.value"
              :label="item.label"
              :placeholder="`请选择${item.label}`"
              @change
              input-align="right"
              disabled
              :required="item.required === 1"
          />
        </div>
        <van-field
            v-if="item.children && item.value == item.children.parent"
            :value="item.children.value"
            :label="item.children.label"
            type="textarea"
            custom-style="height:60px;"
            :maxlength="item.children.max_length"
            @change="changeVal($event,item.children)"
            input-align="right"
            :required="item.children.required === 1"
        />
      </div>

      <div v-if="item.type === 'date'" @click="changeTimeModel($event,`${index}|value`)">
        <van-field
          :value="item.value"
          :label="item.label"
          :placeholder="`请选择${item.label}`"
          input-align="right"
          disabled
          :required="item.required === 1"
        />
      </div>

      <div v-if="item.type === 'cascade_combobox'">
        <van-cell>
          <div slot="title" class="double-picker">
            <van-row>
              <van-col span="8">
                <span style="height: 44px;line-height: 44px;">
                  <span class="required" v-if="item.required === 1">*</span>
                  {{item.label}}
                </span>
              </van-col>
              <van-col span="16">
                <span v-for="(opt,idx) in item.value" :key="idx">
                  <van-row>
                    <van-col span="18">
                      <div @click="changePickerModel($event,`${index}|value|${idx}|one|value`)">
                        <van-field
                          :value="opt.one.text"
                          :placeholder="item.placeholder[0]"
                          input-align="right"
                          disabled
                        />
                      </div>
                    </van-col>
                    <van-col span="18">
                      <div @click="changePickerModel($event,`${index}|value|${idx}|two|value`)">
                        <van-field
                          :value="opt.two.text"
                          :placeholder="item.placeholder[1]"
                          input-align="right"
                          disabled
                        />
                      </div>
                    </van-col>
                    <van-col span="6">
                      <van-icon
                        @click="addNewFault(item)"
                        style="position:relative;top: -10px"
                        name="add-o"
                        size="18px"
                      />
                      <van-icon
                        v-if="idx>0"
                        @click="delNewFault(item.value,idx)"
                        style="position:relative;top: -10px;margin-left: 5px;"
                        name="close"
                        size="18px"
                      />
                    </van-col>
                  </van-row>
                </span>
              </van-col>
            </van-row>
          </div>
        </van-cell>
      </div>

<!--      todo 根据这个二级级联，用于渲染零件,  存储的时候需要特殊处理-->
      <div v-if="item.type === 'label'">
        <van-cell>
          <div slot="title" class="double-picker">
            <van-row>
              <van-col span="8">
                <span style="height: 44px;line-height: 44px;">
                  <span class="required" v-if="item.required === 1">*</span>
                  {{item.label}}
                </span>
              </van-col>
              <van-col span="16">
                <span v-for="(opt,idx) in item.value" :key="idx">
                  <van-row>
                    <van-col span="18">
                      <div @click="changePickerModel($event,`${index}|value|${idx}|materialName`)">
                        <van-field
                            :value="opt.materialName"
                            placeholder="请选择零件"
                            input-align="right"
                            disabled
                        />
                      </div>
                    </van-col>
                    <van-col span="18">
                      <div>
                        <van-field
                            :value="opt.materialCount"
                            type="number"
                            placeholder="请输入数量"
                            input-align="right"
                            @change="changeSpeVal($event,`${index}|value|${idx}|materialCount`)"
                        />
                      </div>
                    </van-col>
                    <van-col span="18">
                      <div>
                        <van-field
                            :value="opt.unitPrice"
                            type="number"
                            placeholder="请输入单价"
                            input-align="right"
                            @change="changeSpeVal($event,`${index}|value|${idx}|unitPrice`)"
                        />
                      </div>
                    </van-col>
                    <van-col span="6">
                      <van-icon
                          @click="addPart(item)"
                          style="position:relative;top: -10px"
                          name="add-o"
                          size="18px"
                      />
                      <van-icon
                          v-if="idx>0"
                          @click="delNewFault(item.value,idx)"
                          style="position:relative;top: -10px;margin-left: 5px;"
                          name="close"
                          size="18px"
                      />
                    </van-col>
                  </van-row>
                </span>
              </van-col>
            </van-row>
          </div>
        </van-cell>
      </div>

      <div v-if="item.type === 'textarea'">
        <van-field
          :value="item.value"
          :label="item.label"
          type="textarea"
          custom-style="height:60px;"
          maxlength="item.max_length"
          @change="changeVal($event,item)"
          input-align="right"
          required="item.required === 1"
          :required="item.required === 1"
        />
      </div>

      <div v-if="item.type === 'text'">
        <van-field
          :value="item.value"
          :label="item.label"
          :placeholder="`请输入${item.label}`"
          @change="changeVal($event,item)"
          input-align="right"
          :disabled = "item.disabled"
          :required="item.required === 1"
        />
      </div>

      <div v-if="item.type === 'phonenum'">
        <van-field
          :value="item.value"
          :label="item.label"
          :placeholder="`请输入${item.label}`"
          @change="changeVal($event,item)"
          input-align="right"
          type="number"
          :required="item.required === 1"
        />
      </div>

      <div v-if="item.type === 'number'">
        <van-field
          :value="item.value"
          :label="item.label"
          :placeholder="`请输入${item.label}`"
          @change="changeVal($event,item)"
          input-align="right"
          type="number"
          @blur="judTypeNumber($event,item)"
          :required="item.required === 1"
        />
      </div>

      <!--      这里对怎么处理这些本身就需要filter一下的暂时没啥想法，要不区分一下，要不后台处理，要不初始化的时候处理，都差不都-->
      <div v-if="item.type === 'numberDate'">
        <van-field
          :value="item.value|judNumberDate"
          :label="item.label"
          :placeholder="`请输入${item.label}`"
          @change="changeVal($event,item)"
          input-align="right"
          type="number"
          :disabled="item.disabled"
          :required="item.required === 1"
        />
      </div>

      <div v-if="item.type === 'numberKm'">
        <van-field
          :value="item.value|judNumberKm"
          :label="item.label"
          :placeholder="`请输入${item.label}`"
          @change="changeVal($event,item)"
          input-align="right"
          :disabled = "item.disabled"
          type="number"
          :required="item.required === 1"
        />
      </div>

      <!--      <van-cell v-if="item.type === 'radio'">-->
      <!--        <div slot="title" class="radio-group">-->
      <!--          <span><span v-if="item.required === 1" class="required">*</span>{{item.label}}</span>-->
      <!--          <span>-->
      <!--              <van-radio-group @change="choseRadio($event,item)" v-if="item.options.length>0" :value="item.value">-->
      <!--                <van-radio v-for="(opt,idx) in item.options" :key="idx" :name="idx">{{opt}}</van-radio>-->
      <!--              </van-radio-group>-->
      <!--              <van-radio-group @change="choseRadio($event,item)" v-if="item.dict_options.length>0" :value="item.value">-->
      <!--                <van-radio v-for="(opt,idx) in item.dict_options" :key="idx" :name="opt.value">{{opt.text}}</van-radio>-->
      <!--              </van-radio-group>-->
      <!--            </span>-->
      <!--        </div>-->
      <!--      </van-cell>-->

      <van-cell v-if="item.type === 'checkbox'">
        <div slot="title" class="checkbox-group">
          <span>
            <span v-if="item.required === 1" class="required">*</span>
            {{item.label}}
          </span>
          <span>
            <van-checkbox-group
              @change="choseCheckbox($event,item)"
              v-if="item.options.length>0 && (!item.dict_options || item.dict_options.length === 0)"
              :value="item.value"
            >
              <van-checkbox v-for="(opt,idx) in item.options" :key="idx" :name="idx">{{opt}}</van-checkbox>
            </van-checkbox-group>
            <van-checkbox-group
              @change="choseCheckbox($event,item)"
              v-if="item.dict_options.length>0"
              :value="item.value"
            >
              <van-checkbox
                v-for="(opt,idx) in item.dict_options"
                :key="idx"
                :name="opt.value"
              >{{opt.text}}</van-checkbox>
            </van-checkbox-group>
          </span>
        </div>
      </van-cell>

      <van-cell v-if="item.type === 'image'">
        <div slot="title" class="img-uploader">
          <van-row>
            <van-col span="6">
              <span>
                <span v-if="item.required === 1" class="required">*</span>
                {{item.label}}
              </span>
            </van-col>
            <van-col span="18">
              <van-uploader
                :file-list="item.value"
                :max-count="item.max || 1000000"
                multiple="true"
                @afterRead="upload($event,item)"
                @delete="deleteImg($event,item)"
              />
            </van-col>
          </van-row>
        </div>
      </van-cell>

      <van-cell v-if="item.type === 'slider'">
        <div slot="title" class="slider-box">
          <span>
            <span v-if="item.required === 1" class="required">*</span>
            {{item.label}}
          </span>
          <div>
            <van-slider :value="item.value" @change="choseSilder($event,item)" />
          </div>
        </div>
      </van-cell>

      <van-divider v-if="item.type === 'divider'" contentPosition="center">{{ item.label }}</van-divider>
    </view>

    <van-popup
      :show="showTime"
      position="bottom"
      custom-style="height: 40%;"
      @close="changeTimeModel"
    >
      <van-datetime-picker
        type="datetime"
        :value="currentTime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="writeCurrentTime"
        @cancel="changeTimeModel"
      />
    </van-popup>

    <van-popup
      :show="showPicker"
      position="bottom"
      custom-style="height: 40%;"
      @close="changePickerModel"
    >
      <van-picker
        show-toolbar
        :columns="currentColumn"
        @confirm="chosePicker()"
        @cancel="changePickerModel"
      />
    </van-popup>
  </van-cell-group>
</template>

<script>
import moment from 'moment'
import config from '../config'
import store from '../store'
import Toast from '@/static/vant-weapp-new/dist/toast/toast'

export default {
  props: {
    data: {
      type: Array,
      default: [],
    },
    device: {
      type: String,
      default: ''
    }
  },
  filters: {
    judNumberDate(val) {
      if (!val) return '-'
      val = Math.ceil(val/60)
      if (val < 120) return `${val}分钟`
      if (120 <= val && val < 1440)
        return `${parseInt(val / 60)}小时${val % 60}分钟`
      if (val >= 1440)
        return `${parseInt(val / (60 * 24))}天${parseInt(
          (val % (60 * 24)) / 60
        )}小时${val % 60}分钟`
    },
    judNumberKm(val) {
      val = `${val}`.replace(/[^0-9]/ig,"");
      if (!val) return '-'
      return `${val}`
    },
  },
  data() {
    return {
      fileList: [
        {
          url: 'https://img.yzcdn.cn/vant/leaf.jpg',
          name: '图片1',
        },
      ],
      currentColumn: [],
      minDate: new Date(2010, 10, 1).getTime(),
      maxDate: new Date(2030, 10, 1).getTime(),
      currentTime: new Date().getTime(),
      showTime: false,
      showPicker: false,
      faultListBg: [], // 故障类型大类
      faultListSm: [], // 故障类型小类
      targetItem: '', //选中的项
      partList:[], // 零件列表
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        this.getDict()
        this.getFaultPartBg()
        this.getPartList()
      } catch (e) {
        this.status = 'error'
        throw e
      }
      this.status = 'success'
    },
    getFaultPartBg() {
      this.$http
        .get('partClass/servicePartClass/list', {
          pageSize: 10000,
        })
        .then((res) => {
          this.faultListBg = res.result.records
        })
    },
    getFaultPartSm(id) {
      this.$http
        .get(
          'partClass/servicePartClass/queryServicePartClassDetailByMainId',
          {
            pageSize: 10000,
            id: id,
          }
        )
        .then((res) => {
          this.faultListSm = res.result
        })
    },
    changeTimeModel(e, type) {
      type ? (this.targetItem = type.split('|')) : ''
      if(this.data[this.targetItem[0]].disabled){
        return
      }
      this.showTime = !this.showTime
    },

    changeSpeVal(e,type){
      let tar;
      type ? tar = type.split('|') : ''
      this.data[tar[0]][tar[1]][tar[2]][tar[3]] =  e.detail
      this.$emit('update:data', this.data)
    },
    async changePickerModel(e, type) {
      // 这里有两种情况，一种是
      type ? (this.targetItem = type.split('|')) : ''
      if (type && this.targetItem.length === 5) {
        if (type.indexOf('one') > -1) {
          let arr = []
          this.faultListBg.forEach((n, i) => {
            arr.push(n.className)
          })
          this.currentColumn = arr
        } else if (type.indexOf('two') > -1) {
          if (
            !this.data[this.targetItem[0]][this.targetItem[1]][
              this.targetItem[2]
            ]['one']['text']
          ) {
            Toast.fail('请先选择大类！')
            return
          }
          let arr = []
          this.faultListSm.forEach((n, i) => {
            arr.push(n.className)
          })
          this.currentColumn = arr
        }
      } else if (type && this.targetItem.length === 2) {
        let arr = []
        let target
        this.data[this.targetItem[0]].dict_options &&
        this.data[this.targetItem[0]].dict_options.length > 0
          ? (target = this.data[this.targetItem[0]].dict_options)
          : (target = this.data[this.targetItem[0]].options)
        // 这里由于后台分为字典有无两种情况
        target.forEach((n, i) => {
          n.text ? arr.push(n.text) : arr.push(n)
        })
        this.currentColumn = arr
      } else if (type && this.targetItem.length === 4) {
        let arr = []

        // 这里由于后台分为字典有无两种情况
        this.partList.forEach((n, i) => {
          arr.push(n.text)
        })
        this.currentColumn = arr
      }
      this.showPicker = !this.showPicker
    },

    // 零件下拉列表
    async getPartList(){
      this.$http
        .get(
            `sys/dict/getDictItems/part_code`,
            {}
        ).then((res) => {
          this.partList = res.result
        })
    },

    async getDict() {
      let judSpe = (i) => {
        let n = this.data[i]
        if (n.type === 'cascade_combobox') {
          n.value.forEach((ni, ii) => {
            ni['one'] = {
              value: ni['largeClass'],
              text: ni['largeClassName'] || ni['largeClass_dictText'],
            }
            ni['two'] = {
              value: ni['smallClass'],
              text: ni['smallClassName'] || ni['smallClass_dictText'],
            }
          })
        }
        if (n.type === 'image') {
          !n.value?n.value = []:''
          n.value.forEach((ni, ii) => {
            ni['url'] = ni.imgUrl
          })
        }
      }

      let judVal = (i) => {
        let n = this.data[i]
        if (n.type === 'select' || n.type === 'radio') {
          if (n.dict_id && n.data_type === 2) {
            n.dict_options.forEach((ni, ii) => {
              ni.value === n.value ? (n.value = ni.text) : ''
            })
          } else {
            n.options.forEach((ni, ii) => {
              ii === n.value ? (n.value = ni) : ''
            })
          }
        } else {
          n.value = n.value
        }
      }

      let jud = (i) => {
        console.log(this.data[i].business_key,this.device)
        // 由于保养周期的独特性，这个玩意需要从独特的接口里获取数据
        if(this.data[i].business_key === 'maintain_id' && this.device){
          this.$http
            .get(
              `device/serviceDevice/getMaintainList`,
              {
                vclNo: this.device
              }
            )
            .then((res) => {
              res.result.list.forEach((n,i)=>{
                n['text'] = n.maintainName
                n['value'] = n.maintainId
              })
              this.data[i]['dict_options'] = res.result.list
            })
        }else{
          if (this.data[i].dict_id && this.data[i].data_type === 2) {
            // dict_type  用于区分不同字典获取options
            if (this.data[i].dict_type) {
              this.$http
                .get(
                  //`sys/dict/getDictItems/${this.data[i].dict_id}`,
                  //`sys/dict/getDictText/service_sys_dict_item,item_name,dict_id/${this.data[i].dict_id}`,
                  `sys/dict/getDictItems/service_sys_dict_item,item_name,id,dict_id='${this.data[i].dict_id}'`,
                  {}
                )
                .then((res) => {
                  this.data[i]['dict_options'] = res.result
                  judVal(i)
                  this.$emit('update:data', this.data)
                })
            } else {
              this.$http
                .get(
                  `service/systemmanagement/serviceSysDict/queryServiceSysDictItemByMainId`,
                  {
                    id: this.data[i].dict_id,
                  }
                )
                .then((res) => {
                  res.result.forEach((n,i)=>{
                    n['text'] = n.itemName
                    n['value'] = n.id
                  })
                  this.data[i]['dict_options'] = res.result
                  judVal(i)
                  this.$emit('update:data', this.data)
                })
            }
          } else {
            judVal(i)
            this.$emit('update:data', this.data)
          }
          judSpe(i)
        }
        this.$emit('update:data', this.data)
      }
      this.data.forEach((n, i) => {
        jud(i)
      })
    },

    chosePicker(e) {
      !e.detail? e['detail']  = e:''
      if (this.targetItem.length === 2) {
        this.data[this.targetItem[0]][this.targetItem[1]] = e.detail.value
      } else if (this.targetItem.length === 5) {
        // 这里可抽优化
        // 非tm要做自定义表单，自定义还tm老整这种特殊的表单，周栋梁这设计了个jb，啥玩意
        if (this.targetItem.indexOf('one') > -1) {
          this.data[this.targetItem[0]][this.targetItem[1]][this.targetItem[2]][
            this.targetItem[3]
          ]['text'] = e.detail.value
          this.data[this.targetItem[0]][this.targetItem[1]][this.targetItem[2]][
            this.targetItem[3]
          ][this.targetItem[4]] = this.faultListBg[e.detail.index].id
          // 选择大类的时候直接更新小类的列表
          this.getFaultPartSm(this.faultListBg[e.detail.index].id)
        } else if (this.targetItem.indexOf('two') > -1) {
          this.data[this.targetItem[0]][this.targetItem[1]][this.targetItem[2]][
            this.targetItem[3]
          ]['text'] = e.detail.value
          this.data[this.targetItem[0]][this.targetItem[1]][this.targetItem[2]][
            this.targetItem[3]
          ][this.targetItem[4]] = this.faultListSm[e.detail.index].id
        }
      }else if(this.targetItem.length === 4){
        this.data[this.targetItem[0]][this.targetItem[1]][this.targetItem[2]]['materialName']= e.detail.value
        this.partList.forEach((n,i)=>{
          n.text == e.detail.value? this.data[this.targetItem[0]][this.targetItem[1]][this.targetItem[2]]['materialNo'] = n.value:''
        })
      }
      this.$emit('update:data', this.data)
      this.showPicker = false
    },

    writeCurrentTime(e) {
      if (this.targetItem.length === 2) {
        e.detail = moment(new Date(e.detail)).format(
          this.data[this.targetItem[0]].format
        )
        this.data[this.targetItem[0]][this.targetItem[1]] = e.detail
      }
      this.$emit('update:data', JSON.parse(JSON.stringify(this.data)))
      this.showTime = false
    },
    addPart(item){
      item.value.push({
        materialSum:'', // 总价
        unitPrice:'',  // 单价
        materialCount:'',  //数量
        materialName:'',  //零件名称
        materialNo:'',  // 零件号
        "isClaim": 0
      })
      this.$emit('update:data', this.data)
    },
    addNewFault(item) {
      item.value.push({
        one: {
          text: null,
          value: null,
        },
        two: {
          text: null,
          value: null,
        },
      })
      this.$emit('update:data', this.data)
    },
    delNewFault(item, idx) {
      item.splice(idx, 1)
      this.$emit('update:data', this.data)
    },
    changeVal(e, item) {
      item.value = e.detail
      this.$emit('update:data', this.data)
    },
    judTypeNumber(e, item) {
      Number(e.detail.value)
        ? (item.value = e.detail.value)
        : ((item.value = 0), e.detail.value)
      if (
        item.type === 'number' &&
        item.max &&
        Number(e.detail.value) > item.max
      ) {
        item.value = item.max
      }
      this.$emit('update:data', this.data)
    },
    choseRadio(e, item) {
      item.value = e.detail
      this.$emit('update:data', this.data)
    },
    choseCheckbox(e, item) {
      item.value = e.detail
      this.$emit('update:data', this.data)
    },
    choseSilder(e, item) {
      item.value = e.detail
      this.$emit('update:data', this.data)
    },
    upload(e, item) {
      // todo upload 需要抽出
      let arr = []
      e.detail.file.forEach((n,i)=>{
        let promise = new Promise((resolve,rej)=>{
          wx.uploadFile({
            url: config.apiUrl + 'sys/common/upload',
            filePath: n.url,
            name: 'file',
            header: {
              'X-Access-Token': store.state.userInfo.token,
            },
            formData: {},
            success: (res) => {
              res.data = JSON.parse(res.data)
              !item.value? item.value = []:''
              item.value.push({
                // url: config.apiUrl+ res.data.message,
                url: res.data.message,
                })
              resolve(true)
            },
          })
        })
        arr.push(promise)
      })

      Promise.all(arr).then((values) => {
        this.$emit('update:data', this.data)
      });
    },
    deleteImg(e, item) {
      item.value.splice(e.detail.index, 1)
      this.$emit('update:data', this.data)
    },
  },
}
</script>

<style lang="scss">
::v-deep .header {
  background: #4a94f3;
  color: #ffffff;
}
::v-deep .main {
  background-color: #efefef;
}
.font-14 {
  font-size: 14px;
}
.font-13 {
  font-size: 13px;
}
.margin-l {
  margin-left: 28px;
}
.report-info {
  margin-top: 5px;
  van-card {
    margin-top: 1px;
  }
}
.main-info {
  width: 97%;
  margin: 8px auto;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
}
.double-picker {
  van-icon {
    position: relative;
    top: 6px;
  }
  > div {
    width: 38%;
    display: inline-block;
  }
}
.oper-part {
  float: right;
  height: 80px;
  line-height: 80px;
  display: inline-block;
  van-icon {
    margin-left: 10px;
  }
}
.normal-list-info {
  width: 70%;
  display: inline-block;
}
.icon-part {
  width: 24px;
  height: 24px;
  display: inline-block;
  border-radius: 100px;
  background: #efefef;
  float: right;
  line-height: 30px;
  text-align: center;
  position: relative;
  top: -6px;
}
.img-uploader {
  vertical-align: center;
  span {
    min-height: 60px;
    display: inline-block;
    float: left;
    margin-right: 20px;
  }
}
.checkbox-group,
.radio-group {
  > span {
    display: inline-block;
    width: 65%;
    float: left;
  }
  > span:first-child {
    display: inline-block;
    margin-right: 20px;
    width: 25%;
  }
  van-checkbox-group,
  van-radio-group {
    width: 60%;
  }
  van-checkbox,
  van-radio {
    display: inline-block;
    margin-left: 20px;
  }
}
.radio-group {
  > span:first-child {
    display: inline-block;
    margin-right: 20px;
    width: 25%;
    min-height: 20px;
    line-height: 20px;
  }
}
.slider-box {
  > div {
    width: 70%;
    float: right;
    margin-top: 13px;
  }
}

h3 {
  background: #ffffff;
  font-size: 15px;
  padding: 8px 12px;
  border-bottom: 1px solid #eeeeee;
  span:first-child {
    border-left: 2px solid #4a94f3;
    padding-left: 5px;
  }
}
::v-deep .van-card {
  background: #ffffff !important;
}
::v-deep .van-button--block {
  margin: 20px auto;
  width: 90%;
}
.shadow-part {
  display: inline-block;
  width: 100%;
  height: 5px;
  background: #efefef;
}
::v-deep .van-field__label {
  color: #000;
}
::v-deep textarea {
  height: 40px !important;
}
.required {
  color: red;
  position: absolute;
  left: 8px;
}
</style>
