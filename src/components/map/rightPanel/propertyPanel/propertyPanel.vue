<!--
 * @Author: Sule
 * @Date: 2021-04-13 17:21:32
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-16 11:30:35
 * @Description: 
-->
<!--
 * @Author: Sule
 * @Date: 2021-04-13 17:11:04
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-13 17:19:37
 * @Description: 
-->
<template>
  <div class="fm-panel map-toolbar-panel">
    <div class="header">
      <div class="title">属性面板常用组件展示</div>
    </div>
    <div class="content" style="height: calc(100% + 40px)">
      <!-- 这里放要素的属性面板 后期用动态组件显示各个要素属性面板 -->
      <!-- 属性面板内组件实例 -->
      <el-collapse v-model="activeNames">
        <el-collapse-item title="一致性 Consistency" name="1">
          <el-form label-position="left" label-width="80px" size="mini">
            <el-form-item label="名称">
              <span>我是名称</span>
            </el-form-item>
            <el-form-item label="我是输入框">
              <el-input v-model="input" size="mini"></el-input>
              <el-input v-model="input" size="mini" disabled></el-input>
            </el-form-item>
            <el-form-item label="我是数字输入框">
              <el-input-number
                v-model="num"
                controls-position="right"
                :min="1"
                :max="10"
              ></el-input-number>
              <el-input-number
                size="mini"
                v-model="num"
                :min="1"
                :max="10"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="我是选择框">
              <el-select v-model="select" placeholder="请选择">
                <el-option :value="1" label="选项1"> 选项1</el-option>
                <el-option :value="2" disabled label="选项2"> 选项2</el-option>
                <el-option :value="3" label="选项3"> 选项3</el-option>
                <el-option :value="4" label="选项4"> 选项4</el-option>
              </el-select>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="我是选择框 可创建条目">
              <el-select
                v-model="value"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-divider></el-divider>
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>卡片名称</span>
                  <el-button class="button" type="text">操作按钮</el-button>
                </div>
              </template>
              <div class="text item">列表内容1111111111111111111111111</div>
              <div class="text item">列表内容2222222222222222222222222</div>
              <div class="text item">列表内容3333333333333333333333333</div>
            </el-card>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
          <el-form label-position="left" label-width="80px" size="mini">
            <el-form-item label="我是单选按钮">
              <el-radio v-model="num" :label="1">备选项1</el-radio>
              <el-radio v-model="num" :label="2">备选项2</el-radio>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="我是复选按钮">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-divider></el-divider>
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>时间选择</span>
                </div>
              </template>
              <div class="block" style="width: 100%">
                <el-date-picker
                  style="width: 100%"
                  v-model="value1"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
            </el-card>
            <el-divider></el-divider>
            <el-form-item label="标签">
              <el-tag>标签一</el-tag>
              <el-tag type="success">标签二</el-tag>
              <el-tag type="info">标签三</el-tag>
              <el-tag type="warning">标签四</el-tag>
              <el-tag type="danger">标签五</el-tag>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
          <el-form label-position="left" label-width="80px" size="mini">
            <el-tabs type="border-card">
              <el-tab-pane label="table1">用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</el-tab-pane>
              <el-tab-pane label="table2">结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</el-tab-pane>
              <el-tab-pane label="table3">用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</el-tab-pane>
              <el-tab-pane label="table4">用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</el-tab-pane>
            </el-tabs>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>
            用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
          </div>
          <div>
            结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
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
} from "vue";
export default {
  name: "propertyPanel",
  props: [""],
  setup(props) {
    const input = ref("输入框");
    const select = ref(3);
    const checkList = ref(["选中且禁用", "复选框 A"]);
    const value = ref([]);
    const value1 = ref([]);
    const options = ref([
      {
        value: "HTML",
        label: "HTML",
      },
      {
        value: "CSS",
        label: "CSS",
      },
      {
        value: "JavaScript",
        label: "JavaScript",
      },
    ]);
    const num = ref(2);
    const state = reactive({
      activeNames: ["1", "2", "3", "4"],
    });
    return {
      ...toRefs(state),
      input,
      select,
      num,
      checkList,
      value,
      options,
      value1,
    };
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.content {
  overflow-y: auto;
  text-align: left;
}
.fm_collapse_item_header {
  padding-left: 10px;
  color: #409eff;
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
  background-color: #409eff;
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
.el-form {
  padding: 5px;
}
.el-form >>> .el-form-item .el-form-item__content {
  font-size: 12px;
  line-height: 16px;
  padding-right: 6px !important;
}
.content >>> .el-card__header {
  padding: 2px;
}
.content >>> .el-card__body {
  padding: 2px;
  font-size: 12px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  margin: 5px 0px;
}
</style>
