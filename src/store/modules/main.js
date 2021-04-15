/*
 * @Author: Sule
 * @Date: 2019-12-13 09:46:43
 * @LastEditors: Sule
 * @LastEditTime: 2020-10-14 14:44:13
 * @Description: 用于登录记录 以及首页个页面
 */
// initial state
const state = {
    collapse: false // 控制导航折叠
}

// getters
const getters = {
}

// actions
const actions = {
  
}

// mutations
const mutations = {
  /**
   * @description: 
   * @param {type} 
   * @param {type} 
   * @return {type} 
   * @author: Sule
   */
  changeCollapseStatus (state, status) {
    state.collapse = !state.collapse;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}