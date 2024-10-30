import { TableProps } from "antd";
import { I_TableColumn } from "@/types/table.ts";
import { ColumnGroupType } from "antd/es/table";
import { ColumnType } from "antd/es/table";
import { Typography } from "antd";
import { Button } from "@/components/ui/Button";
import dayjs from "dayjs";
import { PopoverWidget } from "@/components/ui/Popover";

export function tableConstruct<I_ROW = object>(
  columns: I_TableColumn<I_ROW>[]
): TableProps<I_ROW>["columns"] {
  return columns.map((col) => {
    const res: ColumnGroupType<I_ROW> | ColumnType<I_ROW> = {
      key: String(col.common.dataIndex),
      dataIndex: String(col.common.dataIndex),
      title:
        typeof col.common.title === "function"
          ? (props) =>
              typeof col.common.title === "function"
                ? col.common.title(props)
                : col.common.title
          : col.common.title ?? "",
    };

    res.width = col.width;

    switch (col.type) {
      case "date": {
        if (!col.noSort) {
          res.sorter = (a, b) =>
            dayjs(String(a[col.common.dataIndex]), "YYYY-MM-DD").unix() -
            dayjs(String(b[col.common.dataIndex]), "YYYY-MM-DD").unix();
        }
        res.render = (val) => (
          <Typography.Text children={dayjs(val).format("DD.MM.YYYY")} />
        );
        break;
      }
      case "string": {
        if (!col.noSort) {
          res.sorter = (a, b) =>
            String(a[col.common.dataIndex] || "").localeCompare(
              String(b[col.common.dataIndex]) || ""
            );
        }
        res.render = (val) => <Typography.Text children={val} />;
        break;
      }
      case "button": {
        res.render = (value, record) => (
          <Button
            label={col.label ?? "Кнопка"}
            background={"accent"}
            onClick={() =>
              col.onClick ? col.onClick(value, record) : () => {}
            }
          />
        );
        break;
      }
      case "buttonWithModal": {
        res.sorter = (a, b) =>
          String(a[col.common.dataIndex] || "").localeCompare(
            String(b[col.common.dataIndex]) || ""
          );
        res.render = (value, record) => (
          <PopoverWidget
            title={col.modalTitle}
            label={col.label ?? "Кнопка"}
            children={col.modalChild(value, record)}
            background={"accent"}
          />
        );
        break;
      }
    }
    return res;
  });
}
