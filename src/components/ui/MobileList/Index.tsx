import {FC, ReactNode} from "react";
import {I_Graphic} from "@/types/graphic.ts";
import {I_COL} from "@/types/table.ts";


const MobileList: FC<{
    data: I_Graphic[],
    columns: I_COL<I_Graphic>[]
}> = ({data, columns}) => {

    return (
        <div>
            {data.map((row, index) => (
                <div
                    key={index}
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
                    {columns.map((col, index) => {
                        const key = col.key as keyof I_Graphic;
                        if (!(key in row)) {
                            return null;
                        }
                        const value = row[key];
                        const render = col.render ? (col.render(value, row, index) as ReactNode) : String(value)
                        if (col.type === 'buttonWithModal' || col.type === 'button') {
                            return <div className={'child-w-100'}>{render}</div>
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

export default MobileList;
