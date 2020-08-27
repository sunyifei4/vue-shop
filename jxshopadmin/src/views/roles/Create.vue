<template>
    <div class="rolescreate">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>角色创建</span>
                <el-button type="primary" round @click='backFn()'>返回</el-button>
            </div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="角色名称" prop="role_name">
                    <el-input type="text" v-model="ruleForm.role_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="role_describe">
                    <el-input type="password" v-model="ruleForm.role_describe" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item class="btnform">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </el-card>

    </div>
</template>
<script>
import{postRolesCreateApi}from'@/api'
    export default {
        data() {

            return {
                value: [],
                prop:{
                    role_name:[],
                    role_describe:[]
                },
                ruleForm: {
                    role_name:'',
                    role_describe:'',
                },
                rules: {
                     question:[
              {required:true,message:"请选择密保问题",trigger:"blur"}
          ],
                    cat_name: [{
                            required: true,
                            message: '请输入分类名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            backFn() {
                this.$router.push({
                    path: '/roles'
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        postRolesCreateApi({
                            role_name:this.ruleForm.role_name,
                            role_describe:this.ruleForm.role_describe,
                        })
                        .then(res=>{
                            this.$router.push({
                                    path: '/users'
                                })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
    .el-cascader
    {
    float:
    left;
    }
    .el-form-item
    p
    {
    float:
    left;
    margin-left:
    50px;
    }
    .btnform
    {
    float:
    left;
    }
</style>