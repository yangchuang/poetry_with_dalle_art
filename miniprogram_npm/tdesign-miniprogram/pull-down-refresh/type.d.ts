import { LoadingProps } from '../loading/index';
export interface TdPullDownRefreshProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    externalClasses?: {
        type: ArrayConstructor;
        value?: ['t-class', 't-class-loading', 't-class-text', 't-class-indicator'];
    };
    loadingBarHeight?: {
        type: StringConstructor;
        optionalTypes: Array<NumberConstructor>;
        value?: string | number;
    };
    loadingProps?: {
        type: ObjectConstructor;
        value?: LoadingProps;
    };
    loadingTexts?: {
        type: ArrayConstructor;
        value?: string[];
    };
    maxBarHeight?: {
        type: StringConstructor;
        optionalTypes: Array<NumberConstructor>;
        value?: string | number;
    };
    refreshTimeout?: {
        type: NumberConstructor;
        value?: number;
    };
    value?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    defaultValue?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
