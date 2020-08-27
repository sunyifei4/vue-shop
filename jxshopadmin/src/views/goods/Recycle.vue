<template>
    <div class="goods">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品列表</span>
                <el-button type="primary" round @click='createFn'>创建</el-button>
            </div>
            <div class="sd">
                <el-input placeholder="请输入商品名称" v-model="search" class="input-with-select">

                    <el-button slot="append" icon="el-icon-search"></el-button>

                </el-input>
                <el-date-picker
                    @change="changeDate" 
                    v-model="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>

             <el-table :data="tableData" border stripe style="width: 100%;">
                <el-table-column prop="goods_id" label="编号" width="180">
                </el-table-column>
                <el-table-column prop="cat_name" label="分类名称" width="180">
                </el-table-column>
                <el-table-column label="图片" width="100">
                    <template slot-scope="item">
                        <img :src="'http://tmp00001.zhaodashen.cn/'+item.row.goods_img" width="80" height="80" />
                    </template>
                </el-table-column>
                <el-table-column label="标题"  width="270" align="left">
                    <template slot-scope="item">
                        <el-tooltip class="item" effect="dark" v-bind:content="item.row.goods_name" placement="top-start">
                         <span>{{item.row.goods_name | substrFilter}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_number" label="库存" width="80" align="left">
                </el-table-column>
                <el-table-column prop="market_price" label="价格" width="90" align="left">
                </el-table-column>
                <el-table-column prop="shop_price" label="促销价" width="90" align="left">
                </el-table-column>
                <el-table-column prop="add_time" label="创建于" width="180" align="left">
                </el-table-column>
                <el-table-column label="上架" width="60" align="center">
                    <template slot-scope="item">
                        <el-switch 
                            @change="handleChange($event,item.row, 'is_sell')"
                            v-model="item.row.is_sell"
                            active-value="1"
                            inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="热卖" width="60" align="center">
                    <template slot-scope="item">
                        <el-switch
                            @change="handleChange($event,item.row, 'is_hot')"
                            v-model="item.row.is_hot"
                            active-value="1"
                            inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="推荐" width="60" align="center">
                    <template slot-scope="item">
                        <el-switch
                            @change="handleChange($event,item.row, 'is_best')"
                            v-model="item.row.is_best"
                            active-value="1"
                            inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="新品" width="100">
                    <template slot-scope="item">
                        <el-switch
                            @change="handleChange($event,item.row, 'is_new')"
                            v-model="item.row.is_new"
                            active-value="1"
                            inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="110" >
                    <template slot-scope="item">
                        <el-button type="primary" icon="el-icon-edit" circle></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column> 
            </el-table>
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagenum"
                    :page-sizes="[5, 10, 20, 30]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagetotal">
                </el-pagination>
            </div>
        </el-card>
         
    </div>
</template>
<script>
import{
    getGoodsIndex,
    postGoodsState
    }from'@/api'
    export default {
        created() {
            this.initData()
        },
        data() {

            return {
                // 搜索
                search: '',
                date: [],
                start_time: '',
                end_time: '',
                // 分页
                pagenum: 1,
                pagesize: 5,
                pagetotal: 100,
                // 默认数据
                tableData: [],
                is_delete:1
            }
        },
        methods: {
            // 切换状态
            handleChange(state, row, type) {
                // console.log(state, row.cat_id)
                // loading
                this.loading = true
                // send ajax
                postGoodsState({
                    goods_id: row.goods_id,
                    state:state,
                    key: type
                })
                .then(res => {
                    if (res.meta.state == 200)
                    {
                        this.$message.success(res.meta.msg);
                    } else {
                        // tips
                        this.$message.error(res.meta.msg);
                    }
                    
                    // loading
                    this.loading = false
                })
            },
            // 日期发生改变
            changeDate() {
                this.start_time = this.date ? this.date[0] : ''
                this.end_time = this.date ? this.date[1] : ''
                this.initData()
            },
            // 初始化数据
            initData() {
                // loading
                this.loading = true
                // data
                getGoodsIndex({
                    pagenum: this.pagenum,
                    pagesize: this.pagesize,
                    goods_name: this.search,
                    start_time: this.start_time,
                    end_time: this.end_time,
                    is_delete:this.is_delete
                })
                .then(res => {
                    // loading
                    this.loading = false
                    // data
                    this.tableData = res.data.list
                    this.pagetotal = parseInt(res.data.total)
                })
            },
            createFn(){
                this.$router.push({
                    path: '/goods/create'
                })
            },
            // 切换每页条数
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pagesize = val
                this.initData()
            },
            // 切换分页
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.pagenum = val
                this.initData()
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