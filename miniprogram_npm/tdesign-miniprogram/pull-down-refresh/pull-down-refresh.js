var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-pull-down-refresh`;
let PullDownRefresh = class PullDownRefresh extends SuperComponent {
    constructor() {
        super(...arguments);
        this.pixelRatio = 1;
        this.startPoint = null;
        this.isPulling = false;
        this.maxBarHeight = 0;
        this.loadingBarHeight = 200;
        this.maxRefreshAnimateTimeFlag = 0;
        this.closingAnimateTimeFlag = 0;
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-loading`, `${prefix}-class-tex`, `${prefix}-class-indicator`];
        this.options = {
            multipleSlots: true,
        };
        this.relations = {
            '../back-top/back-top': {
                type: 'descendant',
            },
        };
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
            barHeight: 0,
            refreshStatus: -1,
            loosing: false,
            enableToRefresh: true,
            scrollTop: 0,
        };
        this.lifetimes = {
            attached() {
                const { screenWidth } = wx.getSystemInfoSync();
                const { maxBarHeight, loadingBarHeight } = this.properties;
                this.pixelRatio = 750 / screenWidth;
                if (maxBarHeight) {
                    this.maxBarHeight = this.toRpx(maxBarHeight);
                }
                if (loadingBarHeight) {
                    this.setData({
                        computedLoadingBarHeight: this.toRpx(loadingBarHeight),
                    });
                    this.loadingBarHeight = this.toRpx(loadingBarHeight);
                }
            },
            detached() {
                clearTimeout(this.maxRefreshAnimateTimeFlag);
                clearTimeout(this.closingAnimateTimeFlag);
            },
        };
        this.observers = {
            value(val) {
                if (!val) {
                    clearTimeout(this.maxRefreshAnimateTimeFlag);
                    this.setData({ refreshStatus: 3 });
                    this.close();
                }
            },
            maxBarHeight(val) {
                this.maxBarHeight = this.toRpx(val);
            },
            loadingBarHeight(val) {
                this.setData({
                    computedLoadingBarHeight: this.toRpx(val),
                });
                this.loadingBarHeight = this.toRpx(val);
            },
        };
        this.methods = {
            onScrollToBottom() {
                this.triggerEvent('scrolltolower');
            },
            onScrollToTop() {
                this.setData({
                    enableToRefresh: true,
                });
            },
            onScroll(e) {
                const { scrollTop } = e.detail;
                this.setData({
                    enableToRefresh: scrollTop === 0,
                });
                this.triggerEvent('scroll', { scrollTop });
            },
            onTouchStart(e) {
                if (this.isPulling || !this.data.enableToRefresh)
                    return;
                const { touches } = e;
                if (touches.length !== 1)
                    return;
                const { pageX, pageY } = touches[0];
                this.setData({ loosing: false });
                this.startPoint = { pageX, pageY };
                this.isPulling = true;
            },
            onTouchMove(e) {
                if (!this.startPoint)
                    return;
                const { touches } = e;
                if (touches.length !== 1)
                    return;
                const { pageY } = touches[0];
                const offset = pageY - this.startPoint.pageY;
                const barHeight = this.toRpx(offset);
                if (barHeight > 0) {
                    if (barHeight > this.maxBarHeight) {
                        this.setRefreshBarHeight(this.maxBarHeight);
                    }
                    else {
                        this.setRefreshBarHeight(barHeight);
                    }
                }
            },
            onTouchEnd(e) {
                if (!this.startPoint)
                    return;
                const { changedTouches } = e;
                if (changedTouches.length !== 1)
                    return;
                const { pageY } = changedTouches[0];
                const barHeight = this.toRpx(pageY - this.startPoint.pageY);
                this.startPoint = null;
                this.setData({ loosing: true });
                if (barHeight > this.loadingBarHeight) {
                    this.setData({
                        barHeight: this.loadingBarHeight,
                        refreshStatus: 2,
                    });
                    this.triggerEvent('change', { value: true });
                    this.triggerEvent('refresh');
                    this.maxRefreshAnimateTimeFlag = setTimeout(() => {
                        this.maxRefreshAnimateTimeFlag = null;
                        if (this.data.refreshStatus === 2) {
                            this.triggerEvent('timeout');
                            this.close();
                        }
                    }, this.properties.refreshTimeout);
                }
                else {
                    this.close();
                }
            },
            toRpx(v) {
                if (typeof v === 'number')
                    return v * this.pixelRatio;
                return parseInt(v, 10);
            },
            toPx(v) {
                return v / this.pixelRatio;
            },
            setRefreshBarHeight(barHeight) {
                const data = { barHeight };
                if (barHeight >= this.loadingBarHeight) {
                    data.refreshStatus = 1;
                }
                else {
                    data.refreshStatus = 0;
                }
                return new Promise((resolve) => {
                    this.setData(data, () => resolve(barHeight));
                });
            },
            close() {
                const animationDuration = 240;
                this.setData({ barHeight: 0 });
                this.triggerEvent('change', { value: false });
                this.closingAnimateTimeFlag = setTimeout(() => {
                    this.closingAnimateTimeFlag = null;
                    this.setData({ refreshStatus: -1 });
                    this.isPulling = false;
                }, animationDuration);
            },
            setScrollTop(scrollTop) {
                this.setData({ scrollTop });
            },
            scrollToTop() {
                this.setScrollTop(0);
            },
        };
    }
};
PullDownRefresh = __decorate([
    wxComponent()
], PullDownRefresh);
export default PullDownRefresh;
