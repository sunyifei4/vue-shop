<template>
<div class='Cate'>
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>商品分类</span>
            <el-button type="primary" round>创建</el-button>
        </div>
        

        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="cat_id"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
            prop="cat_id"
            label="编号"
            sortable
            width="530">
            </el-table-column>
            <el-table-column
            prop="cat_name"
            label="分类名称"
            sortable
            width="530">
            </el-table-column>
            <el-table-column
            prop="level"
            label="分类层级">
                    <template slot-scope="item">
                        <el-tag v-bind:type="item.row.level | elTagTypeFilter">{{item.row.level | cateFilter}}</el-tag>
                    </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagetotal">
        </el-pagination>
        <!-- /分页 -->
    </el-card>
</div>
</template>
<script>
import{
  getIndexTypeApi
}from'@/api'
  export default {
    created(){
    console.log(111);
    this.initData()
  },
    data() {
      return {
            // 分页
            level: 3,
            pagenum: 1,
            pagesize: 5,
            pagetotal: 0,
            tableData: []
      }
    },
    methods: {
      initData(){
        getIndexTypeApi({
          pagenum:this.pagenum,
          pagesize:this.pagesize,
          level:this.level
        })
        .then(res=>{
          
          this.tableData=res.data.list
          console.log( this.tableData)
              this.pagetotal = parseInt(res.data.total)
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
<style scoped>
.header{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
</style>