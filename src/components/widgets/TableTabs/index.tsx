import { Tabs, TabsProps } from "antd";
import { GraphicsTableWidget } from "@/components/widgets/GraphicsTable";
import { GraphicsKpTableWidget } from "@/components/widgets/GraphicsKpTable";
import { ReactComponent as ReportIcon } from "@/assets/report.svg";
import { ReactComponent as SearchIcon } from "@/assets/search.svg";
import { Dictionary } from "@/contexts/Dictionary.ts";
import { PopoverWidget } from "@/components/ui/Popover";
import { SubscribeNotificationForm } from "@/components/widgets/Forms/SubscribeNotificationForm.tsx";

export const TableTabsWidget = () => {
  const items: TabsProps["items"] = [
    {
      key: Dictionary.GRAPHIC.en,
      label: Dictionary.GRAPHIC_TAB.ru,
      children: <GraphicsTableWidget />,
    },
    {
      key: Dictionary.GRAPHIC_KP.en,
      label: Dictionary.GRAPHIC_KP_TAB.ru,
      children: <GraphicsKpTableWidget />,
    },
  ];
  return (
    <Tabs
      defaultActiveKey={Dictionary.GRAPHIC.en}
      items={items}
      tabBarExtraContent={
        <>
          <PopoverWidget
            label={Dictionary.SUBSCRIBE_TO_NOTIFICATION.ru}
            background={"accent"}
            icon={<ReportIcon />}
            title={Dictionary.SEND_EVENT_GRAPHIC.ru}
            children={<SubscribeNotificationForm />}
          />
          <div className="btn-mobile" >
            <SearchIcon />
          </div>
        </>
      }
    />
  );
};
