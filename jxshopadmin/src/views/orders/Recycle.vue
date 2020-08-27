<template>
<div class='recycle'>
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>订单列表</span>
            <div>
                <el-button type="primary" round>导出数据</el-button>
            </div>
        </div>
        <div class="ssrq">
              <div>
                  <el-input
                      placeholder="请输入内容"
                      clearable
                      style="height:40px;width:243px">
                  </el-input>
                <el-button class="iconfont icon-fangdajing" plain></el-button>
            </div>
            
            <div class="block">
                <el-date-picker
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </div>
        </div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
            prop="no"
            label="订单号"
            width="110">
            </el-table-column>
            <el-table-column
            prop="add_time"
            label="下单时间"
            width="110">
            </el-table-column>
            <el-table-column
            prop="username"
            label="下单人"
            width="110">
            </el-table-column>
            <el-table-column
            prop="consignee"
            label="收货人"
            width="110">
            </el-table-column>
            <el-table-column
            prop="order_amount"
            label="总金额"
            width="110">
            </el-table-column>
            <el-table-column
            prop="order_status"
            label="订单状态"
            width="110">
            <!-- <template slot-scope="type">
              <el-tag type="success" v-if="type.row.parent_id == 0">一级标签</el-tag>
              <el-tag type="warning" v-if="type.row.parent_id == 1">二级标签</el-tag>
              <el-tag type="info" v-if="type.row.parent_id == 2">三级标签</el-tag>
            </template> -->
            <template slot-scope="item">
                        <el-tag v-bind:type="item.row.order_status | elTagTypeFilter">{{item.row.order_status | orderStatusFilter}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
            prop="shipping_status"
            label="支付状态"
            width="110">
                <template slot-scope="item">
                        <el-tag v-bind:type="item.row.pay_status | elTagTypeFilter">{{item.row.pay_status | payStatusFilter}}</el-tag>
                    </template>
            </el-table-column>
            <el-table-column
            prop="pay_status"
            label="配送状态"
            width="110">
                <template slot-scope="item">
                        <el-tag v-bind:type="item.row.shipping_status | elTagTypeFilter">{{item.row.shipping_status | shippingStatusFilter}}</el-tag>
                    </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagetotal">
        </el-pagination>
    </el-card>
</div>
</template>
<script>
import{
    getOrdersIndexApi
}from '@/api'
export default {
    created(){
        console.log(111);
        this.initData()
    },
    methods:{
        initData(){
            getOrdersIndexApi({
                order_sn:this.order_sn,
                uname:this.uname,
                consignee:this.consignee,
                pagenum: this.pagenum,
                pagesize: this.pagesize,
                start_time: this.start_time,
                end_time: this.end_time,
                is_delete:this.is_delete
                })
            .then(res=>{
                console.log(res)
                this.tableData=res.data.list
                this.pagetotal = parseInt(res.data.total)
            })
        },
        djFn(id){
            console.log(id)
        },
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
            this.pagesize = val
            this.initData()
        },
        handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
            this.pagenum = val
            this.initData()
        },
  },
    data() {
      return {          
            pagenum:1,
            pagesize:10,
            pagetotal:0,
            start_time:'',
            end_time:'',
            order_sn:'',
            consignee:'',
            username:'',
            uname:'',
            is_delete:1,
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,

        tableData: []
      }
    }
  }
</script>
<style scoped>
.header{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
.block{
    display: inline-block;
}
.ssrq{
    display: flex;
    justify-content: space-between;
}
</style>