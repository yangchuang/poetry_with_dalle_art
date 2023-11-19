const props = {
    externalClasses: {
        type: Array,
    },
    loadingBarHeight: {
        type: String,
        optionalTypes: [Number],
        value: 50,
    },
    loadingProps: {
        type: Object,
    },
    loadingTexts: {
        type: Array,
        value: [],
    },
    maxBarHeight: {
        type: String,
        optionalTypes: [Number],
        value: 80,
    },
    refreshTimeout: {
        type: Number,
        value: 3000,
    },
    value: {
        type: Boolean,
        value: null,
    },
    defaultValue: {
        type: Boolean,
        value: false,
    },
};
export default props;
