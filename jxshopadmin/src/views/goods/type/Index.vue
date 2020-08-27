<template>
<div class='goodsTypeIndex'>
    <!-- this is goodsTypeIndex -->
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>商品类型</span>
            <el-button type="primary" round @click="createFn">创建</el-button>
        </div>
        
        <!-- 
            data 指表格的数据

            留心：以前有行有列
            现在：只有列，行由数据来决定
         -->

        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
            prop="cat_id"
            label="编号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="cat_name"
            label="类型名称"
            width="180">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.state"
                        active-value="1"
                        inactive-value="0"
                        @change="changeFn(scope.row)"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-row>
                        <el-button type="primary" icon="el-icon-edit" circle>属性列表</el-button>
                        <el-button type="primary" icon="el-icon-edit" circle @click="editFn(scope.row.cat_id,scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="delFn(scope.row.cat_id)"></el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableDataTotal">
        </el-pagination>
      </el-card>

<!-- 编辑弹框 -->
    <el-dialog
  title="编辑商品类型"
  :visible.sync="isShowEditTK"
  width="30%"
  :before-close="handleClose">
    <!-- form -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类型名称" prop="type_name">
            <el-input type="text" v-model="ruleForm.type_name" autocomplete="off"></el-input>
        </el-form-item>
        </el-form>
    <!-- /form -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="isShowEditTK = false">取 消</el-button>
    <el-button type="primary" @click="submitEditFn">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
//导入接口
import {
  getGoodsTypeApi,
  deleteGoodsTypeApi,
  putGoodsTypeStateApi,
  putGoodsTypeApi
}from '@/api'



//导出数据
  export default {
    methods: {
      //编辑弹框触发
      submitEditFn(){
        //隐藏弹框
        this.isShowEditTK=false,
        //异步请求
        putGoodsTypeApi(this.ruleForm)
        .then(res=>{
          if(res.meta.state==200){
            this.$message.success(res.meta.msg)
            this.initData()
          }else{
            this.$message.error(res.meta.msg)
          }
        })
      },
      //切换状态
        changeFn(row){
          putGoodsTypeStateApi({
            type_id:row.cat_id,
            state:row.state,
          })
          .then(res=>{
            if(res.meta.state==200){
              console.log(res.meta.msg)
              this.$message.success(res.meta.msg)
              this.initData()
            }else{
              console.log(res.meta.msg)
              this.$message.error(res.meta.msg)
            }
          })
        },

        //编辑
        editFn(id,row){
            //默认数据显示
            this.ruleForm.type_name = row.cat_name
            this.ruleForm.type_id=row.cat_id
            //显示编辑弹框
            this.isShowEditTK=true
        },
        //删除
        delFn(id){
            // if(confirm('确定删除吗?')){
            //     alert('待发送异步请求'+id)
            // }


            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                    //发送异步请求
                deleteGoodsTypeApi({
                  type_id:id
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
                  }
                })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        createFn(){
            this.$router.push({path:'/goods/type/create'})
        },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
        this.pagenum=val
        this.initData()
        },
        
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      initData(){
        //显示loading
        const loading=this.$loading({
          lock:true,
          text:'Loading',
          spinner:'el-icon-loading',
          background:'rgba(0,0,0,0.7)'
        })
        //发送请求
        getGoodsTypeApi({
          //pagenum:1
          //pagenum:2
          //为了便于后期维护，以后所有接口参数
          //必须放到模型中
          pagenum:this.pagenum,
          pagesize:this.pagesize,
        })
        .then(res=>{
          //隐藏loading
          loading.close()
          // console.log(res)
          this.tableData=res.data.list
          this.tableDataTotal=parseInt(res.data.total)
        })
      }
    },
    created(){
      //getGoodsTypeApi
      //明确：逻辑上这边直接发送异步请求
      //但是：为了后期便于维护，例如分页，搜索继续发送异步请求
      //因为：是同一个接口，只不过参数不同
      //所以：封装
      this.initData()
    },
    data() {
      return {
        //列表参数
        pagenum:1,
        pagesize:2,


        //表单编辑弹框隐藏显示
          isShowEditTK:false,
            //表单编辑数据
            ruleForm:{
                type_name:''
            },
            rules:{
                //键 ruleForm里面的键
                //值 数组里面是一个个对象 复制 
                type_name:[
                    {required:true,message:'请输入类型名称',trigger:'blur'},
                    {min:2,max:6,message:'长度在2到6个字符',trigger:'blur'}
                ]
            },

          
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,

        tableDataTotal:0,

        tableData: []
      }
    }
  }
</script>
<style lang="scss" scoped>
    .goodsTypeIndex{


        //头
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        //分页
        .el-pagination{
            margin-top: 20px;
            text-align: right ;
        }
    }
</style>