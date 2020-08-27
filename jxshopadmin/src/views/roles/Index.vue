<template>
<div class="list">
    <!-- 卡片组件 -->
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>角色列表</span>
            <el-button type="primary" round @click="jump('/roles/create')">创建</el-button>
        </div>
        
        <!-- 表格 --> 
        <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            row-key="cat_id"
            style="width: 100%">
            
                <el-table-column
                prop="role_id"
                label="编号"
                width="60"
                align="center">
                </el-table-column>

                <el-table-column
                prop="role_name"
                label="角色名称"
                width="160"
                align="center">
                </el-table-column>

                <el-table-column
                prop="role_describe"
                label="角色描述"
                width="180">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="item">
                        <el-button type="primary" @click="handleAssign(item.row)" circle>分配权限</el-button>
                        <el-button type="primary" icon="el-icon-edit" circle @click="bjFn(item.row.role_id,item.row.role_name)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="deldFn(item.row.role_id)"></el-button>
                    </template>
                </el-table-column> 
                
        </el-table> 
        <!-- /表格 -->

    </el-card>
    <!-- /卡片组件 -->

    <!-- 编辑弹框 -->
    <el-dialog
        title="编辑商品类型"
        :visible.sync="isShowEditTK"
        width="30%"
        :before-close="handleClose">
            <!-- form -->
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="编号" prop="role_id">
                    <el-input type="text" v-model="ruleForm.role_id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="role_name">
                    <el-input type="text" v-model="ruleForm.role_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="role_describe">
                    <el-input type="text" v-model="ruleForm.role_describe" autocomplete="off"></el-input>
                </el-form-item>
                </el-form>
            <!-- /form -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="isShowEditTK = false">取 消</el-button>
            <el-button type="primary" @click="submitEditFn">确 定</el-button>
        </span>
        </el-dialog>


    <!-- 编辑弹框 -->
    <el-dialog title="编辑角色权限" :visible.sync="dialogFormVisible">

        <el-tree
        :data="treeData"
        v-loading="treeLoading"
        show-checkbox
        ref="tree"
        node-key="auth_id"
       :default-expanded-keys="defaultAuthIds"
       :default-checked-keys="defaultAuthIds"
        :props="defaultProps">
        </el-tree>

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAuths">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
// 导入接口

import{
    getauthIndex,
    getRolesIndexApi,
    deleteRolesDeleteApi,
    putrolesupdate,
    putRolesAssign
}from'@/api'
import {rolesApi, authsApi} from '@/api'

// 导出组件数据
export default {
    created() {
        this.initData()
    },
    methods: {
        //编辑弹框触发
        submitEditFn(){
            //隐藏弹框
            this.isShowEditTK=false,
            //异步请求
            putrolesupdate({
                role_id:this.ruleForm.role_id,
                role_name:this.ruleForm.role_name,
                role_describe:this.ruleForm.role_describe
            })
            .then(res=>{
            if(res.meta.state==200){
                this.$message.success(res.meta.msg)
                this.initData()
            }else{
                this.$message.error(res.meta.msg)
                console.log(this.ruleForm.role_id,this.ruleForm.role_name,this.ruleForm.role_describe)
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
        bjFn(roleid,rolename){
            // loading
            this.treeLoading = true
            this.ruleForm.role_id=roleid
            this.ruleForm.rolename=rolename

            //显示编辑弹框
            this.isShowEditTK=true

        },
        //删除
        deldFn(roleid){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                        //发送异步请求
                    deleteRolesDeleteApi({
                    role_id:roleid
                    }).then(res=>{
                        console.log(roleid)
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
      // 编辑
      handleAssign(row) {
            // save role_id
            this.formEditData.role_id = row.role_id
            
            // loading
            this.treeLoading = true
           
            // 异步请求获取有权限
            getauthIndex().then(res => {
                // set loading
                this.treeLoading = false
                // set data
                this.treeData = res.data

                // 默认选中已有权限 
                let tmp = row.auth_ids_son ? row.auth_ids_son.split(','): []
                this.defaultAuthIds = tmp
            })

            // 显示弹框
            this.dialogFormVisible = true
      },
      // 改变状态
      handleAuths() {
        //   this.dialogFormVisible = false
        // console.log(this.$refs.tree.getCheckedNodes());
        // console.log(this.$refs.tree.getCheckedKeys());
        let tmpIds = []
        let tmpIdsSon = []
        if (this.$refs.tree.getCheckedNodes())
        {
            this.$refs.tree.getCheckedNodes().forEach((firstItem) => {
                // console.log(firstItem)
                if (firstItem.auth_id) tmpIds.push(firstItem.auth_id)
                if (firstItem.auth_id && firstItem.auth_pid != 0) tmpIdsSon.push(firstItem.auth_id)

                if (firstItem.children)
                {
                    firstItem.children.forEach((twoItem) => {
                            if (twoItem.auth_id) tmpIds.push(twoItem.auth_id)
                            if (twoItem.auth_id && twoItem.auth_pid != 0) tmpIdsSon.push(twoItem.auth_id)
                    })
                }
            })
        }
        // console.log(tmpIds)
        // console.log([...new Set(tmpIds)])
        // console.log([...new Set(tmpIdsSon)])
        
        // set loading
        this.treeLoading = false
        // set ajax
        let auth_ids = [...new Set(tmpIds)].join(',')
        let auth_ids_son = [...new Set(tmpIdsSon)].join(',')
        putRolesAssign({
            role_id:this.formEditData.role_id,
            auth_ids,
            auth_ids_son,
        })
        .then(res => {
            // loading
            this.loading = false
            // if
            if (res.meta.state == 200)
            {
                this.$message.success('操作成功')
                this.initData()
                this.dialogFormVisible = false
            } else {
                this.$message.error(res.meta.msg)
            }
        })
      },
      // 初始化数据
      initData() {
          // loading
          this.loading = true
          // data
          getRolesIndexApi()
          .then(res => {
              // loading
              this.loading = false
              // data
              this.tableData = res.data
          })
      },
      // 切换状态
      handleChange(state, row) {
        // console.log(state, row.cat_id)
        // loading
        this.loading = true
        // send ajax
        goodsTypeApi.state({
            type_id: row.cat_id,
            state:state,
        })
        .then(res => {
            if (res.meta.state == 200)
            {
                this.$message.success(res.meta.msg);
            } else {
                // tips
                this.$message.error(res.meta.msg);
            }
            
            // loading
            this.loading = false
        })
      }
    },
    data() 
    {
        return {
            rules:{
                //键 ruleForm里面的键
                //值 数组里面是一个个对象 复制 
                role_id:[
                    {required:true,message:'请输入编号',trigger:'blur'},
                ],
                role_name:[
                    {required:true,message:'角色名称',trigger:'blur'},
                ]
            },
            //表单编辑弹框隐藏显示
            isShowEditTK:false,
            //表单编辑数据
            ruleForm:{
                role_id:'',
                role_name:'',
                role_describe:''
            },
            // 默认角色权限选中
            defaultAuthIds: [],
            // 编辑
            formLabelWidth: '120px',
            dialogFormVisible: false,
            formEditData: {
                role_id: 0
            },
            // 默认数据
            loading: false,
            tableData: [],
            // 权限树数据
            treeLoading: false,
            treeData: [],
            // 权限树数据字段声明
            defaultProps: {
                children: 'children',
                label: 'auth_name'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.list {

    // 卡片组件
    .el-card 
    {
        // 头部
        .header .el-button {
            float:right;
            margin-top: -10px;
        }

        // 筛选
        .filter {
            margin-bottom: 20px;
            overflow: hidden;
            
            // 搜索框
            .el-input {
                width: 300px;
                float: left;
            }
            
            // 日期
            .el-date-editor {float: right;}
        } 
    }

    // 分页
    .el-pagination {
        width: 100%;
        padding: 10px 0px;
        background: #EBEEF5;
        text-align: right;
        margin-top: 10px;
        padding-right: 10px;    
        box-sizing:border-box;
    }
}
</style>