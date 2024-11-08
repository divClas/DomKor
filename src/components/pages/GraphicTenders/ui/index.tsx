import {GraphicTenderPageProvider} from "@/components/pages/GraphicTenders/model/provider.tsx";
import useSizeHook from "@/hooks/useSizeHook.ts";
import {GraphicTenderBL_MobileFilter} from "@/components/pages/GraphicTenders/ui/Blocks/MobileFilter.tsx";
import {GraphicTenderBL_Table} from "@/components/pages/GraphicTenders/ui/Blocks/Table.tsx";
import {GraphicTenderBL_MobileList} from "@/components/pages/GraphicTenders/ui/Blocks/MobileList.tsx";
import {GraphicTenderBL_ScrollUpButton} from "@/components/pages/GraphicTenders/ui/Blocks/ScrollUpButton.tsx";

export const GraphicTendersPage = () => {
  const windowSize = useSizeHook();

  return (
    <GraphicTenderPageProvider>
      {windowSize.width < 1000 ? (
        <>
          <GraphicTenderBL_MobileFilter />{/*Фильтр*/}
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