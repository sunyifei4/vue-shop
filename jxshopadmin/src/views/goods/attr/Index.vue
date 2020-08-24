<template>
    <div class="history">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品属性</span>
                <div>
                     <el-button type="primary" round @click='createFn()'>创建</el-button>
                <el-button type="primary" round @click='backFn()'>返回</el-button>
                </div>
               
            </div>

            <el-table :data="tableData" border stripe style="width: 100%;">
                <el-table-column prop="cat_id" label="商品类型" width="180">
                </el-table-column>
                <el-table-column prop="type_id" label="编号" width="180">
                </el-table-column>
                <el-table-column prop="attr_name" label="属性名称" width="180">
                </el-table-column>
                <el-table-column prop="state" label="数量">
                </el-table-column>
                <el-table-column prop="input_select" label="录入方式">
                </el-table-column>
                <el-table-column prop="state" label="可选值">
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
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </el-card>

    </div>
</template>
<script>
    export default {
        data() {

            return {
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                tableData: [{
                        type_id: "64",
                        type_name: "书籍",
                        state: true,
                        btns: ""
                    },
                    {
                        type_id: "65",
                        type_name: "手机",
                        state: false,
                        btns: ""
                    }, {
                        type_id: "68",
                        type_name: "笔记本",
                        state: true,
                        btns: ""
                    }, {
                        type_id: "69",
                        type_name: "水果",
                        state: false,
                        btns: ""
                    },
                ]
            }
        },
        methods: {
            attrFn() {
                this.$router.push({
                    path: '/goods/attr'
                })
            },
            backFn(){
                this.$router.push({
                    path: '/goods/type'
                })
            },
            createFn() {
                this.$router.push({
                    path: '/goods/attr/create'
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
    .sd
    {
    display:
    flex;
    justify-content:
    space-between;
    margin-bottom:
    20px;
    }
    .input-with-select
    {
    width:
    300px;
    height:
    40px;
    }
    el-date-picker
    {
    width:
    400px;
    height:
    40px;
    }
    .block
    {
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
    .el-pagination
    {
    float:
    right;
    }
</style>