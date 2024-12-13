import {Tabs, TabsProps} from "antd";
import {ReactComponent as ReportIcon} from "@/assets/report.svg";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {PopoverWidget} from "@/components/ui/Popover";
import {FormWidget} from "@/components/widgets/Form";
import {FormSubscribeNotification} from "@/contexts/forms.ts";
import useSizeHook from "@/hooks/useSizeHook.ts";
import {TendersPage} from "@/components/pages/Tenders/ui";
import {C_MB} from "@/contexts/theme.ts";

export const TableTabsWidget = () => {
  const windowSize = useSizeHook()
  const items: TabsProps["items"] = [
    // {
    //   key: Dictionary.GRAPHIC.en,
    //   label: windowSize.width > C_MB ? Dictionary.GRAPHIC_TAB.ru : Dictionary.GRAPHIC_TAB_MB.ru,
    //   children: <GraphicTendersPage />,
    // },
    {
      key: Dictionary.GRAPHIC_KP.en,
      label: windowSize.width > C_MB ? Dictionary.GRAPHIC_KP_TAB.ru : Dictionary.GRAPHIC_KP_TAB_MB.ru,
      children: <TendersPage />,
    },
  ];
  return (
    <Tabs
      defaultActiveKey={Dictionary.GRAPHIC_KP_TAB.en}
      items={items}
      tabBarExtraContent={
        <>
          <PopoverWidget
            btn={{
              label: Dictionary.SUBSCRIBE_TO_NOTIFICATION.ru,
              background: "accent",
              icon: <ReportIcon />,
              className: "subscribe-notification-form"
            }}
            title={Dictionary.SUBSCRIBE_TO_NOTIFICATION.ru}
            content={<FormWidget {...FormSubscribeNotification()} />}
          />
        </>
      }
    />
  );
};
