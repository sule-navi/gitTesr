<!--
 * @Author: Sule
 * @Date: 2021-04-15 14:12:11
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-15 14:45:26
 * @Description: leftFloatPanel
-->
<template>
  <div class="leftContainer">
    <div class="header">
        <img src="@/assets/images/common/icon_close.png" @click="closeLeftFloatPanel">
    </div>
   <div>
       左侧浮动框 可用动态组件控制
   </div>
  </div>
</template>

<script>
import {
  reactive,
  onMounted,
  computed,
  onBeforeUnmount,
  ref,
  toRefs,
  watch,
  resolveComponent,
} from "vue";
import { useStore } from "vuex";

export default {
  name: "leftFloatPanel",
  props: [""],
  setup(props) {
    const store = useStore();
    const state = reactive({
    });
    const closeLeftFloatPanel = () => {
     store.commit("mainMap/changePanelStatus", {
          leftFloatFlag: false,
        });
    };
    return {
        closeLeftFloatPanel
    };
  },
};
</script>
<style scoped>
  .header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
    align-items: center;
    background-color: #409EFF;
  }

  .header img {
    cursor: pointer;
    float: right;
    margin-top: 5px;
    margin-top: 12px;
    margin-right: 10px;
  }

  .leftContainer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
    height: 100%;
    width: 300px;
    box-shadow: 0 0 10px #93bbff;
  }
</style>