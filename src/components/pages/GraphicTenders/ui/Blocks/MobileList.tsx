import {FC} from "react";
import {useGraphicTenderPage} from "@/components/pages/GraphicTenders/model/context.ts";
import {GraphicTenderListWidget} from "@/components/widgets/Mappings/GraphicTender.tsx";
import {NoData} from "@/components/ui/NoData";


export const GraphicTenderBL_MobileList: FC = () => {
  const {graphicsTenderList, setPayload} = useGraphicTenderPage()
  if (graphicsTenderList.length === 0) return (
    <NoData
      onReset={() => {
        setPayload({});
      }}
    />
  )
  return (<GraphicTenderListWidget list={graphicsTenderList} />)
};
