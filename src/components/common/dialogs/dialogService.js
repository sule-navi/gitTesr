/*
 * @Author: Sule
 * @Date: 2021-04-14 15:37:43
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-15 10:50:22
 * @Description: 
 */
const dialogService = {};
// 各个子组件要在customDialog中引入
const config = {
    dialogTest: {
        title: '测试弹框1',
        width: '800px',
        height: '550px',
        showSplit: true, // 如果设置分屏要在dialogSplitWin.vue中去导入组件
        showClose: true,
        showMin: true,
        component: 'dialogTest' // 组件名 和key值保持一致
    },
    dialogTest1: {
        title: '测试弹框2222',
        width: '800px',
        height: '550px',
        showSplit: true, // 如果设置分屏要在dialogSplitWin.vue中去导入组件
        showClose: true,
        showMin: true,
        showShadow: true,
        component: 'dialogTest1' // 组件名 和key值保持一致
    }
}

dialogService.getComponentMap = (componentName) => {
    return config[componentName];
};

export default dialogService;