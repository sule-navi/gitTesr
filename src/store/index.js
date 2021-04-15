/*
 * @Author: Sule
 * @Date: 2021-03-29 15:26:45
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-07 16:38:45
 * @Description: 
 */
import { createStore } from 'vuex'
import main from './modules/main'
import mainMap from './modules/mainMap'
import application from './modules/application'

export default createStore({
  modules: {
    application,
    main,
    mainMap
  }
})
