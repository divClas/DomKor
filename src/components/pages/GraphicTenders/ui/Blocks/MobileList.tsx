import {FC} from "react";
import {useGraphicTenderPage} from "@/components/pages/GraphicTenders/model/context.ts";
import {GraphicTenderListWidget} from "@/components/widgets/Mappings/GraphicTender.tsx";


export const GraphicTenderBL_MobileList: FC = () => {
  const {graphicsTenderList} = useGraphicTenderPage()

  return (<GraphicTenderListWidget list={graphicsTenderList} />)
};
