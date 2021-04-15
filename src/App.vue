<!--
 * @Author: Sule
 * @Date: 2021-03-29 15:26:45
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-08 10:58:57
 * @Description: 
-->
<template>
  <div id="nav"></div>
  <router-view />
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>
<style lang="scss">
@import "./assets/css/main.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
