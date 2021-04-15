<!--
 * @Author: Sule
 * @Date: 2021-04-12 13:46:09
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-15 14:33:24
 * @Description: 地图容器
-->
<template>
  <div
    class="map"
    style="overflow: hidden"
    v-loading="state.loading"
    element-loading-spinner="el-icon-loading"
    element-loading-text="Loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
    ref="oneMap"
  >
    <!-- 主地图组件-->
    <div class="map">
      <editor-map></editor-map>
    </div>
    <!-- 地图编辑部分 -->
    <div class="mapEditor">
      <!-- 左侧属性抽屉 -->
      <float-drawer direction="ltr" :visable="leftDrawer"> 左侧面板容器 </float-drawer>
      <!-- 左侧浮动框 在左侧抽屉之上 -->
      <left-float-panel class="left_flow_panel" v-if="leftFloatFlag"></left-float-panel>
      <!-- 中间操作部分 -->
      <div class="center">
        <header>
          <user-menu></user-menu>
          <div class="tipsList" @click="openLeftFloat">
            <div title="左侧浮动面板"></div>
          </div>
        </header>
        <!-- 选中数据列表 -->
        <section></section>

        <!-- 工具条 -->
        <section style="flex: 1">
          <tool-bar></tool-bar>
        </section>
        <!-- 底排组件 -->
        <footer>
          <!-- 图例 -->
          <!-- 弹出框最小化容器 -->
          <div
            class="dialogMinimizedBar"
            @click="minDialogChange"
            v-show="miniDialogFlag"
          >
            <div></div>
            <ul class="minDialogList" v-if="state.showMinList">
              <li
                v-for="dialog in state.miniDialogs"
                :key="dialog.id"
                @click="showMinDialog(dialog)"
              >
                {{ dialog.title }}
              </li>
            </ul>
          </div>
          <!-- 场景图层面板触发按钮 -->
          <div class="sceneToolbar" @click="openScenePanel" title="图层控制">
            <div></div>
          </div>
        </footer>
      </div>
      <!-- 右侧属性抽屉 -->
      <float-drawer direction="rtl" :visable="rightDrawer">
        <right-panel></right-panel>
      </float-drawer>
    </div>
    <custom-dialog></custom-dialog>
  </div>
</template>
<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import editorMap from "@/components/map/editorMap.vue";
import FloatDrawer from "@/components/common/FloatDrawer.vue";
import UserMenu from "@/components/map/center/UserMenu.vue";
import ToolBar from "@/components/map/center/ToolBar.vue";
import RightPanel from "@/components/map/rightPanel/RightPanel.vue";
import LeftFloatPanel from "@/components/map/leftFloatPanel/leftFloatPanel.vue";
import customDialog from "@/components/common/dialogs/customDialog.vue";

export default {
  components: {
    editorMap,
    FloatDrawer,
    UserMenu,
    ToolBar,
    RightPanel,
    LeftFloatPanel,
    customDialog,
  },
  setup() {
    const oneMap = ref(null);
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      loading: false,
      showMinList: false,
      miniDialogs: [],
    });
    const leftDrawer = computed(() => {
      return store.state.mainMap.leftDrawer;
    });
    const rightDrawer = computed(() => {
      return store.state.mainMap.rightDrawer;
    });
    const miniDialogFlag = computed(() => {
      return store.state.mainMap.miniDialogFlag;
    });
     const leftFloatFlag = computed(() => {
      return store.state.mainMap.leftFloatFlag;
    });
    const openScenePanel = () => {
      store.commit("mainMap/changePanelStatus", {
        rightDrawer: true,
        currentRightPanel: "sceneLayers",
      });
    };
    /**
     * @description:
     * @param {type}
     * @return {type}
     * @author: Sule
     */
    const minDialogChange = () => {
      state.showMinList = !state.showMinList;
      if (state.showMinList) {
        const allDialog = store.state.mainMap.dialogManagerList;
        state.miniDialogs = allDialog.filter((e) => e.minimize);
      }
    };
    /**
     * @description:
     * @param {type}
     * @return {type}
     * @author: Sule
     */
    const showMinDialog = (dialog) => {
      dialog.minimize = false;
      const minDialogs = store.state.mainMap.dialogManagerList.filter((e) => e.minimize);
      if (minDialogs.length === 0) {
        store.commit("mainMap/changePanelStatus", {
          miniDialogFlag: false,
        });
      }
    };
    const openLeftFloat = () => {
      store.commit("mainMap/changePanelStatus", {
          leftFloatFlag: true,
        });
    };
    onBeforeUnmount(() => {
      store.commit("mainMap/resetMapState");
    });
    return {
      state,
      oneMap,
      leftDrawer,
      rightDrawer,
      leftFloatFlag,
      miniDialogFlag,
      openScenePanel,
      minDialogChange,
      showMinDialog,
      openLeftFloat,
    };
  },
};
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
  font-size: 12px;
  background-color: rgba(207, 255, 160, 0.534);
}
.mapEditor {
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.center {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
  top: 0;
  right: 0;
  z-index: 1001;
}
header {
  height: 40px;
  display: flex;
  justify-content: flex-end;
  margin-left: 5px;
  z-index: 1001;
  position: relative;
}
footer {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-left: 5px;
}
section {
  margin-top: 50px;
  height: 220px;
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
  z-index: 1001;
}
.sceneToolbar {
  border-radius: 3px;
  -webkit-box-shadow: 0 0 10px #93bbff;
  box-shadow: 0 0 10px #93bbff;
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: #fff;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.left_flow_panel {
   z-index: 2111;
}
.tipsList {
  box-shadow: 0 0 10px #93bbff;
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 40px;
  z-index: 1011;
  background-color: #ffffff;
}
.tipsList > div {
  width: 100%;
  height: 100%;
  background: url("../assets/images/tool/taskList-normal.png") no-repeat center
    center;
}
.tipsList:hover > div {
  background: url("../assets/images/tool/taskList-active.png") no-repeat center
    center;
}
.sceneToolbar > div {
  width: 100%;
  height: 100%;
  background: url("../assets/images/tool/button_changjing_normal.png") no-repeat center
    center;
}
.sceneToolbar:hover > div {
  background: url("../assets/images/tool/button_changjing_active.png") no-repeat center
    center;
}

.dialogMinimizedBar {
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: #93bbff;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 10px #93bbff;
  position: relative;
  margin-bottom: 46px;
}

.dialogMinimizedBar > div {
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/tool/button_mini_normal.png") no-repeat center center;
}

.dialogMinimizedBar:hover > div {
  background: url("~@/assets/images/tool/button_mini_active.png") no-repeat center center;
}

.minDialogList {
  border-radius: 3px;
  margin: 0px;
  padding: 0px;
  background-color: #ffffff;
  display: block;
  box-shadow: 0 2px 6px 0 #93bbff;
  cursor: pointer;
  width: 120px;
  position: absolute;
  right: 39px;
  bottom: 2px;
  border: #93bbff solid 1px;
}

.minDialogList li {
  border: 1px solid #fff;
  list-style: none;
  background-color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 12px;
  padding: 5px;
  color: #182848;
}
</style>
