<template>
<div class='create'>
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>创建商品属性</span>
            <el-button type="primary" round>返回</el-button>
        </div>
        <el-form ref="ruleForm" status-icon :model="ruleForm" :rules="rules" label-width="100px">
            <el-form-item label="属性名称" prop="attr_name">
                <el-input type="text" v-model="ruleForm.attr_name"></el-input>
            </el-form-item>
            <el-form-item label="所属类型" prop="cat_id">
                <el-cascader 
                        clearable 
                        :props="props"
                        v-model="ruleForm.cat_id" 
                        :options="options" 
                        @change="handleChange">
                        </el-cascader>
            </el-form-item>
            <el-form-item label="单/多选属性" prop="only_many">
                <el-radio-group v-model="ruleForm.only_many">
                <el-radio label="only">唯一</el-radio>
                <el-radio label="many">多选</el-radio>
                </el-radio-group>
            </el-form-item>



            <el-form-item label="值录入方式" prop="input_select">
                <el-radio v-model="ruleForm.input_select" label="input">手动录入</el-radio>
                <el-radio v-model="ruleForm.input_select" label="select">从下方选择</el-radio>
            </el-form-item>



            <el-form-item label="可选值" prop="attr_values" v-show="ruleForm.input_select=='select'">
                <el-input type="text" v-model="ruleForm.attr_values" placeholder="请输入可选值，多个值之间请使用英文“,”分隔开" autocomplete="off"></el-input>
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
  postGoodsAttrCreate,
  getGoodsAttrApi
  }from'@/api'
  export default {
    created(){
      this.initData()
    },
    data() {
      return {
        value:[],
        options:[],
        props: {
                label: "cat_name",
                value: "cat_id",
                },
          ruleForm: {
                cat_name:'',
                cat_id: '',
                attr_name: '',
                input_select: '',
                only_many: '',
                attr_values: '',
        },
            // 表单数据验证规则
            rules: {
                cat_id: [
                    { required: true, message: '请选择所属商品类型', trigger: 'blur' },
                ],
                attr_name: [
                    { required: true, message: '请选择属性名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                only_many: [
                    { required: true, message: '单/多选属性', trigger: 'blur' },
                ],
                input_select: [
                    { required: true, message: '请选择值录入方式', trigger: 'blur' },
                ],
            },
      }
    },
    methods: {
      initData(){
        getGoodsAttrApi({})
        .then(res=>{
          this.options=res.data.list
          console.log(this.options)
        })
      },
      postGoodsAttrCreate(){

      },
      handleChange(value) {
                console.log(value);
            },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
                if (valid) {
                    // loading 
                    this.loading = true
                    // 创建数据
                    postGoodsAttrCreate({
                      attr_name:this.ruleForm.attr_name,
                      cat_id:this.ruleForm.cat_id,
                      only_many:this.ruleForm.only_many,
                      input_select:this.ruleForm.input_select
                      })
                    .then(res => {
                        if (res.meta.state == 201)
                        {
                            this.$message.success(res.meta.msg);
                            this.$router.push({path:'/goods/attr'})
                        } else {
                            this.loading = false
                            this.$message.error(res.meta.msg);
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
      },
      // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
</style>