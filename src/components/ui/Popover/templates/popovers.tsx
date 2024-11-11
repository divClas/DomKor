import {Dictionary} from "@/contexts/Dictionary.ts";
import {FormWidget} from "@/components/widgets/Form";
import {FormSubscribeNotification} from "@/contexts/forms.ts";
import {PopoverWidget} from "@/components/ui/Popover";
import {ReactComponent as ReportIcon} from "@/assets/report.svg";
import {ReactComponent as SearchIcon} from "@/assets/mobileSearch.svg";
import {ButtonFilter} from "@/components/ui/ButtonFilter";
import {useGraphicTenderPage} from "@/components/pages/GraphicTenders/model/context.ts";
import { FilterMobile } from "@/components/pages/GraphicTenders/ui/Blocks/FilterMobile.tsx";

export const C_Popovers = {
  SubscribeNotification: () => {
    return (
      <PopoverWidget
        btn={{
          label: Dictionary.SUBSCRIBE_TO_NOTIFICATION.ru,
          background: "accent",
          icon: <ReportIcon />,
          className: "mobile-popover",
        }}
        title={Dictionary.SUBSCRIBE_TO_NOTIFICATION.ru}
        content={<FormWidget {...FormSubscribeNotification()} />}
      />
    )
  },
  SubscribeNotificationMobile: () => {
    return (
      <PopoverWidget
        btn={{
          label: Dictionary.SUBSCRIBE_TO_NOTIFICATION_MOBILE.ru,
          background: "accent",
          icon: <ReportIcon />,
          className: "mobile-popover",
        }}
        title={Dictionary.SUBSCRIBE_TO_NOTIFICATION.ru}
        content={<FormWidget {...FormSubscribeNotification()} />}
      />
    )
  },
  GraphicTenderFilter: () => {
    const {graphicsTenderList, payload} = useGraphicTenderPage()
      const showCount = !!(payload.filter || payload.search)
    return (
      <PopoverWidget
        title={"Фильтры"}
        content={<FilterMobile />}
        children={
          <ButtonFilter value={graphicsTenderList.length}
                        icon={<SearchIcon />}
                        showCount={showCount}
          />
        }
      />
    )
  },
}