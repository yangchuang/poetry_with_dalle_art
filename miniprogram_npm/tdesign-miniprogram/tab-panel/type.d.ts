import { TabValue } from '../tabs/index';
export interface TdTabPanelProps {
    badgeProps?: {
        type: ObjectConstructor;
        value?: object;
    };
    style?: {
        type: StringConstructor;
        value?: string;
    };
    destroyOnHide?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    disabled?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    icon?: {
        type: null;
        value?: string | object;
    };
    label?: {
        type: StringConstructor;
        value?: string;
    };
    panel?: {
        type: StringConstructor;
        value?: string;
    };
    value?: {
        type: null;
        value?: TabValue;
    };
}
