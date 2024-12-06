import {ConfigProvider, Flex, Layout} from "antd";
import "./style.css";
import dayjs from "dayjs";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import {themeConfig} from "@/contexts/theme.ts";
import {TableTabsWidget} from "@/components/widgets/TableTabs";
import {C_ReCaptcha} from "@/components/widgets/Form/model/reCaptcha.tsx";

export const AppLayout = () => {
    dayjs.locale("ru");

    return (
        <C_ReCaptcha>
            <ConfigProvider theme={themeConfig}
                            locale={locale}
            >
                {/*<NotificationWidget />*/}
                <Flex vertical={true}
                      gap={20}
                >
                    <Layout>
                        <TableTabsWidget />
                    </Layout>
                </Flex>
            </ConfigProvider>
        </C_ReCaptcha>
    );
};
