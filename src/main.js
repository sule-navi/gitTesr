/*
 * @Author: Sule
 * @Date: 2021-03-29 15:26:45
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-09 14:17:36
 * @Description: 
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'element-plus/lib/theme-chalk/index.css'; //如果需要改动全局elementUI相关样式 就在前边加入修改样式变量css
import ElementPlus from 'element-plus';

const app = createApp(App); // 创建实例
app.use(ElementPlus);

app.use(store)
    .use(router)
    .mount('#app')

/**
 * @description: 路由守卫 检测路由变化处理部分业务
 * @param {type} 
 * @param {type} 
 * @param {type} 
 * @return {type} 
 * @author: Sule
 */
router.beforeEach((to, from, next) => {
    if (to.matched.length !== 0) {
        next()
      } else {
        next({ path: '/404' })
      }
});