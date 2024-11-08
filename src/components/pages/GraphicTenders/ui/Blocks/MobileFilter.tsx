import {Flex} from "antd";
import {C_Popovers} from "@/contexts/popovers.tsx";

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