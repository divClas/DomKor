import {FC} from "react";
import {UseTableInstanceProps} from "react-table";
import {I_Graphic} from "@/types/graphic.ts";

export const TableColumns: FC<{
    headerGroups: UseTableInstanceProps<I_Graphic>['headerGroups']
}> = ({
          headerGroups
      }) => {
    return (
        <thead
            className="table-head"
            style={{background: "rgba(255, 255, 255, 0)"}}
        >
        {headerGroups.map((headerGroup, indexGr) => {
            return (
                <tr {...headerGroup.getHeaderGroupProps()} key={indexGr}>
                    {headerGroup.headers.map((column, indexC) => (
                        <th {...column.getHeaderProps()} key={indexC}>{column.render("Header")}</th>
                    ))}
                </tr>
            )
        })}
        </thead>
    )
}