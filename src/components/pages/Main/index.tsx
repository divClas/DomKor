import {Flex} from "antd";
import {TableTabsWidget} from "@/components/widgets/TableTabs";
import {Outlet} from "react-router-dom";
import {Button} from "@/components/ui/Button";
import {ReactComponent as ReportIcon} from '@/assets/report.svg'

export default function MainPage() {
    return (
        <Flex className={'w-100'}
              vertical={true}
        >
            <Flex className={'w-100'}
                  justify={'space-between'}
                  align={'center'}
            >
                <TableTabsWidget />
                <div>
                    <Button label={'Подписаться на уведомления о новых тендерах'}
                            background={'accent'}
                            icon={<ReportIcon />}
                            onClick={() => {
                            }}
                    />
                </div>
            </Flex>
            <Flex className={'w-100'}>
                <Outlet />
            </Flex>
        </Flex>
    )
}
