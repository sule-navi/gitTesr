<!--
 * @Author: Sule
 * @Date: 2021-04-12 17:11:06
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-13 14:42:04
 * @Description: 
-->
<template>
  <div class="map-toolbar">
    <div
      class="tools-switch"
      :title="
        rightDrawer && currentRightPanel === 'toolPanel' ? '关闭工具' : '打开工具面板'
      "
      @click="toggle"
    >
      <div
        class="open-tool-normal"
        :class="{ 'hide-tool-normal': rightDrawer && currentRightPanel === 'toolPanel' }"
      ></div>
    </div>
    <ul class="list-group tools-ul select-tool">
      <!-- 默认固定的快捷工具-->
      <el-popover
        placement="left"
        :width="100"
        trigger="manual"
        v-model:visible="state.popoverVisible"
      >
        <template #reference>
          <li
            v-if="state.showSingle"
            class="switchtool"
            :class="{ popoverActive: 'SELECT' === state.selectTool.name }"
            title="点选"
            @contextmenu.prevent="changePopover"
            @click="startDefaultTool('SELECT')"
          >
            <img src="@/assets/images/tool/select.png" />
          </li>
          <li
            v-else
            class="switchtool"
            :class="{ popoverActive: 'batch-null' === state.selectTool.name }"
            title="框选"
            @contextmenu.prevent="changePopover"
            @click="startDefaultTool('batch-null')"
          >
            <img src="@/assets/images/tool/select_all.png" />
          </li>
        </template>
        <div>
          <div
            class="popoverTool"
            :class="{ popoverActive: 'SELECT' === state.selectTool.name }"
            @click="startDefaultTool('SELECT')"
          >
            <img src="@/assets/images/tool/select.png" /> 点选
          </div>
          <div
            class="popoverTool"
            :class="{ popoverActive: 'batch-null' === state.selectTool.name }"
            @click="startDefaultTool('batch-null')"
          >
            <img src="@/assets/images/tool/select_all.png" /> 框选
          </div>
        </div>
      </el-popover>

      <li
        class="tool"
        :class="{ active: 'PAN' === state.selectTool.name }"
        title="地图漫游"
        @click="startDefaultTool('PAN')"
      >
        <img src="@/assets/images/tool/mapPan.png" />
      </li>

      <!-- 用户定义快捷工具-->
      <li
        class="add"
        v-for="(item, idx) in selectToolList"
        :class="{ active: item && state.selectTool.name === item.name }"
        :title="item ? item.title : '添加快捷工具'"
        :key="item"
        v-show="idx <= 7"
        @click="item && startTool(item)"
      >
        <img :src="getImgurl(item)" />
      </li>
    </ul>
    <ul class="list-group tools-ul right" v-show="allRecentToolsFlag">
      <li
        class="add"
        :class="{ active: item && state.selectTool.name === item.name }"
        :title="item ? item.title : '添加快捷工具'"
        v-for="(item, index) in selectToolList"
        :index="index"
        :key="index"
        v-show="index > 7"
        @click="item && startTool(item)"
      >
        <img :src="getImgurl(item)" />
      </li>
    </ul>
    <div>
      <div class="tools-switch bottom" @click="switchPage()">
        <img src="@/assets/images/tool/switch-active.png" />
      </div>
      <div
        v-if="allRecentToolsFlag"
        class="tools-switch bottom"
        :class="{ active: editToolsFlag }"
        @click="toggleEditTools()"
      >
        <img src="@/assets/images/tool/setting-active.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  name: "ToolBar",
  setup(props) {
    const store = useStore();
    const state = reactive({
      popoverVisible: false,
      showSingle: false,
      selectTool: {
        name: "PAN",
      },
      editToolsFlag: false,
    });
    const rightDrawer = computed(() => {
      return store.state.mainMap.rightDrawer;
    });
    const currentRightPanel = computed(() => {
      return store.state.mainMap.currentRightPanel;
    });
    const selectToolList = computed(() => {
      return store.state.mainMap.selectToolList;
    });
    const allRecentToolsFlag = computed(() => {
      return store.state.mainMap.allRecentToolsFlag;
    });
    /**
     * @description:
     * @param {type}
     * @return {type}
     * @author: Sule
     */
    const getImgurl = (item) => {
      if (!item) {
        return require("@/assets/images/tool/newTool.png");
      }
      return item.img;
    };
    const startDefaultTool = (toolName) => {
      state.selectTool.name = toolName;
      switch (toolName) {
        case "PAN":
          break;
        case "SELECT":
          state.popoverVisible = false;
          state.showSingle = true;
          break;
        case "batch-null":
          state.popoverVisible = false;
          state.showSingle = false;
          break;
      }
    };
    const toggle = () => {
      let rightPanelFlag;
      if (rightDrawer.value && currentRightPanel.value !== "toolPanel") {
        rightPanelFlag = rightDrawer.value;
      } else {
        rightPanelFlag = !rightDrawer.value;
      }
      store.commit("mainMap/changePanelStatus", {
        currentRightPanel: "toolPanel",
        rightDrawer: rightPanelFlag,
      });
    };
    const toggleEditTools = () => {
      state.editToolsFlag = !state.editToolsFlag;
      store.commit("mainMap/changePanelStatus", {
        editToolsFlag: state.editToolsFlag,
      });
    };
    const startTool = (tool) => {
      if (tool) {
        state.selectTool.name = tool.name;
      } else {
        if (!state.editToolsFlag) {
          state.editToolsFlag = true;
        }
      }
    };
    const switchPage = () => {
      store.commit("mainMap/changePanelStatus", {
        allRecentToolsFlag: !allRecentToolsFlag.value,
      });
    };
    const changePopover = () => {
      state.popoverVisible = !state.popoverVisible;
    };
    return {
      state,
      rightDrawer,
      currentRightPanel,
      allRecentToolsFlag,
      selectToolList,
      getImgurl,
      startDefaultTool,
      toggle,
      toggleEditTools,
      startTool,
      switchPage,
      changePopover,
    };
  },
};
</script>
<style scoped>
.map-toolbar {
  position: absolute;
  box-shadow: 0 0 10px #93bbff;
  background-color: #fff;
  right: 10px;
  top: calc(50% - 186px);
  font-size: 0px; /*去掉div之间的空隙，注意在子要素中进行覆盖*/
}

.map-toolbar .tools-switch {
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #d2e1ff;
}

.map-toolbar .tools-switch:not(.disabled):hover,
.tools-switch:not(.disabled).active {
  background-color: rgba(88, 150, 255, 0.1);
}

.map-toolbar .tools-switch.disabled {
  cursor: default;
}

.map-toolbar .tools-switch.bottom {
  width: 40px;
  display: inline-block;
  float: left;
  box-shadow: 0 0 10px #93bbff;
  background-color: #ffffff;
  cursor: pointer;
}

.map-toolbar ul.tools-ul {
  display: inline-block;
  width: 40px;
  margin-bottom: 0;
  text-align: center;
  border-radius: 3px;
  box-shadow: none;
  vertical-align: top;
  padding: 0;
}

.map-toolbar ul.tools-ul > li {
  width: 40px;
  border-bottom: 1px solid #d2e1ff;
  list-style: none;
  background-color: #ffffff;
  font-size: 12px;
  height: 30px;
  color: #182848;
  line-height: 27px;
}

img {
  border-style: none;
  vertical-align: middle;
}

.map-toolbar ul.tools-ul.right > li {
  border-left: 1px solid #d2e1ff;
}

.map-toolbar ul.tools-ul > li.tool {
  cursor: pointer;
}

.map-toolbar ul.tools-ul > li.tool:hover {
  background-color: rgba(88, 150, 255, 0.1);
}

/*.map-toolbar ul.tools-ul > li > span {
      font-size: 12px;
  }*/
.map-toolbar ul.tools-ul > li.active {
  background-color: rgba(88, 150, 255, 0.1);
  overflow: hidden;
}

.map-toolbar ul.tools-ul > li .batchIcon {
  height: 0;
  width: 0;
  position: absolute;
  top: 41px;
  left: 32px;
  border-left: 8px solid transparent;
  border-bottom: 8px solid #636ef5;
}

.select-tool .popover {
  top: 20px !important;
  margin-left: -1px !important;
  width: 100px;
  padding: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: 0;
  box-shadow: 0 0 10px 1px #93bbff;
}

.select-tool .popover.popoverBatch {
  top: 80px !important;
}

.open-tool-normal {
  width: 40px;
  height: 20px;
  background: url(~@/assets/images/tool/open-tool-normal.png) no-repeat center;
}

.open-tool-normal:hover {
  background: url(~@/assets/images/tool/open-tool-active.png) no-repeat center;
}

.hide-tool-normal {
  width: 40px;
  height: 20px;
  background: url(~@/assets/images/tool/hide-tool-normal.png) no-repeat center;
}

.tools-switch-icon {
  width: 40px;
  height: 20px;
}

.btn-not-allowed {
  cursor: not-allowed;
}
.switchtool {
  border-bottom: 1px solid #d2e1ff;
  background-color: #ffffff;
  height: 30px;
  line-height: 30px;
}
.popoverTool {
  height: 30px;
  line-height: 30px;
  border: 1px solid #d2e1ff;
  padding-left: 10px;
  cursor: pointer;
}
.popoverTool:hover {
  background-color: aliceblue;
}
.popoverActive {
  background-color: aliceblue;
}
.popoverActive:focus {
  outline: none;
}
</style>
