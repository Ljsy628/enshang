
<template>
    <div>
        <!-- 顶部筛选 -->
        <div class="row">
            <div class="row col-md-5">
                <div class="col-md-2"><h5 class="title TimePickerTitle">提现日期</h5></div>
                <div class="col-md-10">
                    <fg-input>
                        <el-date-picker
                            v-model="dateTimePicker"
                            type="datetimerange"
                            placeholder="选择日期"
                            :picker-options="pickerOptions1">
                        </el-date-picker>
                    </fg-input>
                </div>
            </div>
            <div class="row col-md-3">
                <div class="col-md-4 StatusPickerTitle"><h5 class="title TimePickerTitle">提现状态</h5></div>
                <div class="col-md-8">
                    <el-select class=""
                            size="large"
                            placeholder="Single Select"
                            v-model="selects.simple">
                        <el-option v-for="option in selects.countries"
                                    class=""
                                    :value="option.value"
                                    :label="option.label"
                                    :key="option.label">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="col-md-3 BankCardTitle">
                <fg-input label="银行名称"
                            type="text"
                            class="row"
                            labelClasses="col-md-3 col-12 BCM_fontHeight"
                            inputClasses="col-md-9 col-12"
                            placeholder="请输入银行名称">
                </fg-input>
            </div>
            <div class="col-md-1">
                <l-button type="default" wide>查询</l-button>&nbsp;
            </div>
        </div>
        <!-- 主页数据列表 -->
        <el-table class="table-striped" :data="tableData">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="DateOfPresentation" label="提现日期"></el-table-column>
            <el-table-column prop="AmountOfPresentation" label="提现金额"></el-table-column>
            <el-table-column prop="BankAndBranchOfPresentation" label="提现银行及分行名称"></el-table-column>
            <el-table-column prop="CardNumberOfPresentation" label="提现银行卡号"></el-table-column>
            <el-table-column prop="StatusOfPresentation" label="提现状态"></el-table-column>
        </el-table>
        <!-- 底部分页展示 -->
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
    </div>
</template>
<script>
    import { Table, TableColumn, DatePicker, Select, Option, TimeSelect, Tag, Input, Button,} from "element-ui";
    import LSwitch from "src/components/Switch.vue";
    import {Pagination as LPagination} from 'src/components/index';
    import users from '../Tables/users';
    import { FormGroupInput as FgInput } from 'src/components/index';
    export default {
        components: {
            LSwitch,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
             LPagination,
            [Select.name]: Select,
            [Option.name]: Option,
            [DatePicker.name]: DatePicker,
            FgInput,
            [TimeSelect.name]: TimeSelect,
            [Tag.name]: Tag,
            [Input.name]: Input,
            [Button.name]: Button,
            [Option.name]: Option,
            [Select.name]: Select,
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
            }
        },
        data() {
            return {
                pagination: {
                    perPage: 5,
                    currentPage: 1,
                    perPageOptions: [5, 10, 25, 50],
                    total: 0
                },
                dateTimePicker: '',
                searchQuery: '',
                propsToSearch: ['name', 'email', 'age'],
                tableData: [
                    {
                        DateOfPresentation: '2017-12-22 12:00:00',
                        AmountOfPresentation: '10.000.00',
                        BankAndBranchOfPresentation: '浦发银行普陀支行',
                        CardNumberOfPresentation: '123****456',
                        StatusOfPresentation: '未到账',
                    },{
                        DateOfPresentation: '2017-12-22 12:00:00',
                        AmountOfPresentation: '10.000.00',
                        BankAndBranchOfPresentation: '浦发银行普陀支行',
                        CardNumberOfPresentation: '123****456',
                        StatusOfPresentation: '未到账',
                    },{
                        DateOfPresentation: '2017-12-22 12:00:00',
                        AmountOfPresentation: '10.000.00',
                        BankAndBranchOfPresentation: '浦发银行普陀支行',
                        CardNumberOfPresentation: '123****456',
                        StatusOfPresentation: '未到账',
                    },
                ],
                pickerOptions1: {
                    shortcuts: [{
                        text: 'Today',
                        onClick (picker) {
                        picker.$emit('pick', new Date())
                        }
                    },
                    {
                        text: 'Yesterday',
                        onClick (picker) {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24)
                        picker.$emit('pick', date)
                        }
                    },
                    {
                        text: 'A week ago',
                        onClick (picker) {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', date)
                        }
                    }]
                },
                selects: {
                simple: '',
                countries: [
                            {value: 'Bahasa Indonesia', label: 'Bahasa Indonesia'},
                            {value: 'W">中文 (繁體)', label: 'W">中文 (繁體)'},
                            {value: '日本語', label: '日本語'},
                            {value: '한국어', label: '한국어'}
                            ],
                multiple: 'ARS'
                },
            }
        }
    }
</script>
<style>
    .TimePickerTitle{
        line-height: 40px;
    }
    .StatusPickerTitle{
        text-align: right;
    }
    .BankCardTitle{
        line-height: 40px;
    }
</style>
