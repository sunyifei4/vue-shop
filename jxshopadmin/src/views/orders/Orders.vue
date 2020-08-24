<template>
<div class='Orders'>
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>订单列表</span>
            <div>
                <el-button type="primary" round>导出数据</el-button>
            </div>
        </div>
        <div class="ssrq">
              <div>
                  <el-input
                      placeholder="请输入内容"
                      clearable
                      style="height:40px;width:243px">
                  </el-input>
                <el-button class="iconfont icon-fangdajing" plain></el-button>
            </div>
            
            <div class="block">
                <el-date-picker
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
            prop="type"
            label="订单号"
            width="80">
            </el-table-column>
            <el-table-column
            prop="id"
            label="下单时间"
            width="80">
            </el-table-column>
            <el-table-column
            prop="catename"
            label="下单人"
            width="80">
            </el-table-column>
            <el-table-column
            prop="number"
            label="收货人"
            width="80">
            </el-table-column>
            <el-table-column
            prop="init"
            label="总金额"
            width="80">
            </el-table-column>
            <el-table-column
            prop="choden"
            label="订单状态"
            width="110">
            <!-- <template slot-scope="type">
              <el-tag type="success" v-if="type.row.parent_id == 0">一级标签</el-tag>
              <el-tag type="warning" v-if="type.row.parent_id == 1">二级标签</el-tag>
              <el-tag type="info" v-if="type.row.parent_id == 2">三级标签</el-tag>
            </template> -->
            <el-tag>标签一</el-tag>
            </el-table-column>
            <el-table-column
            prop="choden"
            label="支付状态"
            width="110">
            <el-tag type="success">标签二</el-tag>
            </el-table-column>
            <el-table-column
            prop="choden"
            label="配送状态"
            width="110">
            <el-tag type="info">标签三</el-tag>
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
    methods:{
        djFn(id){
            console.log(id)
        },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        },
  },
    data() {
      return {          
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
.block{
    display: inline-block;
}
.ssrq{
    display: flex;
    justify-content: space-between;
}
</style>