import {FC, ReactNode} from "react";
import {I_GraphicTender} from "@/types/graphicTender.ts";
import {useGraphicTenderPage} from "@/components/pages/GraphicTenders/model/context.ts";
import {getGraphicTenderColumns} from "@/components/pages/GraphicTenders/config/graphicList.tsx";
import {GraphicTenderListWidget} from "@/components/widgets/Mappings/GraphicTender.tsx";


export const GraphicTenderBL_MobileList: FC = () => {
  const rows = getGraphicTenderColumns()
  const {graphicsTenderList} = useGraphicTenderPage()

  return (<GraphicTenderListWidget list={graphicsTenderList} />)
  return (
    <div>
      {graphicsTenderList.map((row) => (
        <div
          key={row.ID}
          style={{
            marginBottom: "16px",
            padding: "12px",
            borderBottom: "1px solid #e0e0e0",
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {rows.map((col, index) => {
            const key = col.key as keyof I_GraphicTender;
            if (!(key in row)) {
              return null;
            }
            const value = row[key];
            const render = col.render ? (col.render(value, row, index) as ReactNode) : String(value)
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
      ))}
    </div>
  );
};
