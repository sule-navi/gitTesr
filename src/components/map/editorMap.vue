<!--
 * @Author: Sule
 * @Date: 2021-04-12 13:55:01
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-12 16:44:29
 * @Description: 地图组件
-->
<template>
  <div style="display: flex; height: 100%">
    <div style="flex: 1" ref="editorMap">
        我是地图组件  （浅绿色部分为地图）
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";
export default {
  name: "editor-map",
  setup() {
    const editorMap = ref(null);
    const state = reactive({
    });
    return {
      ...toRefs(state),
      editorMap,
    };
  },
};
</script>

<style scoped>
.map-container {
  height: 100%;
  width: 100%;
  background-color: #f7f5f5;
}
</style>
