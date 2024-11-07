import {ThemeConfig} from "antd";

export const themeConfig: ThemeConfig = {
    token: {},
    components: {
        Button: {
            borderRadius: 0,
            colorText: '#fff',
            colorBgContainer: '#0094DE',
            colorBgContainerDisabled: 'rgba(0,104,156,0.5)',
            colorBgSolidHover: "#00689C",
            colorPrimaryHover: '#fff',
            colorPrimary: 'red',
            colorPrimaryActive: 'lightgray',
            colorPrimaryTextHover: 'lightgray',
            colorTextDisabled: '#fff'
        },
        Input: {
            colorBgContainer: "unset",
            borderRadius: 0,
            lineType: "unset",
            paddingSM: 0,
            colorBgContainerDisabled: 'unset',
            colorBorder: 'unset'
        },
        InputNumber: {},
        Layout: {},
        Menu: {},
        Select: {
            controlHeight: 36
        },
        Table: {},
        Typography: {
            titleMarginBottom: 0,
            titleMarginTop: 0,
        },
        Switch: {},
        DatePicker: {},
        Checkbox: {},
        Steps: {},
        Form: {
            itemMarginBottom: 12
        },
        Modal: {
            borderRadiusLG: 0,
        }
    },
};
