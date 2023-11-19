export interface TdImageViewerProps {
    style?: {
        type: StringConstructor;
        value?: string;
    };
    backgroundColor?: {
        type: StringConstructor;
        optionalTypes: Array<NumberConstructor>;
        value?: string | number;
    };
    images?: {
        type: ArrayConstructor;
        value?: Array<string>;
    };
    initialIndex?: {
        type: NumberConstructor;
        value?: number;
    };
    showIndex?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    deleteBtn?: {
        type: null;
        value?: boolean | string | object;
    };
    closeBtn?: {
        type: null;
        value?: boolean | string | object;
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    defaultVisible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
