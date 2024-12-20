import { GraphicTenderPageProvider } from "@/components/pages/GraphicTenders/model/provider.tsx";
import useSizeHook from "@/hooks/useSizeHook.ts";
import { GraphicTenderBL_Table } from "@/components/pages/GraphicTenders/ui/Blocks/Table.tsx";
import { GraphicTenderBL_MobileList } from "@/components/pages/GraphicTenders/ui/Blocks/MobileList.tsx";
import { GraphicTenderBL_ScrollUpButton } from "@/components/pages/GraphicTenders/ui/Blocks/ScrollUpButton.tsx";
import { Flex } from "antd";
import { C_Popovers } from "@/components/ui/Popover/templates/popovers.tsx";
import {C_PAD} from "@/contexts/theme.ts";

export const GraphicTendersPage = () => {
  const windowSize = useSizeHook();

  return (
    <GraphicTenderPageProvider>
      {windowSize.width < C_PAD ? (
        <>
          <Flex className="mobile-filter">
            <C_Popovers.SubscribeNotificationMobile />
            <C_Popovers.GraphicTenderFilter />
          </Flex>
          <GraphicTenderBL_MobileList />{/*Список*/}
        </>
      ) : (
        <>
          <GraphicTenderBL_Table />{/*Таблица*/}
        </>
      )}
      <GraphicTenderBL_ScrollUpButton />{/*Кнопка прокрутки наверх*/}
    </GraphicTenderPageProvider>
  )
}