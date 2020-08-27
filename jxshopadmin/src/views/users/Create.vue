<template>
    <div class="usercreate">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户创建</span>
                <el-button type="primary" round @click='backFn()'>返回</el-button>
            </div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="question" label="密保问题">
                    <el-select v-model="ruleForm.question"  placeholder="请选择密保问题" style="float:left">
                        <el-option v-for="item in answer" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密保答案" prop="answer">
                    <el-input type="text" v-model="ruleForm.answer" autocomplete="off"></el-input>
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
import{
    postUsersCreate,
    getUsersIndexApi
    }from'@/api'
    export default {
        data() {

            return {
                value: [],
                options: [],
                answer:[
                    {value:'母亲的名字',label:'母亲的名字'},
                    {value:'爷爷的名字',label:'爷爷的名字'},
                    {value:'父亲出生的城市',label:'父亲出生的城市'},
                    {value:'您其中一位老师的名字',label:'您其中一位老师的名字'},
                    {value:'您个人计算机的型号',label:'您个人计算机的型号'},
                    {value:'您最喜欢的餐馆名称',label:'您最喜欢的餐馆名称'},
                    {value:'驾驶执照最后四位数字',label:'驾驶执照最后四位数字'},
                ],
                ruleForm: {
                    question: '',
                    username: '',
                    password: '',
                    answer: ''
                },
                rules: {
                    question:[{required:true,message:"请选择密保问题",trigger:"blur"}],
                    username: [{required: true,message: '请输入账号',trigger: 'blur'}],
                    password: [{required: true,message: '请输入密码',trigger: 'blur'}],
                    answer: [{required: true,message: '请输入密保答案',trigger: 'blur'}],

                }
            }
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            backFn() {
                this.$router.push({
                    path: '/users'
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        postUsersCreate({
                            username:this.ruleForm.username,
                            password:this.ruleForm.password,
                            question:this.ruleForm.question,
                            answer:this.ruleForm.answer,
                        })
                        .then(res=>{
                            if(res.meta.state == 201)
                            {
                                this.$message.success(res.meta.msg);
                                this.$router.push({path:'/users'})
                            } else {
                                this.$message.error(res.meta.msg);
                            }
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