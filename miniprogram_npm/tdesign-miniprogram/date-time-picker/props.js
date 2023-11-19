const props = {
    cancelBtn: {
        type: String,
        value: '',
    },
    confirmBtn: {
        type: String,
        value: '',
    },
    end: {
        type: null,
    },
    externalClasses: {
        type: Array,
    },
    format: {
        type: String,
        value: '',
    },
    header: {
        type: Boolean,
        value: true,
    },
    mode: {
        type: null,
        value: 'date',
    },
    showWeek: {
        type: Boolean,
        value: false,
    },
    start: {
        type: null,
    },
    title: {
        type: String,
        value: '',
    },
    value: {
        type: null,
        value: null,
    },
    defaultValue: {
        type: null,
    },
    visible: {
        type: Boolean,
        value: false,
    },
};
export default props;
