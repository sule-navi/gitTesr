/*
 * @Author: Sule
 * @Date: 2021-04-14 15:08:10
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-16 14:28:17
 * @Description: 自定义Dialog
 */
import store from '@/store';
import { useRouter } from "vue-router";


let dialogList = [];
const initZIndex = 1599;

class CDialog {
    constructor(options = {}) {
        this.id = options.componentName;
        this.title = options.title;
        this.width = options.width && Number(options.width.replace('px', '')) || 600;
        this.height = options.height && Number(options.height.replace('px', '')) || 390;
        this.content = options.content;
        this.minimize = false;
        this.showSplit = options.showSplit || false;
        this.showMin = options.showMin === false ? false : true;
        this.showClose = options.showClose === false ? false : true;
        this.showShadow = options.showShadow || false;
        this.data = options.data;
        this.style = this.getStyle();
        this.resizeCallback = null;
    }

   
    /**
     * 获取最大的ZIndex
     */
    getMaxZIndex() {
        let max = 0;
        dialogList.forEach(e => {
            if (e.style && e.style.zIndex > max) {
                max = e.style.zIndex;
            }
        })
        // ZIndex初始值需设置为1000，否则被覆盖, ZIndex以10为步长递增
        return max === 0 ? initZIndex : max;
    }

    /**
     * 获取Dialog Style
     */
    getStyle() {
        const left = (window.innerWidth - this.width) / 2 + 'px';
        const top = (window.innerHeight - this.height) / 2 < 10 ? '10px' : (window.innerHeight - this.height) / 2 + 'px';
        const zIndex = this.getMaxZIndex();
        const width = this.width + 'px';
        const height = this.height + 'px';
        return { left: left, top: top, zIndex: zIndex, width: width, padding: '10px', height: height };
    }

    /**
     * 关闭Dialog
     * @param {*} id 
     */
    closeDialog(dialog) {
        dialogList = store.state.mainMap.dialogManagerList;
        for (let i = 0; i < dialogList.length; i++) {
            if (dialog.id === dialogList[i].id) {
                dialogList.splice(i, 1);
                break;
            }
        }
        store.commit("mainMap/changePanelStatus", {
            dialogManagerList: dialogList
        });
    }

    /**
     * 鼠标下压事件
     * @param {*} dialog 
     * @param {*} event 
     */
    panelDialog(dialog, e) {
        const panelDiv = document.getElementById(dialog.id);
        var x = e.clientX - panelDiv.offsetLeft;
        var y = e.clientY - panelDiv.offsetTop;
        document.onmousemove = function (e) {
            panelDiv.style.left = e.clientX - x + 'px';
            panelDiv.style.top = ((e.clientY - y) >= 0 ? e.clientY - y : 0) + 'px';

            dialog.style.left = panelDiv.style.left;
            dialog.style.top = panelDiv.style.top;
        }
        // 清除事件
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = '';
        }
    }

    /**
     * 分屏Dialog
     */
    splitDialog(dialog) {
        const dlgParam = { type: dialog.id, param: dialog.data };
        const url = window.location.origin + window.location.pathname + '#/dialogSplitWin?access_token=' + '&dlgParam=' + JSON.stringify(dlgParam);
        const param = 'width=' + (window.screen.width - 14) + ',height=' + (window.screen.height - 100);
        // 轨迹照片的分屏单独处理
        if (dialog.id === 'TrackPictureWin') {
            window.open(this.router.resolve({ name: "trackPicture", query: dlgParam }).href, dialog.title, param);
        } else {
            window.dialogSplitWin = window.open(url, dialog.title, param); // 将打开的新窗体的对象存在window中
        }
        this.closeDialog(dialog);
    }

    /**
     * 缩小Dialog
     */
    minDialog(dialog, event) {
        dialog.minimize = true;
        store.commit("mainMap/changePanelStatus", {
            miniDialogFlag: true
        });
    }

    /**
     * 重置弹出框大小 鼠标下压事件
     * @param {*} dialog 
     * @param {*} event 
     */
    resizeDialog(dialog, e) {
        const panelDiv = document.getElementById(dialog.id);
        var x = e.clientX - panelDiv.offsetWidth;
        var y = e.clientY - panelDiv.offsetHeight;
        document.onmousemove = function (e) {
            panelDiv.style.width = e.clientX - x + 'px';
            panelDiv.style.height = e.clientY - y + 'px';

            dialog.style.width = panelDiv.style.width;
            dialog.style.height = panelDiv.style.height;
        }
        // 清除事件
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = '';
            if (dialog.resizeCallback && typeof dialog.resizeCallback === 'function') {
                const contentHeight = $('.dialog-content').height();
                dialog.resizeCallback({ contentHeight: contentHeight });
            }
        }
    }
    moveToTop(dialog) {
        dialogList = store.state.mainMap.dialogManagerList
        dialogList.forEach(e => {
            e.style.zIndex = initZIndex;
        })
        dialog.style.zIndex = 1600;
    }
}

const dialogManager = {

    /**
     * 创建Dialog
     * @param {*} options 
     */
    createDialog: function (options) {
        // dialogList.push(new CDialog(options));
        const d = new CDialog(options);
        store.commit("mainMap/changePanelStatus", {
            dialogManagerList: [...store.state.mainMap.dialogManagerList, d]
        });
    },

    closeAllDialog: function () {
        dialogList = store.state.mainMap.dialogManagerList;
        for (let i = dialogList.length - 1; i >= 0; i--) {
            dialogList.splice(i, 1);
        }
    },
    getDialogByName: function (name) {
        dialogList = store.state.mainMap.dialogManagerList;
        return dialogList.filter(e => e.id === name)[0];
    },
    closeDialog: function (name) {
        dialogList = store.state.mainMap.dialogManagerList;
        for (let i = 0; i < dialogList.length; i++) {
            if (dialogList[i].id === name) {
                dialogList.splice(i, 1);
            }
        }
    },
    resetDialogTitle: function (name, title) {
        const dialog = this.getDialogByName(name);
        dialog.title = title;
    }
}

export default dialogManager;