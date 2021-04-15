<!--
 * @Author: Sule
 * @Date: 2021-04-15 10:10:52
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-15 10:48:26
 * @Description: 
-->
<template>
  <div style="height: 100%">
    <component :is="state.splitWin" keep-alive ref="childDialog"></component>
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
import auth from "@/utils/auth";
import dialogTest from "./dialogTemplate/dialogTest.vue";
import dialogTest1 from "./dialogTemplate/dialogTest1.vue";

import dialogService from "@/components/common/dialogs/dialogService";

// 接收窗体通过window.postMessage发送过来的数据
window.addEventListener("message", function (data) {});

export default {
  name: "splitWin",
  components: {
    dialogTest,
    dialogTest1,
  },
  setup(props) {
    const store = useStore();
    const childDialog = ref(null);
    const state = reactive({
      splitWin: null,
    });
    onMounted(() => {
      const data = JSON.parse(auth.getUrlParam("dlgParam"));
      const options = dialogService.getComponentMap(data.type);
      if (options) {
        state.splitWin = options.component;
      }
    });
    return {
      state,
      childDialog,
    };
  },
};
</script>

<style scoped></style>
