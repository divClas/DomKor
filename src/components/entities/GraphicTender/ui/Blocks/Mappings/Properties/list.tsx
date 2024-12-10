
import { getGraphicTenderColumns } from "@/components/pages/GraphicTenders/config/graphicList";
import { I_GraphicTender } from "@/types/graphicTender.ts";
import { useGraphicTender } from "@/components/entities/GraphicTender/model/context";
import { ReactNode } from "react";
import { GraphicTenderPropertyItem } from "./item";
export const GraphicTenderPropertiesList = () => {
  const rows = getGraphicTenderColumns()
  const { graphicTender } = useGraphicTender()
  console.log(rows)
  return (
    <div className={'graphic-tender-props-mobile'}>
      {rows.map((col, index) => {
        const key = col.key as keyof I_GraphicTender;
        if (!(key in graphicTender)) {
          return null;
        }
        const value = graphicTender[key];
        const render = col.render ? (col.render(value, graphicTender, index) as ReactNode) : String(value)
        return <GraphicTenderPropertyItem render={render} key={index} type={col.type} label={col.titleString} />
      })}
    </div>
  )
}