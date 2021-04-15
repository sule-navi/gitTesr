<!--
 * @Author: Sule
 * @Date: 2021-04-07 16:51:12
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-08 17:07:58
 * @Description: 
-->
<!--
 * @Author: Sule
 * @Date: 2019-12-12 18:07:47
 * @LastEditors: Sule
 * @LastEditTime: 2020-10-29 10:18:01
 * @Description: 
 -->
<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#ffffff"
      text-color="#191717"
      active-text-color="#0e87ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{
                subItem.title
              }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template >
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Sidebar",
  setup() {
    const store = useStore();
    const router = useRouter();
    const collapse = computed(() => {
      return store.state.main.collapse;
    });
    const onRoutes = computed(() => {
      return router.currentRoute._value.path.replace("/", "");
    });
    const items = computed(() => {
      let arr = [
        {
          icon: "el-icon-notebook-2",
          index: "list",
          title: "作业列表",
        },
        {
          icon: "el-icon-notebook-1",
          index: "lsist",
          title: "作业列表1111",
        },
      ];
      return arr;
    });
    return {
      collapse,
      onRoutes,
      items,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  color: #191717;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
.el-menu-item i {
  color: #191717;
}
.el-menu-item li {
  color: #191717;
}
.el-menu-item.is-active i {
  color: #0e87ff;
}
.el-menu-item:hover {
  background-color: #ecf5ff !important;
}
</style>
