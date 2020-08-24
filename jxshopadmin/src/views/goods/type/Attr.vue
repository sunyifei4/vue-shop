<template>
<div class='Attr'>
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>商品分类</span>
            <div>
                <el-button type="primary" round>创建</el-button>
                <el-button type="primary" round>返回</el-button>
            </div>
        </div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
            prop="type"
            label="所属类型"
            width="100">
            </el-table-column>
            <el-table-column
            prop="id"
            label="编号"
            width="100">
            </el-table-column>
            <el-table-column
            prop="catename"
            label="类型名称"
            width="100">
            </el-table-column>
            <el-table-column
            prop="number"
            label="数量"
            width="100">
            </el-table-column>
            <el-table-column
            prop="init"
            label="录入方式"
            width="100">
            </el-table-column>
            <el-table-column
            prop="choden"
            label="可选值"
            width="100">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-row>
                        <el-button type="primary" icon="el-icon-edit" circle @click="editFn(scope.row.id,scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="delFn(scope.row)"></el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>
    </el-card>
</div>
</template>
<script>
  export default {
    methods: {
        //编辑
        editFn(id,row){
            //默认数据显示
            this.ruleForm.type_name = row.catename
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

                    //成功在提示
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
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
        console.log(`当前页: ${val}`);
        },
        
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },

    data() {
      return {

        //编辑表单弹框隐藏显示
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

        tableData: [{
          type:'书包',
          id:1,
          init:'下拉选择',
          choden:11,
          number:111,
          catename: '手机',
          state: true,
        }, {
          type:'书包',
          id:2,
          init:'下拉选择',
          choden:11,
          number:111,
          catename: '电脑',
          state: false,
        }, {
          type:'精品手机',
          id:3,
          init:'下拉选择',
          choden:11,
          number:111,
          catename: '袜子',
          state: true,
        }, {
          type:'精品手机',
          id:4,
          init:'下拉选择',
          choden:11,
          number:111,
          catename: '耳机',
          state: true,
        }]
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
</style>