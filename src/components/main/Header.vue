<!--
 * @Author: Sule
 * @Date: 2021-04-07 16:40:10
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-09 14:51:55
 * @Description: 
-->
<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">OneMapStudio</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <span class="el-icon-s-custom"></span>
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import auth from "@/utils/auth";
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Header",
  setup(props) {
    const store = useStore();
    const state = reactive({
      fullscreen: false,
      message: 2,
    });
    const router = useRouter();
    const collapse = computed(() => {
      return store.state.main.collapse;
    });
    const username = computed(() => {
      return "admin";
    });
    /**
     * @description:
     * @param {*} command
     * @return {*}
     * @author: Sule
     */
    const handleCommand = (command) => {
      if (command == "loginout") {
        router.push("/login");
      }
    };
    /**
     * @description:
     * @param {*}
     * @return {*}
     * @author: Sule
     */
    const collapseChage = () => {
      store.commit("main/changeCollapseStatus");
    };

    return {
      ...toRefs(state),
      collapse,
      username,
      handleCommand,
      collapseChage,
    };
  },
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #ffffff;
  background-color: #409EFF;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
  text-align: left;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-right: 7px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color:#ffffff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
