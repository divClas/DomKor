import {Tabs, TabsProps} from "antd";
import {GraphicsTableWidget} from "@/components/widgets/GraphicsTable";
import {GraphicsKpTableWidget} from "@/components/widgets/GraphicsKpTable";
import {Button} from "@/components/ui/Button";
import {ReactComponent as ReportIcon} from '@/assets/report.svg'

export const TableTabsWidget = () => {
    const items: TabsProps['items'] = [
        {
            key: 'graphics',
            label: 'График проведения тендеров и выполнения СМР по ж. д.',
            children: <GraphicsTableWidget />
        },
        {
            key: 'graphics-kp',
            label: 'Список сбора КП по ж. д.',
            children: <GraphicsKpTableWidget />
        },
    ];
    return (
        <Tabs defaultActiveKey="graphics"
              items={items}
              tabBarExtraContent={<Button label={'Подписаться на уведомления о новых тендерах'}
                                          background={'accent'}
                                          icon={<ReportIcon />}
                                          onClick={() => {
                                          }}
              />}
              className={'w-100'}
        />
    )
}