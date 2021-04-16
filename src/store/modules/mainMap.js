/*
 * @Author: Sule
 * @Date: 2019-12-13 09:46:59
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-15 16:24:56
 * @Description: 用于地图内部
 */
// initial state
import auth from "@/utils/auth";
const state = {
  selectTool: {
    name: 'PAN'
  },
  editorLoading: false, // 用于创建修改菊花控制
  mapCookieKey: auth.getSessionStorage('mapCookieKey') || { zoom: 19 }, //地图位置信息
  rightDrawer: false, //右侧抽屉 控制显示隐藏
  leftDrawer: false, //左侧侧抽屉 控制显示隐藏
  currentRightPanel: 'toolPanel', //右侧侧抽屉 默认使用的组件 默认用工具面板  sceneLayers图层  propertyPanel属性面板
  editToolsFlag: false, // 快捷工具是否编辑
  allRecentToolsFlag: false, // 是否展开双行快捷工具条
  miniDialogFlag: false, // 控制弹出框最小化显示容器
  dialogManagerList: [], // 控制弹出框列表
  leftFloatFlag: false, // 控制左侧浮动框
  selectToolList: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],// 快捷工具预留
}

// getters
const getters = {}

// actions
const actions = {
}

// mutations
const mutations = {
  /**
   * @description:
   * @param {type}
   * @return {type}
   * @author: Qiangshaofeng
   */
  setActiveTab(state, data) {
    state.activeTab = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setMapCookieKey(state, obj) {
    state.mapCookieKey = obj;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setMapZoom(state, obj) {
    state.mapCookieKey.zoom = obj;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  changePanelStatus(state, data) {
    for (const key of Object.keys(data)) {
      state[key] = data[key];
    }
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setSelectTool(state, data) {
    state.selectTool = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setSelectToolList(state, data) {
    state.selectToolList = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setOperationType(state, data) {
    state.OperationType = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setGeoLiveType(state, data) {
    state.GeoLiveType = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setCurrentObject(state, data) {
    state.CurrentObject = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setDataListData(state, data) {
    state.dataListData = data;
  },
  /**
 * @description:
 * @param {type}
 * @return {type}
 * @author: Sule
 */
  resetMapState(state) {
    state.editorLoading = false;
    state.rightDrawer = false;
    state.leftDrawer = false;
    state.currentRightPanel = 'toolPanel';
    state.editToolsFlag = false;
    state.allRecentToolsFlag = false;
    state.miniDialogFlag = false;
    state.leftFloatFlag = false;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
