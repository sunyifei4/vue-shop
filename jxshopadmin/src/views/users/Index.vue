<template>
    <div class="user">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户列表</span>
                <el-button type="primary" round @click='createFn()'>创建</el-button>
            </div>
            <div class="sd">
                <el-input placeholder="请输入用户名" v-model="search" class="input-with-select">

                    <el-button slot="append" @click="searchFn"  icon="el-icon-search"></el-button>

                </el-input>
                <el-date-picker v-model="value1" type="daterange" @change="dateSearchFn" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="user_id" label="编号" width="180">
                </el-table-column>
                <el-table-column prop="role_name" label="所属角色" width="180">
                </el-table-column>
                <el-table-column prop="username" label="用户名" width="180">
                </el-table-column>
                <el-table-column prop="mobile_phone" label="手机号" width="180">
                </el-table-column>
                <el-table-column prop="sex" label="冻结">
                    <template slot-scope="item">
                        <el-switch
                            @change="handleChange($event,item.row)"
                            v-model="item.row.state"
                            active-value="1"
                            inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="reg_time" label="注册时间" width="180">
                </el-table-column>
                <el-table-column prop="btns" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleRole(scope.row)" circle>分配角色</el-button>
                        <el-button type="primary" icon="el-icon-edit" circle @click="editFn(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="delFn(scope.row.user_id)" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper" :total="tableDataTotal">
                </el-pagination>
            </div>
        </el-card>
        <!-- 编辑弹框 -->
        <el-dialog title="角色分配" :visible.sync="bjtk">
            <el-form ref="form" :model="solform" label-width="80px">
            <el-form-item label="用户编号" prop="user_id">
                <el-tag type="info" v-model="solform.user_id">{{solform.user_id}}</el-tag>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="solform.username"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
                <el-input v-model="solform.password"></el-input>
            </el-form-item>
            <el-form-item label="密保问题" prop="question">
            <el-select v-model="solform.question" placeholder="请选择密保问题">
                <el-option
                    v-for="item in noles"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密保答案" prop="answer">
                <el-input v-model="solform.answer"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="solform.mobile"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmLit">立即创建</el-button>
                <el-button @click="bjtk=false">取消</el-button>
            </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 分配角色弹框 -->
        <el-dialog title="角色分配" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="当前账号">
                <el-tag type="info" v-model="ruleForm.username">{{ruleForm.username}}</el-tag>
            </el-form-item>
            <el-form-item label="当前角色">
                <el-tag type="info" v-model="ruleForm.role_name">{{ruleForm.role_name}}</el-tag>
            </el-form-item>
            <el-form-item label="选择角色">
                <el-select v-model="ruleForm.role_id" placeholder="请选择角色">
                <el-option
                    v-for="item in roles"
                    :key="item.role_id"
                    :label="item.role_name"
                    :value="item.role_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="dialogFormVisible=false">取消</el-button>
            </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import{
    getRolesIndexApi,
    putUsersAssign,
    getUsersIndexApi,
    deleteUsersDelete,
    postUsersState,
    putusersupdate
    }from'@/api'
    export default {
        created(){
            this.initData()
        },
        data() {

            return {
                solform:{
                    user_id:'',
                    username:'',
                    password:'',
                    question:'',
                    answer:'',
                    mobile:'',
                },
                bjtk:false,
                noles:[{value:'母亲的名字',label:'母亲的名字'},
                    {value:'爷爷的名字',label:'爷爷的名字'},
                    {value:'父亲出生的城市',label:'父亲出生的城市'},
                    {value:'您其中一位老师的名字',label:'您其中一位老师的名字'},
                    {value:'您个人计算机的型号',label:'您个人计算机的型号'},
                    {value:'您最喜欢的餐馆名称',label:'您最喜欢的餐馆名称'},
                    {value:'驾驶执照最后四位数字',label:'驾驶执照最后四位数字'},],
                roles:{
                    question:[{required:true,message:"请选择密保问题",trigger:"blur"}],
                    username: [{required: true,message: '请输入账号',trigger: 'blur'}],
                    password: [{required: true,message: '请输入密码',trigger: 'blur'}],
                    answer: [{required: true,message: '请输入密保答案',trigger: 'blur'}],
                },
                rules: {
                role_id: [
                    { required: true, message: '请选择角色', trigger: 'blur' },
                ]
                },
                dialogFormVisible:false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                search:'',
                value1:'',
                tableData: [],
                pagenum:'',
                pagesize:'',
                username:'',
                start_time:'',
                end_time:'',
                pagesize:10,
                tableDataTotal:1,
                pagenum:1,
                ruleForm:{
                    role_id:''
                }
            }
        },
        methods: {
            onSubmLit(){
                putusersupdate({
                    user_id:this.solform.user_id,
                    username:this.solform.username,
                    password:this.solform.password,
                    question:this.solform.question,
                    answer:this.solform.answer,
                    mobile:this.solform.mobile
                }).then(res=>{
                    if(res.meta.state==200){
                        this.$message.success(res.meta.msg)
                        this.initData()
                        this.bjtk=false
                    }else{
                        this.$message.error(res.meta.msg)
                    }
                })
            },
            //用户编辑
            editFn(row){
                console.log(row)
                this.bjtk=true
                this.solform.user_id=row.user_id
                this.solform.username=row.username
                this.solform.password=row.password
                this.solform.question=row.passwd_question
                this.solform.answer=row.passwd_answer
                this.solform.mobile=row.mobile_phone
            },
            onSubmit() {
                putUsersAssign({
                    user_id:this.ruleForm.user_id,
                    role_id:this.ruleForm.role_id
                }).then(res=>{
                    console.log(this.ruleForm.user_id,this.ruleForm.role_id,)
                    if (res.meta.state == 200)
                        {
                            this.$message.success('操作成功')
                            this.initData()
                            this.dialogFormVisible = false
                        } else {
                            this.$message.error(res.meta.msg)
                            console.log(res.meta);
                        }
                })
            },
            // 给用户分配角色
            handleRole(row) {
                    console.log(row)
                // 保存当前行数据
                this.ruleForm = row
                getRolesIndexApi()
                .then(res=>{
                    this.roles=res.data
                })
                this.dialogFormVisible=true
            }, 
            // 切换状态
            handleChange(state, row) {
                // console.log(state, row.cat_id)
                // loading
                this.loading = true
                // send ajax
                postUsersState({
                    user_id: row.user_id,
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
            },
            dateSearchFn(){
                this.start_time = this.value1[0] || ''
                this.end_time = this.value1[1] || ''
                this.initData()
            },
            searchFn(){
                this.initData()
            },
            delFn(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                            //发送异步请求
                        deleteUsersDelete({
                        user_id:id
                        }).then(res=>{
                        if(res.meta.state==200){

                            //成功在提示
                            this.$message.success(res.meta.msg)

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
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            initData(){
                getUsersIndexApi({
                pagenum:this.pagenum,
                pagesize:this.pagesize,
                uname:this.search,
                start_time:this.start_time,
                end_time:this.end_time,
                })
                .then(res=>{
                    this.tableData=res.data.list
                    console.log(res)
                    this.tableDataTotal=parseInt(res.data.total)
                })
            },
            createFn() {
                this.$router.push({
                    path: '/user/create'
                })
            },
            // 切换每页条数
            handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pagenum=val
            this.initData()
            },
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
</style>