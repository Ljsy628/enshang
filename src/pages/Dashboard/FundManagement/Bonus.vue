
<template>
    <div>
        <el-table class="table-striped" :data="tableData">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="DividendCycle" label="分红周期"></el-table-column>
            <el-table-column prop="AverageDailyBets" label="日均投注额"></el-table-column>
            <el-table-column prop="NumberOfActivities" label="周期内活动人数"></el-table-column>
            <el-table-column prop="HalfMonthLoss" label="半月亏损额"></el-table-column>
            <el-table-column prop="DividendRatio" label="分红比例"></el-table-column>
            <el-table-column prop="DividendAmount" label="分红金额"></el-table-column>
            <el-table-column prop="DividendStatus" label="分红状态"></el-table-column>
        </el-table>
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
    import { Table, TableColumn, DatePicker, Select, Option } from "element-ui";
    import LSwitch from "src/components/Switch.vue";
    import {Pagination as LPagination} from 'src/components/index'
    import users from '../Tables/users'
    export default {
        components: {
            LSwitch,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
             LPagination,
            // [Select.name]: Select,
            // [Option.name]: Option,
            // [DatePicker.name]: DatePicker,
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
                searchQuery: '',
                propsToSearch: ['name', 'email', 'age'],
                tableData: [
                    {
                        DividendCycle: '2017-12上半月',
                        AverageDailyBets: '0.00',
                        NumberOfActivities: '0',
                        HalfMonthLoss: '0.00',
                        DividendRatio: '20%',
                        DividendAmount: '0.00',
                        DividendStatus: '已到账'
                    },{
                        DividendCycle: '2017-12上半月',
                        AverageDailyBets: '0.00',
                        NumberOfActivities: '0',
                        HalfMonthLoss: '0.00',
                        DividendRatio: '20%',
                        DividendAmount: '0.00',
                        DividendStatus: '已到账'
                    },{
                        DividendCycle: '2017-12上半月',
                        AverageDailyBets: '0.00',
                        NumberOfActivities: '0',
                        HalfMonthLoss: '0.00',
                        DividendRatio: '20%',
                        DividendAmount: '0.00',
                        DividendStatus: '已到账'
                    }
                ]
            }
        }
    }
</script>