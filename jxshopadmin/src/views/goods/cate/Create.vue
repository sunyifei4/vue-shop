<template>
    <div class="history">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品分类</span>
                <el-button type="primary" round @click='backFn()'>返回</el-button>
            </div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input type="text" v-model="ruleForm.cat_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属分类">
                    <span>
                        <el-cascader clearable v-model="value" :options="options" @change="handleChange"></el-cascader>
                    </span>


                </el-form-item>
                <el-form-item class="beizhu">
                    <p data-v-6edbfe79="" style="font-size: 10px; color: rgb(204, 204, 204); ">备注：商品分类 一级/二级 先URL 再关键词
                        三级 先URL 再分类ID</p>
                </el-form-item>
                <el-form-item label="关键词" prop="keywords">
                    <el-input type="text" v-model="ruleForm.keywords" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="跳转" prop="url">
                    <el-input v-model.number="ruleForm.url"></el-input>
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
    export default {
        data() {

            return {
                value: [],
                options: [{
                        value: 'zhinan',
                        label: '指南',
                    },
                    {
                        value: 'zhinan',
                        label: '指南',
                        children: [{
                            value: 'zhinan',
                            label: '指南',
                            children: [{
                                value: 'zhinan',
                                label: '指南',
                            }]
                        }]
                    }
                ],

                ruleForm: {
                    cat_name: '',
                    keywords: '',
                    url: ''
                },
                rules: {
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
                    path: '/goods/cate'
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
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
    .el-cascader {
    float:
    left;
    }
    .el-form-item
    p {
    float:
    left;
    margin-left:
    50px;
    }
    .btnform {
    float:
    left;
    }
    
</style>