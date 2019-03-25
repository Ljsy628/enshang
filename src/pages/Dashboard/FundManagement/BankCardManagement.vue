
<template>
    <div>
        <!-- 表单数据 -->
        <el-table class="table-striped" :data="tableData">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="BankCardNumber" label="银行卡号"></el-table-column>
            <el-table-column prop="AccountHolder" label="开户人"></el-table-column>
            <el-table-column prop="BankName" label="银行名称"></el-table-column>
            <el-table-column prop="BankBranch" label="支行名称"></el-table-column>
            <el-table-column prop="BankAddress" label="开户行地址"></el-table-column>
            <el-table-column label="操作">
                <template>
                    <a class="btn-info btn-simple btn-link" @click="ModifyCardNumber('confirm')"><i class="fa fa-edit"></i>修改卡号</a>
                </template>
            </el-table-column>
        </el-table>
        <!-- 底部的分页展示 -->
        <div slot="footer" class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
            <div class="">
            <p class="card-category">数据展示： {{from + 1}} ~ {{to}} 总共数据： {{total}} 条</p>
            </div>
            <l-pagination class="pagination-no-border"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="pagination.total">
            </l-pagination>
        </div>
        <!-- 弹窗：修改卡号信息 -->
        <el-dialog
            center
            :before-close="handleClose"
            title="新增银行卡"
            :visible.sync="modals.confirm">
            <span>
                <form action="#" method="#" @submit.prevent>
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                        <fg-input label="银行名称"
                                    type="text"
                                    class="row"
                                    labelClasses="col-md-3 col-12 BCM_fontHeight"
                                    inputClasses="col-md-9 col-12 BCM_bgImg"
                                    placeholder="请输入银行名称">
                        </fg-input>
                        </div>
                        <div class="col-md-5">
                            <fg-input label="支行名称:"
                                        type="text"
                                        class="row"
                                        labelClasses="col-md-3 col-12 BCM_fontHeight"
                                        inputClasses="col-md-9 col-12"
                                        placeholder="请输入支行名称">
                            </fg-input>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                        <fg-input label="银行账号"
                                    type="text"
                                    class="row"
                                    labelClasses="col-md-3 col-12 BCM_fontHeight"
                                    inputClasses="col-md-9 col-12"
                                    placeholder="请输入银行账号">
                        </fg-input>
                        </div>
                        <div class="col-md-5">
                            <fg-input label="开户人:"
                                        type="text"
                                        class="row"
                                        labelClasses="col-md-3 col-12 BCM_fontHeight"
                                        inputClasses="col-md-9 col-12"
                                        placeholder="请输入开户人">
                            </fg-input>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                     <div class="row">
                         <div class="col-md-1"></div>
                        <div class="col-md-2 CitySelectTitle">开户行地址</div>
                        <div class="col-md-9 CitySelect">
                            <v-distpicker class="CitySelectPicker" :placeholders="placeholders"></v-distpicker>
                        </div>
                        <!-- <div class="col-md-1"></div> -->
                    </div>
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                        <fg-input label="地址行一"
                                    type="text"
                                    class="row"
                                    labelClasses="col-md-2 col-12 BCM_fontHeight"
                                    inputClasses="col-md-10 col-12 BCM_bgImg"
                                    placeholder="请手动输入地址">
                        </fg-input>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                        <fg-input label="地址行二"
                                    type="text"
                                    class="row"
                                    labelClasses="col-md-2 col-12 BCM_fontHeight"
                                    inputClasses="col-md-10 col-12 BCM_bgImg"
                                    placeholder="请手动输入地址">
                        </fg-input>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                </form>
            </span>
            <span slot="footer" class="dialog-footer">
              <button class="btn btn-danger" @click="closeModal('confirm')">取消</button>&nbsp;
              <button class="btn btn-success" @click="closeModal('confirm')">确认</button>
            </span>
          </el-dialog>
    </div>
</template>
<script>
    import VDistpicker from 'v-distpicker'
    // import Fuse from 'fuse.js'  
    import { Table, TableColumn, DatePicker, Select, Option, Dialog, MessageBox} from "element-ui";
    import LSwitch from "src/components/Switch.vue";
    import {Pagination as LPagination} from 'src/components/index'
    import users from '../Tables/users'
    import swal from 'sweetalert2'
    import Vue from 'vue'

    Vue.prototype.$confirm = MessageBox.confirm
    export default {
        components: {
            VDistpicker,
            LSwitch,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            LPagination,
            [Select.name]: Select,
            [Option.name]: Option,
            [Dialog.name]: Dialog,

        },
        computed: {
            // 分页功能
            pagedData () {
                return this.tableData.slice(this.from, this.to)
            },
            queriedData () {
                let result = this.tableData
                if (this.searchQuery !== '') {
                    result = this.fuseSearch.search(this.searchQuery)
                    this.pagination.total = result.length
                }
                return result.slice(this.from, this.to)
            },
            to () {
                let highBound = this.from + this.pagination.perPage
                if (this.total < highBound) {
                highBound = this.total
                }
                return highBound
            },
            from () {
                return this.pagination.perPage * (this.pagination.currentPage - 1)
            },
            total () {
                this.pagination.total = this.tableData.length
                return this.tableData.length
            },
        },
        data() {
            return {
                pagination: {
                perPage: 5,
                currentPage: 1,
                perPageOptions: [5, 10, 25, 50],
                total: 0
                },
                searchQuery: '',
                propsToSearch: ['name', 'email', 'age'],
                //弹窗功能
                modals: {
                    // basic: false,
                    // centered: false,
                    // custom: false,
                    confirm: false//控制弹窗显示
                },
                tableData: [
                    {
                        id:1,
                        BankCardNumber: '123****456',
                        AccountHolder: '王棋牌',
                        BankName: '招商银行',
                        BankBranch: '招商银行上海支行',
                        BankAddress: '上海市陆家嘴111号',
                    },
                    {
                        id:2,
                        BankCardNumber: '123****456',
                        AccountHolder: '王棋牌',
                        BankName: '招商银行',
                        BankBranch: '招商银行上海支行',
                        BankAddress: '上海市陆家嘴111号',
                    },
                    {
                        id:2,
                        BankCardNumber: '123****456',
                        AccountHolder: '王棋牌',
                        BankName: '招商银行',
                        BankBranch: '招商银行上海支行',
                        BankAddress: '上海市陆家嘴111号',
                    },
                    {
                        id:2,
                        BankCardNumber: '123****456',
                        AccountHolder: '王棋牌',
                        BankName: '招商银行',
                        BankBranch: '招商银行上海支行',
                        BankAddress: '上海市陆家嘴111号',
                    },
                    {
                        id:2,
                        BankCardNumber: '123****456',
                        AccountHolder: '王棋牌',
                        BankName: '招商银行',
                        BankBranch: '招商银行上海支行',
                        BankAddress: '上海市陆家嘴111号',
                    },
                    {
                        id:2,
                        BankCardNumber: '123****456',
                        AccountHolder: '王棋牌',
                        BankName: '招商银行',
                        BankBranch: '招商银行上海支行',
                        BankAddress: '上海市陆家嘴111号',
                    },
                    {
                        id:2,
                        BankCardNumber: '123****456',
                        AccountHolder: '王棋牌',
                        BankName: '招商银行',
                        BankBranch: '招商银行上海支行',
                        BankAddress: '上海市陆家嘴111号',
                    },
                    {
                        id:2,
                        BankCardNumber: '123****456',
                        AccountHolder: '王棋牌',
                        BankName: '招商银行',
                        BankBranch: '招商银行上海支行',
                        BankAddress: '上海市陆家嘴111号',
                    },
                    {
                        id:2,
                        BankCardNumber: '123****456',
                        AccountHolder: '王棋牌',
                        BankName: '招商银行',
                        BankBranch: '招商银行上海支行',
                        BankAddress: '上海市陆家嘴111号',
                    },
                ],
                placeholders: {
                    province: '------- 省 --------',
                    city: '--- 市 ---',
                    area: '--- 区 ---',
                }
            }
        },
        methods:{
            //点击修改卡号操作
            ModifyCardNumber (name) {
                this.modals[name] = true
                console.log("==========")
                console.log(name)
            },
            closeModal (name) {
                this.modals[name] = false
            },
            async handleClose (done) {
                try {
                await this.$confirm('关闭修改页面?')
                done()
                } catch (e) {}
            },
        }
    }
</script>
<style>
  .el-dialog {
    width: 50%;
  }
  @media (max-width: 800px){
    .el-dialog{
      width: 90%
    }
  }
  .BCM_fontHeight{
      line-height: 40px;
  }
  .BCM_bgImg{
      background-image: none !important;
  }
  .CitySelectTitle{
      line-height: 40px;
  }
  .CitySelect{
      height: 40px;
      margin-bottom: 20px;
  }
  .CitySelectPicker select{
      /* float: left; */
      margin-right: 20px;
  }
</style>