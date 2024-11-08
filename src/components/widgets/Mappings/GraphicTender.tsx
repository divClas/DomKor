import {FC} from "react";
import {I_GraphicTender} from "@/types/graphicTender.ts";
import {GraphicTenderProvider} from "@/components/entities/GraphicTender/model/provider.tsx";
import {GraphicTenderEntity} from "@/components/entities/GraphicTender/ui";

export const GraphicTenderListWidget: FC<{
  list: I_GraphicTender[]
}> = ({list}) => (
  <div>
    {list.map((item) => (
      <GraphicTenderProvider graphicTender={item}
                      key={item.ID}
                      children={<GraphicTenderEntity />} />
    ))}
  </div>
)