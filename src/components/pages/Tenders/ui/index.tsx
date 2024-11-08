import {TenderPageProvider} from "@/components/pages/Tenders/model/provider.tsx";
import {TenderBL_Filter} from "@/components/pages/Tenders/ui/Blocks/Filter.tsx";
import {Flex} from "antd";
import './index.scss'
import {TenderBL_TenderList} from "@/components/pages/Tenders/ui/Blocks/TenderList.tsx";

export const TendersPage = () => {
  return (
    <TenderPageProvider>
      <Flex vertical={true}
            className={'tender-page'}>
        <TenderBL_Filter />
        <TenderBL_TenderList />
      </Flex>
    </TenderPageProvider>
  )
}