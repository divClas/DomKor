import {FC, ReactNode} from "react";
import './style.scss'
import {getGraphicTenderColumns} from "@/components/pages/GraphicTenders/config/graphicList.tsx";
import {I_GraphicTender} from "@/types/graphicTender.ts";
import {useGraphicTender} from "@/components/entities/GraphicTender/model/context.ts";

export const GraphicTenderEntity: FC = () => {
  const columns = getGraphicTenderColumns()
  const {graphicTender} = useGraphicTender()
  return (
    <div
      className={'graphic-tender-mobile'}
    >
      {columns.map((col, index) => {
        const key = col.key as keyof I_GraphicTender;
        if (!(key in graphicTender)) {
          return null;
        }
        const value = graphicTender[key];
        const render = col.render ? (col.render(value, graphicTender, index) as ReactNode) : String(value)
        if (col.type === 'buttonWithModal' || col.type === 'button') {
          return <div
            key={key}
            className={'child-w-100'}
          >{render}</div>
        }
        return (
          <div
            key={key}
            style={{
              borderLeft: "1px solid rgba(117, 119, 120, 1)",
              paddingLeft: "8px",
            }}
          >
            <p className="title">{col.titleString}</p>
            <p className="sub-title"
               style={{display: "block"}}
            >
              {render}
            </p>
          </div>
        )
      })}
    </div>
  )
}