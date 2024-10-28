import {Outlet} from "react-router-dom"
import {ConfigProvider, Flex, Layout} from "antd";
import './style.css'
import dayjs from 'dayjs';
import locale from 'antd/locale/ru_RU';
import 'dayjs/locale/ru';
import {NotificationWidget} from "@/components/widgets/Notification";
import {themeConfig} from "@/contexts/theme.ts";
import {FooterWidget} from "@/components/widgets/Footer";
import {HeaderWidget} from "@/components/widgets/Header";

export const AppLayout = () => {
    dayjs.locale('ru');
    return (
        <ConfigProvider
            theme={themeConfig}
            locale={locale}
        >
            <NotificationWidget />
            <Flex vertical={true} gap={20}>
                <HeaderWidget />
                <Layout>
                    <Outlet />
                </Layout>
                <FooterWidget />
            </Flex>
        </ConfigProvider>
    )
}