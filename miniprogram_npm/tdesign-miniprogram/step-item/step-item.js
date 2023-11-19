var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { wxComponent, SuperComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-steps-item`;
let StepItem = class StepItem extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.relations = {
            '../steps/steps': {
                type: 'parent',
            },
        };
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-content`,
            `${prefix}-class-title`,
            `${prefix}-class-description`,
            `${prefix}-class-extra`,
        ];
        this.properties = props;
        this.data = {
            classPrefix: name,
            prefix,
            index: 0,
            isDot: false,
            curStatus: '',
            layout: 'vertical',
            isLastChild: false,
        };
        this.methods = {
            updateStatus(current, currentStatus, index, theme, layout, steps) {
                let curStatus = this.data.status;
                if (curStatus === 'default') {
                    if (index < Number(current)) {
                        curStatus = 'finish';
                    }
                    else if (index === Number(current)) {
                        curStatus = currentStatus;
                    }
                }
                this.setData({
                    curStatus,
                    index,
                    isDot: theme === 'dot',
                    layout,
                    theme,
                    isLastChild: steps.length - 1 === index,
                });
            },
            onTap() {
                this.$parent.handleClick(this.data.index);
            },
        };
    }
};
StepItem = __decorate([
    wxComponent()
], StepItem);
export default StepItem;
