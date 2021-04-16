<template>
  <div class="float-drawer" :style="styles">
    <slot></slot>
    <div class="extend-btn" :style="extendBtnStyles" @click="extendPanel">
      {{ extendBtnContent }}
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";

export default {
  name: "FloatDrawer",
  props: {
    direction: {
      type: String,
      default: "rtl",
    },
    visable: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const state = reactive({
      extendBtnContent: ">",
      maximize: false,
      size: "300px",
    });
    const styles = computed(() => {
      const style = {};
      switch (props.direction) {
        case "rtl":
          style.height = "100%";
          style.width = state.size;
          style.top = "0px";
          style.right = "0px";
          break;
        case "btt":
          style.height = state.size;
          style.width = "100%";
          style.bottom = "0px";
          style.left = "0px";
          break;
        case "ltr":
          style.height = "100%";
          style.width = state.size;
          style.top = "0px";
          style.left = "0px";
          break;
        case "ttb":
          style.height = state.size;
          style.width = "100%";
          style.top = "0px";
          style.left = "0px";
          break;
        default:
          break;
      }
      style.display = props.visable ? "inline" : "none";
      return style;
    });
    const extendBtnStyles = computed(() => {
      const style = {};
      // 目前只支持左侧面板
      if (props.direction === "ltr") {
        state.maximize = true;
      }
      if (state.maximize) {
        style.display = "block";
      } else {
        style.display = "none";
      }
      if (state.size === "750px") {
        state.extendBtnContent = "<";
        style.marginRight = "0px";
      } else {
        state.extendBtnContent = ">";
        style.marginRight = "0";
      }
      return style;
    });
    const extendPanel = () => {
      if (state.size !== "750px") {
        state.size = "750px";
      } else {
        state.size = "300px";
      }
    };
    const doClick = () => {
      this.$emit("click");
    };
    return {
      ...toRefs(state),
      styles,
      extendBtnStyles,
      extendPanel,
    };
  },
};
</script>

<style scoped>
.float-drawer {
  position: relative;
  box-shadow: 0 0 10px #93bbff;
  background-color: #fff;
  z-index: 1599;
}
.float-drawer > .extend-btn {
  color: #fff;
  font-size: 13px;
  height: 65px;
  width: 9px;
  border-radius: 5px 0px 0px 5px;
  background-color: #409EFF;
  opacity: 0.5;
  position: absolute;
  font-weight: bold;
  line-height: 60px;
  right: 0px;
  top: 45%;
  text-align: center;
}
.float-drawer > .extend-btn:hover {
  cursor: pointer;
  opacity: 1;
}
</style>
