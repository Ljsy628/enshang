<template>
  <div>
    <card>
      <div slot="header">
        <h4 class="card-title">代理管理</h4>
        <p class="category" @click="openModal('custom')">新增代理+</p>
        <div class="man_title">
          <div class="col-lg-2">
            <h4 class="title">选择开始时间</h4>
            <fg-input>
              <el-date-picker
                v-model="datePicker"
                type="date"
                placeholder="Date picker here"
                :picker-options="pickerOptions1"
              ></el-date-picker>
            </fg-input>
          </div>
          <div class="col-lg-2">
            <h4 class="title">选择结束时间</h4>
            <fg-input>
              <el-date-picker
                v-model="datePicker1"
                type="date"
                placeholder="Date picker here"
                :picker-options="pickerOptions1"
              ></el-date-picker>
            </fg-input>
          </div>
          <div class="col-lg-2">
            <h4 class="title">账号状态:</h4>
            <div class="col-md-12">
              <el-select
                class="select-primary"
                size="large"
                placeholder="全部"
                v-model="selects.multiple"
              >
                <el-option
                  v-for="option in selects.countries"
                  class="select-primary"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="col-lg-2">
            <h4 class="title">绑定邮箱：</h4>
            <div class="col-md-12">
              <el-select
                class="select-primary"
                size="large"
                placeholder="全部"
                v-model="selects1.multiple"
              >
                <el-option
                  v-for="option in selects1.countries"
                  class="select-primary"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label"
                ></el-option>
              </el-select>
            </div>
          </div>
          <ul class="col-lg-2 mysrc">
            <form class="navbar-form navbar-left navbar-search-form mysc" role="search">
              <div class="input-group">
                <label for="searchInput"></label>
                <i class="nc-icon nc-zoom-split"></i>
                <input id="searchInput" type="text" value class="form-control" placeholder="搜索">
              </div>
            </form>
          </ul>
          <button data-v-015de462 type="button" class="btn btn-wd btn-info mybtn">确定</button>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 minhi">
          <el-table :data="tableData"  @row-click="tabclick">
          
 <!-- <el-table-column type="index"></el-table-column> -->
            <el-table-column prop="name" label="用户名">
              
            </el-table-column>
            <el-table-column prop="proportion" label="分成比例"></el-table-column>
            <el-table-column prop="employees" label="新增下级"></el-table-column>
            <el-table-column prop="recharge" label="充值金额"></el-table-column>
            <el-table-column prop="cash" label="提现金额"></el-table-column>
            <el-table-column prop="journal" label="流水"></el-table-column>
            <el-table-column prop="earnings" label="收益"></el-table-column>
            <el-table-column prop="cash_up" label="可提现"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="lastLogin" label="最后登陆"></el-table-column>
            <el-table-column label="选项">
              <div class="td-actions" slot-scope="props">
                <a
                  v-tooltip.top-center="'View Profile'"
                  class="btn btn-info btn-link btn-xs"
                  href="#"
                  @click="handleLike(props.$index, props.row)"
                >
                  <i class="fa fa-user"></i>
                </a>
                <a
                  v-tooltip.top-center="'Edit Profile'"
                  class="btn btn-warning btn-link btn-xs"
                  @click="handleEdit(props.$index, props.row)"
                >
                  <i class="fa fa-edit"></i>
                </a>
                <a
                  v-tooltip.top-center="'Delete'"
                  class="btn btn-danger btn-link btn-xs"
                  @click="handleDelete(props.$index, props.row)"
                >
                  <i class="fa fa-close"></i>
                </a>
              </div>
            </el-table-column>
           
           
          </el-table>
        </div>
      </div>
    </card>

    <div class="myinput">
      <el-dialog center title="代理注册" width="25%" :visible.sync="modals.custom" >
        <form >
          <card>
            <div slot="header">
              <h4 class="card-title">注册</h4>
            </div>
            <div>
              <fg-input
                name="requiredText"
                label="用户名"
                v-validate="modelValidations.requiredText"
                v-model="model.requiredText"
                :error="getError('requiredText')"
              >
                <div slot="infoBlock"></div>
              </fg-input>

              <fg-input
                label="密码"
                type="password"
                name="password"
                v-validate="modelValidations.password"
                :error="getError('password')"
                v-model="model.password"
              ></fg-input>

              <fg-input
                label="重复密码"
                type="password"
                name="confirm"
                v-validate="{
            required: true,
            is:model.password
          }"
                :error="getError('confirm')"
                v-model="model.confirmPassword"
              ></fg-input>
              <fg-input
                name="requiredText1"
                label="昵称"
                v-validate="modelValidations.requiredText1"
                v-model="model.coolname"
                :error="getError('requiredText1')"
              >
                <div slot="infoBlock"></div>
              </fg-input>
              <div class="col-md-12">
                <h4 class="title">分成比例</h4>
                <el-slider class="slider-success" v-model="sliders.simple" max="50"></el-slider>
                <br>
              </div>
              <!-- <fg-input>
          <checkbox v-model="model.subscribe"
                    name="subscribe">Subscribe to newsletter
          </checkbox>
              </fg-input>-->
            </div>
            <div class="card-footer text-right">
              <button
                type="submit"
                @click.prevent="validate"
                class="btn btn-fill btn-info btn-wd"
              >注册</button>
            </div>
          </card>
        </form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  Table,
  TableColumn,
  DatePicker,
  Select,
  Option,
  Dialog,
  MessageBox,Slider
} from "element-ui";
import LSwitch from "src/components/Switch.vue";
export default {
  components: {
    [DatePicker.name]: DatePicker,
    LSwitch,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Select.name]: Select,
    [Option.name]: Option,
    [Dialog.name]: Dialog,
    [Slider.name]: Slider,
  },
  created(){
    this.tableData.map((d,idx)=>{
      d.idx = idx
      })
      console.log(this.tableData)
  },
  data() {
    return {
        cTABdata:[[{
          	name: "章三",
          	proportion: "50%",
          	employees: "50",
          	active: false,
          	news: "三个",
          	recharge: "2000",
          	cash: "1000",
          	journal: "2000",
          	earnings: "200",
          	cash_up: "1000",
          	status: "正常",
          	lastLogin: "2018-12-20",},{
          	name: "章4",
          	proportion: "50%",
          	employees: "50",
          	active: false,
          	news: "三个",
          	recharge: "2000",
          	cash: "1000",
          	journal: "2000",
          	earnings: "200",
          	cash_up: "1000",
          	status: "正常",
          	lastLogin: "2018-12-20",
        },
        ],[{
          	name: "李三",
          	proportion: "50%",
          	employees: "50",
          	active: false,
          	news: "三个",
          	recharge: "2000",
          	cash: "1000",
          	journal: "2000",
          	earnings: "200",
          	cash_up: "1000",
          	status: "正常",
          	lastLogin: "2018-12-20",
        },{
          	name: "李4",
          	proportion: "50%",
          	employees: "50",
          	active: false,
          	news: "三个",
          	recharge: "2000",
          	cash: "1000",
          	journal: "2000",
          	earnings: "200",
          	cash_up: "1000",
          	status: "正常",
          	lastLogin: "2018-12-20",
        },
        ],
      ],
      model: {
        email: "",
        password: "",
        confirmPassword: "",
        subscribe: false,
        coolname: ""
      },
      gridData: [
        {
          date: "2016-05-02",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District"
        },
        {
          date: "2016-05-04",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District"
        },
        {
          date: "2016-05-01",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District"
        },
        {
          date: "2016-05-03",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District"
        }
      ],
      modals: {
        custom: false
      },
      modelValidations: {
        requiredText1:{
            required: true
        },
        requiredText: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          min: 5
        }
      },
      switches: {},
      sliders: {
          simple: 30,
          rangeSlider: [20, 50]
      },
      selects: {},
      tags: {},

      datePicker: "",
      datePicker1: "",

      selects: {
        simple: "",
        countries: [
          { value: "1", label: "已启用" },
          { value: "2", label: "未启用" },
          { value: "3", label: "已停用" }
        ],
        multiple: "全部"
      },
      selects1: {
        simple: "",
        countries: [
          { value: "1", label: "已启用" },
          { value: "2", label: "未启用" },
          { value: "3", label: "已停用" }
        ],
        multiple: "全部"
      },
      dateTimePicker: "",
      pickerOptions1: {
        shortcuts: [
          {
            text: "Today",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "Yesterday",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "A week ago",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
      ,
      tableData: [
        {
          name: "章三",
          proportion: "50%",
          employees: "50",
          active: false,
          news: "三个",
          recharge: "2000",
          cash: "1000",
          journal: "2000",
          earnings: "200",
          cash_up: "1000",
          status: "正常",
          lastLogin: "2018-12-20",
           
        }
      ]
    };
  },

  methods: {
    
    tabclick(row, event, column){
      // console.log(this.tableData.push(this.cTABdata))
      this.cTABdata.map((d,idx)=>{
        d.map((c,idd)=>{
        
          this.tableData.push(c)
            console.log(c)
        })
      })
      // this.cTABdata.map((d,index)=>{
      //   console.log(d[index])
      // })
      //   this.tableData.map((d,idx)=>{
      // d.idx = idx
      // })
    },
    getError(fieldName) {
      // console.log(this.errors);
      return this.errors.first(fieldName);
    },
    validate() {
      // console.log($validator)
      this.$validator.validateAll().then(isValid => {
        console.log(isValid);
        this.$emit("on-submit", this.registerForm, isValid);
      });
    },
    openModal(name) {
      this.modals[name] = true;
    },
    closeModal(name) {
      this.modals[name] = false;
    },
    handleInputConfirm() {
      let inputValue = this.tags.inputValue;
      if (inputValue) {
        this.tags.dynamicTags.push(inputValue);
      }
      this.tags.inputVisible = false;
      this.tags.inputValue = "";
    },
    handleLike(index, row) {
      alert(`Your clicked on Like button`);
    },
    handleEdit(index, row) {
      alert(`Your want to edit ${row.name}`);
    },
    handleDelete(index, row) {
      alert(`Your want to delete ${row.name}`);
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Total";
        } else if (index < columns.length - 1) {
          sums[index] = "";
        } else {
          let sum = 0;
          this.productsTable.forEach(obj => {
            sum += obj.quantity * obj.price;
          });
          sums[index] = `€ ${sum}`;
        }
      });
      return sums;
    }
  }
};
</script>
<style>
.minhi{
  min-height: 400px
}
.ct1{width: 500px;}
.category:hover {
  cursor: pointer;
  color: #000;
}
.mybtn {
  width: 10%;
  height: 40px;
  margin-top: 74px;
}
/* .mysrc{border: 1px solid #666} */
.mysc {
  margin-top: 75px;
  border: 1px solid #ccc;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.man_title {
  display: flex;
  flex-direction: row;
}
.extended-forms .el-select {
  width: 100%;
  margin-bottom: 30px;
}

.extended-forms .progress {
  margin-bottom: 30px;
}
</style>
