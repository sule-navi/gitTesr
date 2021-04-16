<!--
 * @Author: Sule
 * @Date: 2020-03-17 17:40:24
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-15 15:38:22
 * @Description: 
 -->
<template>
  <div
    class="customDialog"
    :class="{
      shadowDialog: shadowDialog,
    }"
  >
    <div
      v-for="dialog in dialogList"
      :key="dialog.id"
      class="dialog-panel"
      :style="dialog.style"
      v-show="!dialog.minimize"
      :id="dialog.id"
    >
      <div class="dialog-title" @click="dialog.moveToTop(dialog)">
        <div class="title-text" @mousedown="dialog.panelDialog(dialog, $event)">
          {{ dialog.title }}
        </div>
        <div class="dialog-button">
          <button
            class="dialog-split"
            title="分屏"
            @click="dialog.splitDialog(dialog)"
            v-show="dialog.showSplit"
          ></button>
          <button
            class="dialog-minimize"
            title="缩小"
            @click="dialog.minDialog(dialog)"
            v-show="dialog.showMin"
          ></button>
          <button
            class="dialog-close"
            title="关闭"
            @click="dialog.closeDialog(dialog)"
            v-show="dialog.showClose"
          ></button>
        </div>
      </div>
      <div class="dialog-content">
        <component
          :is="dialog.content"
          :data="dialog.data"
          :fatherDialog="dialog"
        ></component>
      </div>
      <div>
        <button
          class="dialog-resize"
          @mousedown="dialog.resizeDialog(dialog, $event)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";
import dialogTest from "./dialogTemplate/dialogTest.vue";
import dialogTest1 from "./dialogTemplate/dialogTest1.vue";
import { useStore } from "vuex";
export default {
  name: "customDialog",
  components: {
    dialogTest,
    dialogTest1,
  },
  setup(props) {
    const store = useStore();
    const dialogList = computed(() => {
      return store.state.mainMap.dialogManagerList;
    });
    const shadowDialog = computed(() => { // 控制遮罩框 只要有一个存在切打开就存在
      const dl =  store.state.mainMap.dialogManagerList.filter((e) => !e.minimize).filter((e) => e.showShadow);
      return dl.length ? true : false;
    });
    return {
      dialogList,
      shadowDialog,
    };
  },
};
</script>

<style scoped>
.shadowDialog {
  top: 0;
  position: absolute;
  background-color: rgba(100, 100, 100, 0.2);
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.dialog-panel {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 4px 20px #5c78a7;
  overflow: auto;
  z-index: 2999;
}
.dialog-content {
  height: calc(100% - 53px);
}
.dialog-split {
  background: url(~@/assets/images/dialog/split.svg) no-repeat;
}
.dialog-minimize {
  background: url(~@/assets/images/dialog/mini.png) no-repeat;
}
.dialog-close {
  background: url(~@/assets/images/dialog/close.png) no-repeat;
}
.dialog-resize {
  position: absolute;
  bottom: 0;
  right: 4px;
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0;
  cursor: se-resize;
  user-select: none;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzREODAwQzcyRjZDMTFFMjg5NkREMENBNjJERUE4Q0IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzREODAwQzgyRjZDMTFFMjg5NkREMENBNjJERUE4Q0IiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNEQ4MDBDNTJGNkMxMUUyODk2REQwQ0E2MkRFQThDQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNEQ4MDBDNjJGNkMxMUUyODk2REQwQ0E2MkRFQThDQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuQy0VQAAACLSURBVHjaYpw9ezYDEUARiO8zEaHQHohPArEcCxEK1wGxPxA/wmeyDZLCIyABJjwKNwJxEFShIi7FyAoPArEZEB8DYi0mHFaHIikEaUwE4mtMWBRGAPE+NIU7kJ0BUxiNQyFInpMJKgFTuBuLQj8gXg3yJCicHyFZDQJfgDgOqhEE3gGxD8jNAAEGADlXJQUd3J75AAAAAElFTkSuQmCC)
    no-repeat;
  height: 15px;
  width: 10px;
}
.dialog-title button {
  width: 20px;
  height: 20px;
  border: 0;
  margin-left: 10px;
  cursor: pointer;
}
.dialog-button {
  display: flex;
  height: 40px;
  flex-direction: row;
  align-items: center;
  padding-left: 2px;
  vertical-align: middle;
}
.title-text {
  display: flex;
  flex: 1;
  flex-direction: row;
  color: #fa5883;
  font-size: 14px;
  font-weight: bold;
  padding: 0px;
  cursor: move;
}
.dialog-title {
  height: 40px;
  line-height: 40px;
  padding: 0px 20px;
  flex-shrink: 0;
  align-items: flex-end;
  position: relative;
  display: flex;
}
</style>
