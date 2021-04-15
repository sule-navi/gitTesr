<!--
 * @Author: Sule
 * @Date: 2021-04-07 15:58:29
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-07 16:06:27
 * @Description: 
-->
<!--
 * @Author: Sule
 * @Date: 2019-12-12 17:07:49
 * @LastEditors: Sule
 * @LastEditTime: 2020-10-29 10:11:21
 * @Description: 
 -->
<template>
  <div class="error-page">
    <div class="error-code">
      <div class="what"></div>
      <div style="float: left">Sorry!</div>
    </div>
    <div class="error-desc">你暂时没有此库的菜单权限! 请联系运维管理员配置权限!</div>
    <div class="error-handle">
      <el-button class="error-btn" type="primary" size="large" @click="goBack"
        >返回登录页</el-button
      >
    </div>
  </div>
</template>

<script>
import auth from "@/utils/auth";
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
    setup() {
        const router = useRouter();
        const goBack = () => {
            router.push("/login");
        }
        return {
            goBack
        }
    }
  }
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  box-sizing: border-box;
}
.what {
  width: 160px;
  height: 100%;
  background-size: 100% 100%;
  float: left;
  background-image: url(../assets/images/what.svg);
}
.error-code {
  line-height: 1;
  font-size: 150px;
  font-weight: bolder;
  color: #f02d2d;
  margin: 50px 0;
}
.error-desc {
  font-size: 30px;
  color: #777;
}
.error-handle {
  margin-top: 30px;
  padding-bottom: 200px;
}
</style>
