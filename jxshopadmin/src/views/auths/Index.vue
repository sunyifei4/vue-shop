<template>
<div class='index'>
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>权限列表</span>
        </div>
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
            </el-input>

            <el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree">
        </el-tree>
    </el-card>
</div>
</template>
<script>
import{getauthIndex}from'@/api'
  export default {
  created() {
      this.initData()
  },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },

    methods: {
    // 默认数据
    initData() {
      getauthIndex().then(res => {
        console.log(res.data)
        this.data = res.data
      })
    },
      filterNode(value, data) {
        if (!value) return true;
        return data.auth_name.indexOf(value) !== -1;
      }
    },

    data() {
      return {
        filterText: '',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'auth_name'
        }
      };
    }
  };
</script>
<style lang="scss" scoped>
.list {
    // 卡片组件
    .el-card 
    {
        // 搜索框
        .el-input {
            margin-top: 10px;
            margin-bottom: 20px;
        }
    }
}
</style>