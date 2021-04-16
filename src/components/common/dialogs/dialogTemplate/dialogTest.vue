<!--
 * @Author: Sule
 * @Date: 2021-04-14 15:42:27
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-16 15:56:12
 * @Description: 
-->
<style scoped>
.rdSameNode {
  display: flex;
}
.box-card {
  flex: 1;
}
</style>

<template>
  <div>
    <!-- 暂时直接写 后期使用 分装组件 传入图片即可 -->
    <el-image
      style="width: 400px; height: 400px"
      :src="state.url"
      title="全屏查看"
      :preview-src-list="state.srcList"
    >
    </el-image> 
    <div>
      <div class="imagebtn">
        <span style="color: #409eff;">共 {{state.srcList.length}} 张图片 </span> 
      </div>
      <span class="el-icon-d-arrow-left image-icon" title="上一张" @click="prev" ></span>
      <span class="el-icon-video-play image-icon" title="自动播放" @click="autoPlay"></span>
      <span class="el-icon-video-pause image-icon" title="暂停播放" @click="stopPlay"></span>
      <span class="el-icon-d-arrow-right image-icon" title="下一张" @click="next"></span>
    </div>
    <div style="color: red; margin-top: 10px;">
      <span style="color: red;">tip: 点击图片全屏查看</span>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";

export default {
  name: "dialogTest1",
  setup(props) {
    const timer = ref(null);
    const state = reactive({
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
    });
    const prev = () => {
      const i = state.url;
      const indx = state.srcList.indexOf(i);
      if (indx === 0) {
        state.url = state.srcList[state.srcList.length - 1];
      } else {
        state.url = state.srcList[indx - 1];
      }
    };
    const next = () => {
      const i = state.url;
      const indx = state.srcList.indexOf(i);
      if (indx === state.srcList.length - 1) {
        state.url = state.srcList[0];
      } else {
        state.url = state.srcList[indx + 1];
      }
    };
    const autoPlay = () => {
      if (timer.value) {
        return;
      }
      timer.value = setInterval(() => {
        next();
      }, 3000);
    };
    const stopPlay = () => {
      if (!timer.value) {
        return;
      }
      clearInterval(timer.value);
      timer.value = null;
    };
    return {
      state,
      prev,
      next,
      autoPlay,
      stopPlay,
    };
  },
};
</script>
<style scoped>
.imagebtn {
  margin: 10px 0px 20px 0;
}
</style>
