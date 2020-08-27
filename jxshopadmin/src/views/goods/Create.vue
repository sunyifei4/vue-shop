<template>
<div class='Create'>
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>商品分类</span>
            <el-button type="primary" round @click="jump('/goods')">返回</el-button>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <span style="width:100 PX">商品名称：</span>
                <el-upload
                  class="avatar-uploader"
                  action="http://kg.zhaodashen.cn/v2/upload.php"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="ruleForm.thumb_tmp" :src="ruleForm.thumb_tmp" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form-item label="商品名称" prop="goods_name">
                    <el-input type="text" v-model="ruleForm.goods_name" autocomplete="off" style="width: 500px;"></el-input>
                </el-form-item>
                
                <el-form-item label="商品数量" prop="goods_number" class="input-upload">
                    <el-input type="text" v-model.number="ruleForm.goods_number" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="商品价格" prop="market_price" class="input-upload">
                    <el-input type="text" v-model.number="ruleForm.market_price" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="促销价" prop="shop_price" class="input-upload">
                    <el-input type="text" v-model.number="ruleForm.shop_price" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="所属分类" prop="cat_id_tmp">
                    <el-cascader
                    :options="cates"
                    :props="props"
                    change-on-select
                    clearable
                    v-model="ruleForm.cat_id_tmp"
                    @change="handleChange">
                    </el-cascader>
                </el-form-item>
            
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-tab-pane>
            <!-- 商品描述 -->
            <el-tab-pane label="商品描述" name="two" >
                 <quill-editor v-model="ruleForm.goods_desc" style="height: 300px;" ></quill-editor>
            </el-tab-pane>
            <!-- /商品描述 -->
            <!-- 商品相册 -->
            <el-tab-pane label="商品相册" name="three" >
                <!-- TODO. action目前为测试接口 -->
                <el-upload
                action="http://kg.zhaodashen.cn/v2/upload.php"
                list-type="picture-card"
                :on-success="handleSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-tab-pane>
            <!-- /商品相册 -->
            <el-tab-pane label="商品属性" name="fourth">
                商品类型：
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-tab-pane>
            <!-- 根据商品类型显示商品属性 -->
                <el-form-item v-for="(item, index) in ruleForm.attrs" v-bind:label="item.attr_name" v-bind:key="index" class="attrs">

                    <!-- 输入框 -->
                    <div v-if="item.input_select == 'input'">
                        <el-input type="text" v-model="item.choose" autocomplete="off"></el-input>
                    </div>

                    <!-- 下拉框 -->
                    <div v-if="item.input_select == 'select'">
                        <el-select v-model="item.choose" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in item.attr_values.split(',')"
                            :key="index"
                            :label="item"
                            :value="item">
                            </el-option>
                        </el-select>
                    </div>

                    <!-- 多选商品属性追加 -->
                    <span v-if="item.only_many == 'many'" @click="handleAttr(item, index)" onselectstart='return false'>[+]</span>
                    <span v-if="item.newtag" @click="handleAttrDel(index)" onselectstart='return false'>[-]</span>

                </el-form-item>
            <!-- /商品属性 -->
        </el-tabs>
        </el-form>
    </el-card>
</div>
</template>
<script>
import {
    quillEditor
  } from 'vue-quill-editor'
import{
  
}from'@/api'
  export default {
    name: 'FuncFormsEdit',
    components: {
      quillEditor
    },
    data() {
      return {
            // 表单数据
            ruleForm: {
                goods_name: '',
                goods_number: '',
                market_price: '',
                shop_price: '',
                cat_id: 0,
                cat_id_tmp: [],
                thumb: '',
                thumb_tmp: '',
                goods_desc: '',
                gallery: '',
                // 商品属性
                attrs: [],
                // 商品类型
                type_id: '',
            },
            // 表单数据验证规则
            rules: {
                goods_name: [
                    { required: true, message: '请输入商品类型', trigger: 'blur' },
                    { min: 4, max: 26, message: '长度在 4 到 26 个字符', trigger: 'blur' }
                ],
                goods_number: [
                    { required: true, message: '请输入库存', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                ],
                market_price: [
                    { required: true, message: '请输入价格', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                ],
                shop_price: [
                    { required: true, message: '请输入价格', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                ],
                cat_id_tmp: [
                    { required: true, message: '请选择所属商品分类', trigger: 'blur' },
                ],
                thumb: [
                    { required: true, message: '请选择封面', trigger: 'blur' },
                ],
            },
            // 所属分类
            cates: [],
            props: {
                label: "cat_name",
                value: "cat_id",
            },
            // loading
            loading: false,


          content: null,
        editorOption: {},
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',

        dialogImageUrl: '',
        dialogVisible: false,
          
          input: '',
        activeName: 'second'
      };
    },
    methods: {
        // 级联选择器切换
        handleChange(value) {
            // console.log(value);
        },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
        // 商品封面
        handleAvatarSuccess(res, file) {
            // console.log(file)
            // this.thumb = URL.createObjectURL(file.raw);
            this.ruleForm.thumb_tmp = file.response.data.url + '/' +  file.response.data.img
            this.ruleForm.thumb = file.response.data.img
        },


        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
        // 图片批量上传
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleSuccess(response, file, fileList) {
            // console.log(response, file, fileList)
            // console.log(fileList)
            // 相册
            let tmp = []
            fileList.forEach((item) => {
                tmp.push(item.response.data.img)
            })
            this.ruleForm.gallery = tmp.join(',')
        },
    }
  };
</script>
<style lang="scss" scoped>
.create {
    // 卡片组件
    .el-card 
    {
        // 头部
        .header .el-button {
            float:right;
            margin-top: -10px;
        }

        // input
        .input-upload {width: 385px;}
    }

    // TAB选项卡
    .el-tabs /deep/ .el-tabs__content {
        // margin-left: -12px;
        padding-top: 20px;

        .el-tab-pane {height: 380px;}
    }

    // 属性
    .attrs div { 
        display: inline-block; 
        span {
            margin-left: 10px;
            cursor: pointer;
            color: #409EFF;
        }
        span:hover {color:red;}
    }

    // 头像上传
    .avatar-uploader /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: absolute;
        left: 400px;
        top: 80px;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 160px;
        line-height: 160px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 160px;
        display: block;
    }
}
</style>