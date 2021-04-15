
<!--
 * @Author: Sule
 * @Date: 2019-12-28 16:23:11
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-13 17:23:04
 * @Description: 
-->
<template>
  <component :is="state.currentPanel" keep-alive></component>
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
  extend,
} from "vue";
import { useStore } from "vuex";
import toolPanel from "./tool/ToolPanel.vue";
import sceneLayers from "./sceneLayers/sceneLayers.vue";
import propertyPanel from "./propertyPanel/propertyPanel.vue";

export default {
  name: "RightPanel",
  props: [],
   components: {
    toolPanel,
    sceneLayers,
    propertyPanel,
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      currentPanel: null,
    });
    const currentRightPanel = computed(() => {
      return store.state.mainMap.currentRightPanel;
    });
    const initComponent = (currentRightPanel) => {
      state.currentPanel = currentRightPanel;
    };
    initComponent(currentRightPanel.value || "toolPanel");
    onMounted(() => {
    });
    watch(currentRightPanel, (currentRightPanel, prevCount) => {
      initComponent(currentRightPanel);
    });
    return {
      state,
      currentRightPanel,
      initComponent,
    };
  },
};
</script>
<style scoped>
.propertyPanel {
  height: 100%;
}
header {
  height: 40px;
  background-color: #636ef5;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.flex1 {
  flex: 1;
}
header .close {
  width: 40px;
}
</style>
