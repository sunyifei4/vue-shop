<template>
    <div class="orders">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>订单统计</span>
                <el-button type="primary" round >导出数据</el-button>
            </div>
            <div class="sd">
                <div>
                    <el-input placeholder="收货人" v-model="input3" class="input-with-select">

                    <el-button slot="append" icon="el-icon-search"></el-button>

                </el-input>
                </div>
                <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
         <div id="myChart" :style="{width: '1593px', height: '400px'}"></div>
        </el-card>
    </div>
</template>
<script>
import echarts from 'echarts'
    export default {
        data() {

            return {
                msg: 'Welcome to Your Vue.js App',
                input3: "",
                value1: "",
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                tableData: [{
                    id: "1",
                    uname: '王小虎',
                    start_time: '2020-08-21 20:06:44',
                    end_time: "2020-08-21 20:06:44",
                    order_status:"已完成",
                    shipping_status:"已发货",
                    pay_status:"已完成"


                }, {
                    id: "2",
                    uname: '王小虎',
                    start_time: '2020-08-21 20:06:44',
                    end_time: "2020-08-21 20:06:44",
                    order_status:"已完成",
                    shipping_status:"已发货",
                    pay_status:"已完成"
                }, {
                    id: "3",
                    uname: '王小虎',
                    start_time: '2020-08-21 20:06:44',
                    end_time: "2020-08-21 20:06:44",
                    order_status:"已完成",
                    shipping_status:"已发货",
                    pay_status:"已完成"
                }, {
                    id: "4",
                    uname: '王小虎',
                    start_time: '2020-08-21 20:06:44',
                    end_time: "2020-08-21 20:06:44",
                    order_status:"已完成",
                    shipping_status:"已发货",
                    pay_status:"已完成"
                }]
            }
        },
         mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: {},
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["一月","二月","三月","四月","五月","六月"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [30.00, 1836.10, 5038.00, 35, 2015.00, 553866.00]
            }]
        });
    },
            backFn(){
                this.$router.push({
                    path: '/goods'
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
    }
</script>
<style lang="scss" scoped>
    .clearfix
    {
    display:
    flex;
    justify-content:
    space-between;
    align-items:
    center;
    }
    .sd {
    display:
    flex;
    justify-content:
    space-between;
    margin-bottom:
    20px;
    }
    .input-with-select {
    width:
    300px;
    height:
    40px;
    }
    el-date-picker {
    width:
    400px;
    height:
    40px;
    }
     .block {
    float:
    right;
    margin-top:
    20px;
    background:
    #EBEEF5;
    padding:
    5px
    5px;
    width:
    100%;
    }
    .el-pagination {
    float:
    right;
    }
</style>