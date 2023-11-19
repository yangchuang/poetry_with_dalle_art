var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import config from '../common/config';
import { SuperComponent, wxComponent } from '../common/src/index';
import Props from './props';
const { prefix } = config;
const name = `${prefix}-radio`;
let Radio = class Radio extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-label`,
            `${prefix}-class-icon`,
            `${prefix}-class-content`,
            `${prefix}-class-border`,
        ];
        this.behaviors = ['wx://form-field'];
        this.parent = null;
        this.relations = {
            '../radio-group/radio-group': {
                type: 'ancestor',
                linked(parent) {
                    this.parent = parent;
                    if (parent.data.placement) {
                        this.setData({ placement: parent.data.placement });
                    }
                    if (parent.data.borderless) {
                        this.setData({ borderless: true });
                    }
                },
            },
        };
        this.options = {
            multipleSlots: true,
        };
        this.lifetimes = {
            attached() {
                this.initStatus();
            },
        };
        this.properties = Object.assign(Object.assign({}, Props), { borderless: {
                type: Boolean,
                value: false,
            } });
        this.controlledProps = [
            {
                key: 'checked',
                event: 'change',
            },
        ];
        this.data = {
            prefix,
            classPrefix: name,
            customIcon: false,
            slotIcon: false,
            optionLinked: false,
            iconVal: [],
        };
        this.methods = {
            handleTap(e) {
                if (this.data.disabled)
                    return;
                const { target } = e.currentTarget.dataset;
                if (target === 'text' && this.data.contentDisabled)
                    return;
                this.doChange();
            },
            doChange() {
                const { value, checked } = this.data;
                if (this.$parent) {
                    this.$parent.updateValue(value);
                }
                else {
                    this._trigger('change', { checked: !checked });
                }
            },
            initStatus() {
                var _a, _b;
                const { icon } = this.data;
                const isIdArr = Array.isArray(((_a = this.parent) === null || _a === void 0 ? void 0 : _a.icon) || icon);
                this.setData({
                    customIcon: isIdArr,
                    slotIcon: icon === 'slot',
                    iconVal: isIdArr ? ((_b = this.parent) === null || _b === void 0 ? void 0 : _b.icon) || icon : [],
                });
            },
            setDisabled(disabled) {
                this.setData({
                    disabled: this.data.disabled || disabled,
                });
            },
        };
    }
};
Radio = __decorate([
    wxComponent()
], Radio);
export default Radio;
