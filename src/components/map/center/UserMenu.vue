<!--
 * @Author: Sule
 * @Date: 2021-04-12 15:31:49
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-14 17:43:59
 * @Description: 搜索组件
-->
<template>
  <div>
    <el-dropdown @command="menuCommand" placement="bottom-end">
      <span class="el-dropdown-link">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-menu"
          style="padding: 9px"
          title="菜单"
        ></el-button>
      </span>
      <!-- 菜单 -->
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="menu in state.userMenus"
            :command="menu.id"
            :disabled="menu.disabled"
            :key="menu.name"
            @mouseenter.native="showChildList(menu)"
            @mouseleave.native="hideChildList(menu)"
            >{{ menu.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { post } from "@/api/request";

import dialogService from "@/components/common/dialogs/dialogService";
import dialogManager from "@/components/common/dialogs/dialogManager";

export default {
  name: "UserMenu",
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      showHover: "",
      userMenus: [
        {
          id: "propertyPanel",
          name: "打开属性面板",
          disabled: false,
        },
        {
          id: "left",
          name: "打开左侧面板",
          disabled: false,
        },
        {
          id: "dialog",
          name: "打开弹出框1",
          disabled: false,
        },
        {
          id: "dialog1",
          name: "打开弹出框2",
          disabled: false,
        },
        {
          id: "list",
          name: "返回列表",
          disabled: false,
        },
      ],
    });

    /**
     * @description:
     * @param {type}
     * @return {type}
     * @author: Sule
     */
    const showChildList = (menu) => {
      if (menu.children) {
        state.showHover = menu.id;
      }
    };

    /**
     * @description:
     * @param {type}
     * @return {type}
     * @author: Sule
     */
    const hideChildList = (menu) => {
      if (menu.children) {
        setTimeout(function () {
          state.showHover = "";
        }, 100);
      }
    };

    const childClick = (eventName) => {
      if (eventName) {
        eventName();
      }
    };

    const menuCommand = (command) => {
      switch (command) {
        case "list":
          router.push("/list", null, (err) => {
            return; // 处理vue router路由跳转内部异常控制台展示
          });
          break;
        case "left":
          store.commit("mainMap/changePanelStatus", {
            leftDrawer: true,
          });
          break;
        case "propertyPanel":
          store.commit("mainMap/changePanelStatus", {
            rightDrawer: true,
            currentRightPanel: "propertyPanel",
          });
          break;
        case "dialog": // 后续全局引入事件机制后 移动到Map中去 用事件触发 创建和关闭等功能
          const dialogObj = store.state.mainMap.dialogManagerList
            .filter((e) => e.id === "dialogTest");
          if (dialogObj.length > 0) {
            return;
          }
          const options = dialogService.getComponentMap("dialogTest");
          const dialog = {
            visible: true,
            title: options.title,
            width: options.width || "800px",
            height: options.height,
            showSplit: options.showSplit,
            showMin: options.showMin,
            showClose: options.showClose,
            showShadow: options.showShadow,
            componentName: options.component,
            content: options.component,
            data: [], //传入数据
          };
          dialogManager.createDialog(dialog);
          break;
        case "dialog1": // 后续全局引入事件机制后 移动到Map中去 用事件触发 创建和关闭等功能
          const dialogObj1 =  store.state.mainMap.dialogManagerList
            .filter((e) => e.id === "dialogTest1");
          if (dialogObj1.length > 0) {
            return;
          }
          const options1 = dialogService.getComponentMap("dialogTest1");
          const dialog1 = {
            visible: true,
            title: options1.title,
            width: options1.width || "800px",
            height: options1.height,
            showSplit: options1.showSplit,
            showMin: options1.showMin,
            showClose: options1.showClose,
            showShadow: options1.showShadow,
            componentName: options1.component,
            content: options1.component,
            data: [], //传入数据
          };
          dialogManager.createDialog(dialog1);
          break;
      }
    };
    return {
      state,
      showChildList,
      hideChildList,
      childClick,
      menuCommand,
    };
  },
};
</script>
<style scoped>
.childrenList {
  position: absolute;
  /* left: -64px; */
  list-style: none;
  background-color: #ffffff;
  box-shadow: 0 2px 6px 0 #93bbff;
  cursor: pointer;
  margin-top: -25px;
  margin-left: -81px;
}
.childrenList li {
  border: 1px solid #fff;
  list-style: none;
  background-color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 12px;
  padding: 5px 10px;
  color: #182848;
}
.childrenList li:hover {
  background-color: rgba(88, 150, 255, 0.1);
}
.el-dropdown .el-icon-menu {
  font-size: 18px;
}
.el-button--primary {
  color: #9ba2f9;
  background-color: #ffffff;
  box-shadow: 0 0 10px #93bbff;
  border: none;
  border-radius: 0px;
}
</style>
