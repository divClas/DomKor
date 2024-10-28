import {TableProps} from "antd";
import {I_TableColumn} from "@/types/table.ts";
import {ColumnGroupType} from "antd/es/table";
import {ColumnType} from "antd/es/table";
import { Typography} from "antd";
import {Button} from "@/components/ui/Button";
import dayjs from "dayjs";

export function tableConstruct<I_ROW = object>(columns: I_TableColumn<I_ROW>[]): TableProps<I_ROW>['columns'] {
    return columns.map(col => {
        const res: (ColumnGroupType<I_ROW> | ColumnType<I_ROW>) = {
            key: String(col.common.dataIndex),
            dataIndex: String(col.common.dataIndex),
            title: col.common.title,
        }

        res.width = col.width

        switch (col.type) {
            case "date": {
                res.sorter = (a, b) => dayjs(String(a[col.common.dataIndex]), 'DD.MM.YYYY').unix() - dayjs(String(b[col.common.dataIndex]), 'DD.MM.YYYY').unix()
                res.render = (val) => <Typography.Text children={val} />
                break
            }
            case "string": {
                res.sorter = (a, b) => (String(a[col.common.dataIndex] || '')).localeCompare(String(b[col.common.dataIndex]) || '')
                res.render = (val) => <Typography.Text children={val} />
                break
            }
            case "button": {
                res.sorter = (a, b) => (String(a[col.common.dataIndex] || '')).localeCompare(String(b[col.common.dataIndex]) || '')
                res.render = (value, record) => (<Button
                    label={col.label ?? 'Кнопка'}
                    background={'accent'}
                    onClick={() => col.onClick ? col.onClick(value, record) : () => {
                    }}
                />)
                break
            }
        }
        return res
    })
}