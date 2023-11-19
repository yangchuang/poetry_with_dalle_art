const props = {
    autoClose: {
        type: Boolean,
        value: true,
    },
    cancelBtn: {
        type: null,
        value: true,
    },
    columns: {
        type: null,
        value: [],
    },
    confirmBtn: {
        type: null,
        value: true,
    },
    header: {
        type: Boolean,
        value: true,
    },
    renderLabel: {
        type: null,
    },
    title: {
        type: String,
        value: '',
    },
    value: {
        type: Array,
        value: null,
    },
    defaultValue: {
        type: Array,
    },
    visible: {
        type: Boolean,
        value: false,
    },
};
export default props;
