import {Tabs, TabsProps} from "antd";
import {useNavigate} from "react-router-dom";

export const TableTabsWidget = () => {
    const navigate = useNavigate()
    const onChange = (key: string) => {
        console.log(key);
        navigate(key)
    };
    const items: TabsProps['items'] = [
        {
            key: '/graphics',
            label: 'График проведения тендеров и выполнения СМР по ж. д.',
        },
        {
            key: '/graphics-kp',
            label: 'Список сбора КП по ж. д.',
        },
    ];
    return (
        <Tabs defaultActiveKey="1"
              items={items}
              onChange={onChange}
        />
    )
}