<template>
    <div class="goods">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品列表</span>
                <el-button type="primary" round @click='createFn'>创建</el-button>
            </div>
            <div class="sd">
                <el-input placeholder="请输入商品名称" v-model="input3" class="input-with-select">

                    <el-button slot="append" icon="el-icon-search"></el-button>

                </el-input>
                <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>

             <el-table :data="tableData" border stripe style="width: 100%;">
                <el-table-column prop="cat_id" label="编号" width="180">
                </el-table-column>
                <el-table-column prop="type_id" label="分类名称" width="180">
                </el-table-column>
                <el-table-column prop="attr_name" label="图片" width="180">
                </el-table-column>
                <el-table-column prop="state" label="标题">
                </el-table-column>
                <el-table-column prop="input_select" label="库存">
                </el-table-column>
                <el-table-column prop="state" label="价格">
                </el-table-column>
                <el-table-column prop="state" label="促销价">
                </el-table-column>
                <el-table-column prop="state" label="创建于">
                </el-table-column>
                <el-table-column prop="state" label="上架">
                    <template slot-scope="item">
                        <el-switch v-model="item.row.state" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="热卖">
                    <template slot-scope="item">
                        <el-switch v-model="item.row.state" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="推荐">
                    <template slot-scope="item">
                        <el-switch v-model="item.row.state" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="新品">
                    <template slot-scope="item">
                        <el-switch v-model="item.row.state" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="btns" label="操作">
                    <template slot-scope="">
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
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
        </el-card>
         
    </div>
</template>
<script>
    export default {
        data() {

            return {
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
                    end_time: "2020-08-21 20:06:44"


                }, {
                    id: "2",
                    uname: '王小虎',
                    start_time: '2020-08-21 20:06:44',
                    end_time: "2020-08-21 20:06:44"
                }, {
                    id: "3",
                    uname: '王小虎',
                    start_time: '2020-08-21 20:06:44',
                    end_time: "2020-08-21 20:06:44"
                }, {
                    id: "4",
                    uname: '王小虎',
                    start_time: '2020-08-21 20:06:44',
                    end_time: "2020-08-21 20:06:44"
                }]
            }
        },
        methods: {
            createFn(){
                this.$router.push({
                    path: '/goods/create'
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