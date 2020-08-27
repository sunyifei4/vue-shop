//ES6模块化
//export 修饰符 变量名=值
//import {名称,...} from '路径'
//export default 数据
// import 名称 from '路径'

//导入axios模块
import axios from 'axios'
import qs from 'qs'

//配置
axios.defaults.withCredentials=false;
axios.defaults.baseURL='/api';


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么  统一加token、content-type数据编码等等
    config.headers['token']=localStorage.getItem('token') || 'adf7cbdcdc62b07d94f86339e5687ca51'
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么   统一错误处理
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


//使用语法

// return axios.get(请求地址，{headers,patams}).then(res=>res.data)
// return axios.delete(请求地址，{headers,patams}).then(res=>res.data)
// 留心：咱们这个项目后台接口比较特殊
// return axios.post(请求地址，qs.stringify(数据对象)).then(res=>res.data)
// return axios.put(请求地址，qs.stringify(数据对象)).then(res=>res.data)

//导出封装的一部请求代码
// export const HTTP请求动词+模块化+Api=*()=>{
// }

// export const getGoodsTypeApi=()=>{
//     return axios.get('http://kg.zhaodashen.cn/v2/goods/type/index.php',{params:{pagenum,pagesize}})
// }
//和下列方法一样

export const getGoodsTypeApi=params=>{//params=>{pagenum,pagesize}
    return axios.get('/v2/goods/type/index.php',{headers:{token:'adf7cbdcdc62b07d94f86339e5687ca51'},params}).then(res=>res.data)
}

export const getHistoryApi=params=>{
  return axios.get('/v2/users/history.php',{params}).then(res=>res.data)
}

export const deleteGoodsTypeApi=params=>{
  return axios.delete('/v2/goods/type/delete.php',{params}).then(res=>res.data)
}

export const putGoodsTypeStateApi=params=>{
  return axios.put('/v2/goods/type/state.php',qs.stringify(params)).then(res=>res.data)
}

export const postGoodsTypeApi=params=>{
  return axios.post('/v2/goods/type/create.php',qs.stringify(params)).then(res=>res.data)
}

export const putGoodsTypeApi=params=>{
  return axios.put('/v2/goods/type/update.php',qs.stringify(params)).then(res=>res.data)
}

export const getIndexTypeApi=params=>{
  return axios.get('/v2/cate/index.php',{params}).then(res=>res.data)
}
//分类创建两个
export const postCateCreateApi=params=>{
  return axios.post('/v2/cate/create.php',qs.stringify(params)).then(res=>res.data)
}

export const getCateCreateApi=params=>{
  return axios.get('/v2/cate/index.php',{params}).then(res=>res.data)
}
//商品属性
export const getGoodsAttrApi=params=>{
  return axios.get('/v2/goods/attr/index.php',{params}).then(res=>res.data)
}
//商品属性创建
export const postGoodsAttrCreate=params=>{
  return axios.post('/v2/goods/attr/create.php',qs.stringify(params)).then(res=>res.data)
}
//商品属性删除
export const deleteGoodsAttrApi=params=>{
  return axios.delete('/v2/goods/attr/delete.php',{params}).then(res=>res.data)
}
//商品属性修改
export const putGoodsAttrupdate=params=>{
  return axios.put('/v2/goods/attr/update.php',qs.stringify(params)).then(res=>res.data)
}
//角色列表
export const getRolesIndexApi=params=>{
  return axios.get('/v2/roles/index.php',{params}).then(res=>res.data)
}
//分配角色
export const putRolesAssign=params=>{
  return axios.put('/v2/roles/assign.php',qs.stringify(params)).then(res=>res.data)
}
//角色创建
export const postRolesCreateApi=params=>{
  return axios.post('/v2/roles/create.php',qs.stringify(params)).then(res=>res.data)
}
//角色删除
export const deleteRolesDeleteApi=params=>{
  return axios.delete('/v2/roles/delete.php',{params}).then(res=>res.data)
}
//角色修改
export const putrolesupdate=params=>{
  return axios.put('/v2/roles/update.php',qs.stringify(params)).then(res=>res.data)
}
//用户列表
export const getUsersIndexApi=params=>{
  return axios.get('/v2/users/index.php',{params}).then(res=>res.data)
}
//用户删除
export const deleteUsersDelete=params=>{
  return axios.delete('/v2/users/delete.php',{params}).then(res=>res.data)
}
//用户编辑
export const putusersupdate=params=>{
  return axios.put('/v2/users/update.php',qs.stringify(params)).then(res=>res.data)
}
//用户创建
export const postUsersCreate=params=>{
  return axios.post('/v2/users/create.php',qs.stringify(params)).then(res=>res.data)
}
//用户状态切换
export const postUsersState=params=>{
  return axios.put('/v2/users/state.php',qs.stringify(params)).then(res=>res.data)
}
//用户分配角色
export const putUsersAssign=params=>{
  return axios.put('/v2/users/assign.php',qs.stringify(params)).then(res=>res.data)
}
//订单列表
export const getOrdersIndexApi=params=>{
  return axios.get('v2/orders/index.php',{params}).then(res=>res.data)
}
//订单统计
export const getOrdersTotal=params=>{
  return axios.get('v2/orders/total.php',{params}).then(res=>res.data)
}
//商品列表
export const getGoodsIndex=params=>{
  return axios.get('v2/goods/index.php',{params}).then(res=>res.data)
}
//商品状态切换
export const postGoodsState=params=>{
  return axios.put('/v2/goods/state.php',qs.stringify(params)).then(res=>res.data)
}
//权限列表
export const getauthIndex=params=>{
  return axios.get('v2/auth/index.php',{params}).then(res=>res.data)
}
//用户登录
export const postUsersLogin=params=>{
  return axios.post('/v2/users/login.php',qs.stringify(params)).then(res=>res.data)
}
//检测是否授权登录
export const postQrCheck=params=>{
  return axios.post('/v2/qr/check.php',qs.stringify(params)).then(res=>res.data)
}
//发送短信验证码
export const postSmsSend=params=>{
  return axios.post('/v2/sms/send.php',qs.stringify(params)).then(res=>res.data)
}
//短信登录
export const postSmsLogin=params=>{
  return axios.post('/v2/sms/login.php',qs.stringify(params)).then(res=>res.data)
}