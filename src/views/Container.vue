<!--
 * @Author: Sule
 * @Date: 2019-12-12 17:57:34
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-08 16:16:30
 * @Description: 
 -->  
<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <div class="content">
        <!-- <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
        <el-backtop target=".content"></el-backtop> -->
           <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
                <keep-alive>
                    <component :is="Component"/>
                </keep-alive>
            </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from '@/components/main/Header.vue';
import vSidebar from '@/components/main/Sidebar.vue';
import { reactive, computed, onMounted, ref, toRefs } from "vue";
import { useStore } from 'vuex'
export default {
  setup(props) {
    const store = useStore();
    const collapse = computed(() => {
      return store.state.main.collapse;
    });
    onMounted(() => {
      if (document.body.clientWidth < 1400) {
        store.commit("main/changeCollapseStatus");
      }
    });
    return {
      collapse
    }
  },
  components: {
    vHead,
    vSidebar,
  },
};
</script>
<style scoped>
.content-box {
  background-color: #f3f0f0;
  padding-bottom: 20px;
}
</style>