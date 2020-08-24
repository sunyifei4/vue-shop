<template>
<div class='create'>
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>创建商品属性</span>
            <el-button type="primary" round>返回</el-button>
        </div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="属性名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="所属类型">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>



            <el-form-item label="值录入方式" prop="input_select">
                <el-radio v-model="ruleForm.input_select" label="input"></el-radio>
                <el-radio v-model="ruleForm.input_select" label="select"></el-radio>
            </el-form-item>



            <el-form-item label="可选值" prop="attr_values" v-show="ruleForm.input_select=='select'">
                <el-input type="text" v-model="ruleForm.attr_values" placeholder="请输入可选值，多个值之间请使用英文“,”分隔开" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>
<script>
  export default {
    data() {
      return {
          ruleForm: {
          cat_id: '',
                attr_name: '',
                input_select: '',
                only_many: '',
                attr_values: '',
        },
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          recate:''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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