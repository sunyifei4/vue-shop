<template>
<div class='login'>
    <!-- 多学一招：el-form表单组件全屏撑开
    解决：加class然后设置宽度
    多学一招，不用手动写class
    原因：elementui组件 组件名就是类名 所以可以直接用 -->
    <!-- 
        vue表单验证规则
        1 表单数据统一对象管理  el-form：model="data中键"      el-input/select/radio   v-model="ruleForm.键"
        2 设置验证规则          el-form：rules="rules"       rules是模型中的对象    键-同【ruleForm.键】键，值-是数组里面一个个对象设置规则
        3 声明开启验证的表单选项 el-form-item prop="同rules中的键"

        注：ruleForm.键==v-model="ruleForm.键"==prop="同rules中的键"    键到底写什么 随意 推荐根据接口来
     -->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm demo2">
        <!-- el-form-item 代表一个选项
        label 就是当前选项的标题名 -->
        <el-form-item><h1>B2C电商管理系统</h1></el-form-item>
        <el-form-item prop="question">
             <el-select v-model="ruleForm.question" placeholder="请选择密保问题">
                <el-option
                v-for="item in answer"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="" prop="answer">
            <el-input type="text" prefix-icon="el-icon-key" placeholder="请输入密保答案" clearable v-model="ruleForm.answer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="uname">
            <el-input type="text" prefix-icon="el-icon-user" placeholder="请输入用户名" clearable  v-model="ruleForm.uname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="pwd">
            <el-input type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password clearable  v-model.number="ruleForm.pwd"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {

        let checkUname=(rule,value,callback)=>{
            //value就是当前用户输入的内容
            //成功了-别弹框 而是 callback();
            //失败了-别弹框 而是 callback(new Error('提示信息'));
            //思考：一定要调用上述语法吗
            //回答：必须用
            //原因：elementui封装了一套提示信息
            //因此:你不用 就破坏规则
            if(value=="")return callback(new Error('请输入密码'));
            if(value.length<2||value.length>12)return callback(new Error('长度在2到12个字符'));
            return callback();
            
        };

      return {
        //密保问题
        answer:[
            {value:'你奶奶的名字叫什么',label:'你奶奶的名字叫什么'},
            {value:'你爸爸的名字叫什么',label:'你爸爸的名字叫什么'},
            {value:'你其中一位老师的名字',label:'你其中一位老师的名字'},
        ],
        //表单数据
        ruleForm: {
          question: '',
          answer: '',
          uname: '',
          pwd:''
        },
        //留心：除了逝去焦点需要验证，提交表单也必须验证
        //原因：用户打开之后啥都不操作 直接提交 那么你的验证等于白写
        //因此：还得触发
        //思考：如何触发
        //回答：固定语法
        //语法：this.$refs.ref属性值.validate((valid)=>{})
        //说明：valid为真-代表没问题，然后发送异步请求 为假-有问题 不用管
        rules: {
            //键-表单数据的键
            //值-数组 里面是一个个的对象    对应一个个验证规则
            question:[
                {required:true,message:'请选择密保问题',trigger:'blur'},
            ],
            answer:[
                {required:true,message:'请输入密保答案',trigger:'blur'},
                {min:2,max:8,message:'长度在2-8个字符',trigger:'blur'}
            ],
            uname:[
                // {required:true,message:'请输入用户名',trigger:'blur'},
                // {min:2,max:12,message:'长度在2-12个字符',trigger:'blur'}
                {validator:checkUname,trigger:'blur'}
            ],
            pwd:[
                {required:true,message:'请输入密码',trigger:'blur'},
                {min:2,max:12,message:'长度在2-12个字符',trigger:'blur'}
            ],
        }
      };
    },
    methods: {
      submitForm(formName) {
          //思考：以前如何获取DOM
          //回答：1 给标签加ID属性，2 通过doucment.qs('#id属性值')  来获取

          //问题：DOM查找影响性能
          //解决：ref属性
          //语法：1 给标签加ref属性，2 通过this.$refs.ref属性值来获取
          //原理：将监控范围放到剪切到内存中时，带有ref属性的标签会内存中单独放一份
          //举例：let a=1;console.log(a)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            //后期发送异步请求
          } else {
              //失败不用管，因为elementui有自己的错误提示机制
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100%;
    background: #2D3A4B;

    display: flex;
    justify-content: center;
    align-items: center;

    //el-form
    .el-form{
        width: 300px;
        height: 372px;

        h1{text-align: center;color: #fff;}
        .el-select,.el-button{width: 100%;}
    }
}
</style>