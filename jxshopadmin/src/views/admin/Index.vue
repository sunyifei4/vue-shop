<template>
<div class='admin'>
    <!-- hello -->

    <!-- 左侧 -->
    <div class="menu" @click="mbxbd" v-bind:style="{width:menuWidth}">
                <!-- <el-radio-group v-model="isHiddenMenu" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group> -->

                <el-menu 
                    default-active="1-4-1" 
                    class="el-menu-vertical-demo" 
                    @open="handleOpen"  @close="handleClose" 
                    :collapse="isHiddenMenu"
                    background-color="#263445"
                    text-color="rgb(191,203,217)"
                    :collapse-transition='false'
                >
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="iconfont icon-shouye"></i>
                        <span slot="title">后台首页</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" @click="fkjlFn">访客记录</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                        <i class="iconfont icon-shangpin"></i>
                        <span slot="title">商品分类</span>
                        </template>
                        <el-menu-item index="2-1" @click="fllbFn">分类列表</el-menu-item>
                        <el-menu-item index="2-2" @click="flcjFn">分类创建</el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                        <i class="iconfont icon-shangpin"></i>
                        <span slot="title">商品属性</span>
                        </template>
                        <el-menu-item index="3-1" @click="splxFn">商品类型</el-menu-item>
                        <el-menu-item index="3-2" @click="lxcjFn">类型创建</el-menu-item>
                        <el-menu-item index="3-3" @click="spsxFn">商品属性</el-menu-item>
                        <el-menu-item index="3-4" @click="sxcjFn">属性创建</el-menu-item>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title">
                        <i class="iconfont icon-shangpin"></i>
                        <span slot="title">商品管理</span>
                        </template>
                        <el-menu-item index="4-1" @click="splbFn">商品列表</el-menu-item>
                        <el-menu-item index="4-2" @click="spcjFn">商品创建</el-menu-item>
                        <el-menu-item index="4-3" @click="sphszFn">商品回收站</el-menu-item>
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title">
                        <i class="iconfont icon-shangpin"></i>
                        <span slot="title">订单管理</span>
                        </template>
                        <el-menu-item index="5-1" @click="ddglFn">订单管理</el-menu-item>
                        <el-menu-item index="5-2" @click="ddhszFn">订单回收站</el-menu-item>
                        <el-menu-item index="5-3" @click="ddtjFn">订单统计</el-menu-item>
                    </el-submenu>

                    <el-submenu index="6">
                        <template slot="title">
                        <i class="iconfont icon-shangpin"></i>
                        <span slot="title">用户管理</span>
                        </template>
                        <el-menu-item index="6-1" @click="yhlbFn">用户列表</el-menu-item>
                        <el-menu-item index="6-2" @click="yhcjFn">用户创建</el-menu-item>
                    </el-submenu>

                    <el-submenu index="7">
                        <template slot="title">
                        <i class="iconfont icon-shangpin"></i>
                        <span slot="title">角色管理</span>
                        </template>
                        <el-menu-item index="7-1" @click="jslbFn">角色列表</el-menu-item>
                        <el-menu-item index="7-2" @click="jscjFn">角色创建</el-menu-item>
                    </el-submenu>

                    <el-submenu index="8">
                        <template slot="title">
                        <i class="iconfont icon-shangpin"></i>
                        <span slot="title">权限管理</span>
                        </template>
                        <el-menu-item index="8-1" @click="qxlbFn">权限列表</el-menu-item>
                    </el-submenu>
                </el-menu>
    </div>
    <!-- /左侧 -->
    <!-- 右侧 -->
    <div class="main">
        <div class="top">
            <div class="l">
                <div class="btn" @click="handleMenu">
                    <span class="iconfont icon-caidan"></span>
                </div>
                <div class="breadcrumb">
                    <el-breadcrumb class="bcx" separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }"><a href="/login">首页</a></el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">后台首页</a></el-breadcrumb-item>
                        <el-breadcrumb-item>欢迎页面</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="r"></div>
        </div>
        <div class="content">
            <!-- 显示当前组件子级 -->
            <router-view />
        </div>
    </div>
    <!-- /右侧 -->
</div>
</template>
<script>
  export default {
    data() {
      return {
          //是否隐藏菜单
        isHiddenMenu: false,
        //菜单宽度
        menuWidth:'200px'
      };
    },
    methods: {
        fkjlFn(){
            this.$router.push({
                    path: '/history'
                })
        },
        fllbFn(){
            this.$router.push({
                    path: '/goods/cate'
                })
        },
        flcjFn(){
            this.$router.push({
                    path: '/goods/cate/create'
                })
        },
        splxFn(){
            this.$router.push({
                    path: '/goods/type'
                })
        },
        lxcjFn(){
            this.$router.push({
                    path: '/goods/type/create'
                })
        },
        spsxFn(){
            this.$router.push({
                    path: '/goods/attr'
                })
        },
        sxcjFn(){
            this.$router.push({
                    path: '/goods/attr/create'
                })
        },
        splbFn(){
            this.$router.push({
                    path: '/goods'
                })
        },
        spcjFn(){
            this.$router.push({
                    path: '/goods/create'
                })
        },
        sphszFn(){
            this.$router.push({
                    path: '/goods/recycle'
                })
        },
        ddglFn(){
            this.$router.push({
                    path: '/orders'
                })
        },
        ddhszFn(){
            this.$router.push({
                    path: '/orders/recycle'
                })
        },
        ddtjFn(){
            this.$router.push({
                    path: '/orders/total'
                })
        },
        yhlbFn(){
            this.$router.push({
                    path: '/users'
                })
        },
        yhcjFn(){
            this.$router.push({
                    path: '/users/create'
                })
        },
        jslbFn(){
            this.$router.push({
                    path: '/roles'
                })
        },
        jscjFn(){
            this.$router.push({
                    path: '/roles/create'
                })
        },
        qxlbFn(){
            this.$router.push({
                    path: '/auths'
                })
        },
        mbxbd(event){
            if(event.target.title=="el-menu-item"){
                // let bh=index.split('-')
                console.log="sdasd"
            }
        },
        handleMenu(){
            this.isHiddenMenu=!this.isHiddenMenu
            this.menuWidth=this.isHiddenMenu?'64px':'200px'
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
  }
</script>
<style lang="scss" scoped>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
//admin
.admin{
    width: 100%;
    height: 100%;
    display: flex;
    // overflow-x: hidden;
    // overflow-y: scroll;
    overflow: hidden;
    //menu
    .menu{
        .el-menu{width: 100%;height: 100%;}
        width: 200px;
        height: 100%;
        background: #263445;
        transition: width .28s;

        ul{border:none;}
        .iconfont{
            margin-right: 5px;
            font-size: 16px;
        }
    }

    //main
    .main{
        flex:1;//使用剩余空间 前提父得弹性盒布局
        background: red;
        overflow-y: scroll;

        //top
        .top{
            width: 100%;
            height: 50px;
            margin-bottom: 30px;
            background: blue;
            box-shadow: 0 1px 4px rgba(0,21,41,0.08);
            display: flex;
            justify-content:space-between;
            
            .l {
                width: 300px;
                height: 100%;
                background: yellow;
                overflow: hidden;
                .btn{
                    height: 50px;
                    width: 50px;
                    text-align: center;
                    line-height: 50px;
                    float: left;
                }
                .btn span{
                        font-size: 20px;
                }
                .btn:hover{
                    background: #ccc;
                    cursor: pointer;
                }
                .breadcrumb{
                    width: 200px;
                    height: 50px;
                    line-height: 50px;
                    background: orange;
                    float: left;
                }
                .breadcrumb .bcx{
                    line-height: 50px;
                }
            }
            .r{
                width: 240px;
                height: 100%;
                background: pink;
                position: relative;
            }
        }
        //content
        .content{
            width: 96%;
            // height: 100%;
            min-height: 100px;
            margin: auto;
            background: green;
            
        }
    }
}
</style>