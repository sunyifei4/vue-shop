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
            row-key="id"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
            prop="date"
            label="编号"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="分类名称"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="分类层级">
            </el-table-column>
        </el-table>
    </el-card>
</div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
    //   load(tree, treeNode, resolve) {
    //     setTimeout(() => {
    //       resolve([
    //         {
    //           id: 31,
    //           date: '2016-05-01',
    //           name: '王小虎',
    //           address: '上海市普陀区金沙江路 1519 弄'
    //         }, {
    //           id: 32,
    //           date: '2016-05-01',
    //           name: '王小虎',
    //           address: '上海市普陀区金沙江路 1519 弄'
    //         }
    //       ])
    //     }, 1000)
    //   }
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