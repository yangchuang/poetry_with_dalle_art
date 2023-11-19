const props = {
    backgroundColor: {
        type: String,
        optionalTypes: [Number],
        value: 'rgba(0, 0, 0, 1)',
    },
    images: {
        type: Array,
        value: [],
    },
    initialIndex: {
        type: Number,
        value: 0,
    },
    showIndex: {
        type: Boolean,
        value: false,
    },
    deleteBtn: {
        type: null,
        value: false,
    },
    closeBtn: {
        type: null,
        value: false,
    },
    visible: {
        type: Boolean,
        value: null,
    },
    defaultVisible: {
        type: Boolean,
        value: false,
    },
};
export default props;
