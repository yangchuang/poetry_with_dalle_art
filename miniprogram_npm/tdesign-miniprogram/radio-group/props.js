const props = {
    placement: {
        type: String,
        value: null,
    },
    borderless: {
        type: Boolean,
        value: false,
    },
    disabled: {
        type: Boolean,
        value: undefined,
    },
    icon: {
        type: null,
        value: 'fill-circle',
    },
    keys: {
        type: Object,
    },
    name: {
        type: String,
        value: '',
    },
    options: {
        type: Array,
    },
    value: {
        type: null,
        value: null,
    },
    defaultValue: {
        type: null,
    },
};
export default props;
