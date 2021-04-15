<!--
 * @Author: Sule
 * @Date: 2021-04-08 13:50:14
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-12 16:40:39
 * @Description: 
-->
<template>
  <div class="wrappers" v-loading="state.loading">
    <div class="container-top">
      <span class="database-text">我是列表</span>
      <el-button type="primary" size="mini" @click="btn1">弹框加消息</el-button>
      <el-button type="danger" class="top-btn" size="mini" @click="btn2">通知</el-button>
      <el-input placeholder="请搜索" class="search-input" clearable>
        <template #append>
          <el-button icon="el-icon-search"></el-button>
        </template>
      </el-input>
    </div>
    <el-table
      ref="tableData"
      :data="state.tableData"
      height="85%"
      border
      highlight-current-row
      style="width: 100%; height: 85%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="idx" width="50" label="序号"></el-table-column>
      <el-table-column label="名称" width="180">
        <template #default="scope">
            <span class="listName" @click="toMap" :title="scope.row.name"> {{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" type="primary" plain @click="open1">操作按钮</el-button>
      </el-table-column>
    </el-table>
    <div class="container-bottom">
      <el-popconfirm title="这是一段内容确定删除吗？">
        <template #reference>
          <el-button type="primary" size="mini" class="top-btn">气泡框</el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs, h } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage, ElNotification } from "element-plus";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      loading: true,
      tableData: [],
      multipleSelection: [],
    });
    const handleSelectionChange = (val) => {
      state.multipleSelection = val;
    };
    const btn1 = (val) => {
      ElMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    };
    const btn2 = (val) => {
      ElNotification({
        title: "标题名称",
        message: h(
          "i",
          { style: "color: teal" },
          "这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案"
        ),
      });
    };
    const open1 = () => {
      ElMessage.warning({
        message: "该功能暂未实现！",
        type: "warning",
      });
    };
    const toMap = () => {
      router.push({
        path: "/map",
      });
    };
    onMounted(() => {
      state.loading = false;
      state.tableData = [
        {
          idx: 1,
          name: "我是标题1，哈哈哈哈",
        },
        {
          idx: 2,
          name: "我是标题2，哈哈哈哈",
        },
        {
          idx: 3,
          name: "我是标题3，哈哈哈哈",
        },
      ];
    });
    return {
      state,
      btn1,
      btn2,
      open1,
      handleSelectionChange,
      toMap,
    };
  },
};
</script>
<style scoped>
.wrappers {
  height: 100%;
  padding-bottom: 30px;
}
.container-top {
  width: 100%;
  height: 60px;
  background-color: #fff;
}
.database-text {
  float: left;
  line-height: 60px;
  margin-left: 10px;
}
.search-input {
  width: 300px;
  float: right;
  margin-top: 15px;
  margin-right: 2px;
}
.top-btn {
  margin-left: 20px;
  margin-top: 14px;
}
.container-bottom {
  height: 55px;
  background-color: #fff;
}
.el-pagination {
  float: right;
  margin-top: 14px;
  margin-right: 20px;
}
.listName {
  color: #3a8ee6;
  cursor: pointer;
}

.listRedName {
  color: #fc2020;
  cursor: pointer;
}
</style>
