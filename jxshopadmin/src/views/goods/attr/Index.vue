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
                <el-table-column prop="cat_name" label="商品类型" width="180">
                </el-table-column>
                <el-table-column prop="attr_id" label="编号" width="180">
                </el-table-column>
                <el-table-column prop="attr_name" label="属性名称" width="180">
                </el-table-column>
                <el-table-column prop="only_many" label="数量">
                    <template slot-scope="item">
                        {{item.row.only_many == 'only' ? '单选属性': '多选属性'}}
                    </template>
                </el-table-column>
                <el-table-column prop="input_select" label="录入方式">
                    <template slot-scope="item">
                        {{item.row.input_select == 'input' ? '手工录入': '下拉选择'}}
                    </template>
                </el-table-column>
                <el-table-column prop="attr_values" label="可选值">
                </el-table-column>
                <el-table-column prop="btns" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="editFn(scope.row)" circle></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="delFn(scope.row.attr_id)" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                :current-page="currentPage4" 
                :page-sizes="[10, 20, 30, 40]" 
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper" 
                :total="tableDataTotal">
                </el-pagination>
            </div>

            <!-- 编辑弹框 -->
                <el-dialog
            title="请修改商品属性"
            :visible.sync="isShowEditTK"
            width="30%"
            :before-close="handleClose">
                <!-- form -->
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品类型" prop="cat_id">
                        <el-input type="text" v-model="ruleForm.cat_id" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="编号" prop="attr_id">
                        <el-input type="text" v-model="ruleForm.attr_id" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="属性名称" prop="attr_name">
                        <el-input type="text" v-model="ruleForm.attr_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="only_many">
                        <el-input type="text" v-model="ruleForm.only_many" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="录入方式" prop="input_select">
                        <el-input type="text" v-model="ruleForm.input_select" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="可选值" prop="attr_values">
                        <el-input type="text" v-model="ruleForm.attr_values" autocomplete="off"></el-input>
                    </el-form-item>
                    </el-form>
                <!-- /form -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowEditTK = false">取 消</el-button>
                <el-button type="primary" @click="submitEditFn">确 定</el-button>
            </span>
            </el-dialog>

        </el-card>
    </div>
</template>
<script>
import{
    getGoodsAttrApi,
    deleteGoodsAttrApi,
    putGoodsAttrupdate
}from '@/api'
    export default {
        created(){
            this.initdata()
        },
        data() {

            return {
                rules:{
                    cat_id:[],
                    attr_id:[],
                    attr_name:[],
                    only_many:[],
                    input_select:[],
                    attr_values:[],
                },
                //表单编辑弹框隐藏显示
                isShowEditTK:false,
                pagenum:1,
                pagesize:10,
                tableDataTotal:0,
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                tableData: [],
                ruleForm:{
                    cat_id:'',
                    attr_id:'',
                    attr_name:'',
                    only_many:'',
                    input_select:'',
                    attr_values:'',
            },
            }
        },
        methods: {
            //编辑弹框触发
            submitEditFn(){
                //隐藏弹框
                this.isShowEditTK=false,
                //异步请求
                putGoodsAttrupdate(this.ruleForm)
                .then(res=>{
                if(res.meta.state==200){
                    this.$message.success(res.meta.msg)
                    this.initData()
                }else{
                    this.$message.error(res.meta.msg)
                }
                })
            },
            handleClose(done) {
                    this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
                },
            editFn(bzd){
                this.ruleForm.cat_id=parseInt(bzd.cat_id),
                this.ruleForm.attr_id=parseInt(bzd.attr_id),
                this.ruleForm.attr_name=bzd.attr_name,
                this.ruleForm.only_many=bzd.only_many,
                this.ruleForm.input_select=bzd.input_select,
                this.ruleForm.attr_values=bzd.attr_values
                
                console.log(this.ruleForm)
                //显示编辑弹框
                this.isShowEditTK=true
            },
            delFn(index){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                                //发送异步请求
                            deleteGoodsAttrApi({
                            attr_id:index
                            }).then(res=>{
                            if(res.meta.state==200){

                                //成功在提示
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });

                                this.initData()
                            }else{
                                this.$message.error(res.meta.msg)
                                console.log(res.meta)
                            }
                            })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
            },

            initdata(){
                getGoodsAttrApi({
                    pagenum:this.pagenum,
                    pagesize:this.pagesize,
                    type_id:this.type_id
                })
                .then(res=>{
                    console.log(res)
                    this.tableData=res.data.list
                    this.tableDataTotal=parseInt(res.data.total)
                })
            },
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
                this.pagenum=val
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