<template>
<div class='Create'>
    <el-card class="box-card">
        <div slot="header" class="clearfix header">
            <span>商品分类</span>
            <el-button type="primary" round>创建</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <span style="width:100 PX">商品名称：</span>
                <el-input
                    placeholder="请输入内容"
                    v-model="input"
                    clearable
                    style="width:500px;height:40px;margin-top:20px">
                </el-input><br>
                <div class="fl">
                    <div>
                        <span style="width:100 PX">商品数量：</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="input"
                            clearable
                            style="width:305px;height:40px;margin-top:20px">
                        </el-input><br>
                        <span style="width:100 PX">商品价格：</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="input"
                            clearable
                            style="width:305px;height:40px;margin-top:20px">
                        </el-input><br>
                        <span style="width:100px">促销价：</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="input"
                            clearable
                            style="width:305px;height:40px;margin-top:20px">
                        </el-input><br>
                    </div>
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        display:inline-block
                        style="margin-left:20px;margin-top:20px">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商品描述" name="second">
              <div>
                <el-card style="height: 610px;">
                  <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
                  </quill-editor>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品相册" name="third">
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-tab-pane>
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
        </el-tabs>
    </el-card>
</div>
</template>
<script>
import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  
  export default {
    name: 'FuncFormsEdit',
    components: {
      quillEditor
    },
    data() {
      return {
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
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style scoped>
.header{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
.fl{
    display: flex;
}
</style>