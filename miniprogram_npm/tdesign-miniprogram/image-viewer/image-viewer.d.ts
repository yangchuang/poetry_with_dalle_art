import { SuperComponent } from '../common/src/index';
export default class ImageViewer extends SuperComponent {
    externalClasses: string[];
    properties: {
        style?: {
            type: StringConstructor;
            value?: string;
        };
        backgroundColor?: {
            type: StringConstructor;
            optionalTypes: NumberConstructor[];
            value?: string | number;
        };
        images?: {
            type: ArrayConstructor;
            value?: string[];
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
            value?: string | boolean | object;
        };
        closeBtn?: {
            type: null;
            value?: string | boolean | object;
        };
        visible?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        defaultVisible?: {
            type: BooleanConstructor;
            value?: boolean;
        };
    };
    data: {
        prefix: string;
        classPrefix: string;
        currentSwiperIndex: number;
        windowHeight: number;
        windowWidth: number;
        imagesShape: {};
    };
    options: {
        multipleSlots: boolean;
    };
    controlledProps: {
        key: string;
        event: string;
    }[];
    ready(): void;
    observers: {
        visible(value: any): void;
        closeBtn(v: any): void;
        deleteBtn(v: any): void;
    };
    methods: {
        saveScreenSize(): void;
        calcImageDisplayStyle(imageWidth: any, imageHeight: any): {
            styleObj: {
                width: string;
                height: string;
                left: string;
                transform: string;
            };
        } | {
            styleObj: {
                width: string;
                height: string;
                left?: undefined;
                transform?: undefined;
            };
        };
        onImageLoadSuccess(e: WechatMiniprogram.TouchEvent): void;
        onSwiperChange(e: WechatMiniprogram.TouchEvent): void;
        onClose(e: any): void;
        onDelete(): void;
    };
}
