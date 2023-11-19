import { ButtonProps } from '../button/index';
export interface TdPickerProps {
    autoClose?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    cancelBtn?: {
        type: null;
        value?: boolean | string | ButtonProps;
    };
    columns: {
        type: ArrayConstructor;
        value?: Array<PickerColumn> | ((item: Array<PickerValue>) => Array<PickerColumn>);
    };
    confirmBtn?: {
        type: null;
        value?: boolean | string | ButtonProps;
    };
    header?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    renderLabel?: {
        type: StringConstructor;
        value?: (item: PickerColumnItem) => string;
    };
    title?: {
        type: StringConstructor;
        value?: string;
    };
    value?: {
        type: ArrayConstructor;
        value?: Array<PickerValue>;
    };
    defaultValue?: {
        type: ArrayConstructor;
        value?: Array<PickerValue>;
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
export declare type PickerColumn = PickerColumnItem[];
export interface PickerColumnItem {
    label: string;
    value: string;
}
export declare type PickerValue = string | number;
