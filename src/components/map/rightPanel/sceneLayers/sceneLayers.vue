<!--
 * @Author: Sule
 * @Date: 2021-04-13 17:11:04
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-15 14:48:26
 * @Description: 
-->
<template>
  <div class="fm-panel map-toolbar-panel">
    <div class="header">
      <div class="title">图层渲染</div>
      <span class="closeLayers" @click="closePanel"></span>
    </div>
    <div class="content" style="height: calc(100% + 40px)">这里放图层</div>
  </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  name: "sceneLayers",
  props: [""],
  setup(props) {
    const store = useStore();
    const state = reactive({});
    const closePanel = () => {
      store.commit("mainMap/changePanelStatus", {
        rightDrawer: false,
        currentRightPanel: "toolPanel",
      });
    };
    return {
      state,
      closePanel,
    };
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.closeLayers {
  position: absolute;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(~@/assets/images/common/icon_close.png) no-repeat;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

.fm_collapse_item_header {
  padding-left: 10px;
  color: #409EFF;
}

.fm-panel {
  min-width: 300px;
  min-height: 200px;
  height: 100%;
}

.search-box {
  padding: 5px;
}

.map-toolbar-panel {
  /*height: 340px;*/
  font-size: 0px; /*去掉div之间的空隙，注意在子要素中进行覆盖*/
  padding-top: 80px;
}

.map-toolbar-panel .header {
  margin-top: -80px;
}

.map-toolbar-panel ul.tools-group-ul {
  margin: 0;
  box-shadow: none;
  width: 300px;
}

.map-toolbar-panel ul.tools-group-ul > li {
  list-style: none;
  display: inline-block;
  border: 1px solid transparent;
  width: 86px;
  height: 80px;
  padding-top: 6px;
  margin-left: 8px;
  margin-top: 5px;
  vertical-align: top;
}

.map-toolbar-panel ul.tools-group-ul > li.tool {
  font-size: 12px;
  color: #182848;
  border-radius: 5px;
  cursor: pointer;
}

.map-toolbar-panel ul.tools-group-ul > li.tool:hover {
  background-color: #e0e2fd;
  border: solid 1px rgba(99, 110, 245, 0.7);
}

.map-toolbar-panel ul.tools-group-ul > li.active {
  background-color: #e0e2fd;
}

.map-toolbar-panel ul.tools-group-ul > li.tool.selected {
  background-color: #fffcf0;
  border: solid 1px #ffcc99;
}

.map-toolbar-panel ul.tools-group-ul > li.tool.disabled {
  background-color: #efefef;
  cursor: not-allowed;
  color: #999;
}

.map-toolbar-panel .header .title {
  font-size: 14px;
}

.fm-panel > .header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0px 10px;
  background-color: #409EFF;
}

.fm-panel > .header > .title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
}
</style>
