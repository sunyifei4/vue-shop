import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI);

//配置全局初始化样式
import '@/assets/css/reset.scss';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
