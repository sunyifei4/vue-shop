<template>
<div class='goodsTypeCreate'>
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>创建商品类型</span>
            <el-button type="primary" round @click="backFn">返回</el-button>
        </div>
        
        <!-- 
            步骤1：model="fuleForm" input/checkbox...   v-model="ruleForm.键"
            步骤2：rules="rules"
            步骤3：el-form-item prop开启验证
         -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类型名称" prop="type_name">
            <el-input type="text" v-model="ruleForm.type_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </el-card>
</div>
</template>
<script>
import{
    postGoodsTypeApi,
}from '@/api'
export default {
    data(){
        return{
            //表单添加数据
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
            }
        }
    },
    methods:{
        submitForm(refName){
            //语法:this.$refs.键.validate(isSuccess=>{})
            this.$refs[refName].validate(isSuccess=>{
                if(isSuccess){
                    // alert('待发送异步请求')
                    // this.$message.success('待发送异步请求')
                    postGoodsTypeApi(this.ruleForm)
                    .then(res=>{
                        if(res.meta.state==201){
                            this.$message.success(res.meta.msg)
                            //添加成功后跳转
                            this.$router.push({path:'/goods/type'})
                        }else{
                            this.$message.error(res.meta.msg)
                        }
                    })
                }
            })
        },
        resetForm(refName){
            //语法:this.$refs.键.resetFields()
            this.$refs[refName].resetFields()
        },
        backFn(){
            this.$router.push({path:'/goods/type'})
        }
    }
}
</script>
<style lang="scss" scoped>
.goodsTypeCreate{
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>