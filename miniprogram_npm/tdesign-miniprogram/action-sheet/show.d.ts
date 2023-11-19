/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
export interface ActionSheetItem {
    label: string;
    color?: string;
    disabled?: boolean;
    icon?: string;
}
declare type Context = WechatMiniprogram.Page.TrivialInstance | WechatMiniprogram.Component.TrivialInstance;
export declare enum ActionSheetTheme {
    List = "list",
    Grid = "grid"
}
interface ActionSheetProps {
    visible: boolean;
    items: Array<string | ActionSheetItem>;
    defaultVisible?: boolean;
    cancelText?: string;
    count?: number;
    showCancel?: boolean;
    theme?: ActionSheetTheme;
}
export interface ActionSheetShowOption extends Omit<ActionSheetProps, 'visible'> {
    context?: Context;
    selector?: string;
}
export declare const show: (options: ActionSheetShowOption) => WechatMiniprogram.Component.TrivialInstance;
export declare const close: (options: ActionSheetShowOption) => void;
export {};
