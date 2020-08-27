<template>
<div class='history'>
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>访客记录</span>
        </div>
        <div class="ssrq">
            <div>
                  <el-input
                      placeholder="请输入内容"
                      v-model="search"
                      clearable
                      style="height:40px;width:243px">                      
                    <el-button @click="searchFn" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
            </div>
            
            <div class="block">
                <el-date-picker
                @change="dateSearchFn"
                v-model="value1"
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
            prop="id"
            label="编号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="city"
            label="城市"
            width="180">
            </el-table-column>
            <el-table-column
            prop="ip"
            label="登录IP"
            width="180">
            </el-table-column>
            <el-table-column
            prop="login_time"
            label="上一次登录时间">
            </el-table-column>
            <el-table-column
            prop="username"
            label="登录用户">
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableDataTotal">
        </el-pagination>
    </el-card>
</div>
</template>
<script>
import{
  getHistoryApi
}from '@/api'

export default {
  created(){
    console.log(111);
    this.initData()
  },
  methods:{
    dateSearchFn(){
      this.start_time = this.value1[0] || ''
      this.end_time = this.value1[1] || ''
      this.initData()
    },
    searchFn(){
      this.initData()
    },
    //默认数据
    initData(){
      getHistoryApi({
        pagenum:this.pagenum,
        pagesize:this.pagesize,
        start_time:this.start_time,
        end_time:this.end_time,
        uname:this.search,
      })
      .then(res=>{
        console.log(res)
        this.tableData=res.data.list
        this.tableDataTotal=parseInt(res.data.total)
      })
    },

    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pagenum=val
        this.initData()
        },
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
        tableDataTotal:0,

        pagesize:10,
        pagenum:1,
        uname:'',
        end_time:'',
        start_time:'',

        tableData: [{
          id:1,
          catename: '手机',
          state: true,
        }, {
          id:2,
          catename: '电脑',
          state: false,
        }, {
          id:3,
          catename: '袜子',
          state: true,
        }, {
          id:4,
          catename: '耳机',
          state: true,
        }],
        search: '',
        value1: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>
<style scoped>
.ssrq{
    display: flex;
    justify-content: space-between;
}
.block{
    display: inline-block;
}
</style>