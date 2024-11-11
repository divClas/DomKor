import {Flex} from "antd";
import {C_Popovers} from "@/components/ui/Popover/templates/popovers.tsx";

export const GraphicTenderBL_MobileFilter = () => {
  return (
    <Flex className="mobile-filter"
          justify="space-between"
          align="center">
      <C_Popovers.SubscribeNotificationMobile />
      <C_Popovers.GraphicTenderFilter />
    </Flex>
  )
}