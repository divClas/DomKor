import {FC} from "react";
import {UseTableInstanceProps} from "react-table";
import {I_Graphic} from "@/types/graphic.ts";

export const TableRows: FC<{
    getTableBodyProps: UseTableInstanceProps<I_Graphic>['getTableBodyProps'],
    rows: UseTableInstanceProps<I_Graphic>['rows'],
    prepareRow: UseTableInstanceProps<I_Graphic>['prepareRow']
}> = ({
          prepareRow,
          getTableBodyProps,
          rows
      }) => {
    return (
        <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()} key={row.values.ID}>
                    {row.cells.map((cell, index) => (
                        <td {...cell.getCellProps()} key={index}>{cell.render("Cell")}</td>
                    ))}
                </tr>
            );
        })}
        </tbody>
    )
}