import {I_COL, I_TableColumn} from "@/types/table.ts";
import {Typography} from "antd";
import {Button} from "@/components/ui/Button";
import dayjs from "dayjs";
import {PopoverWidget} from "@/components/ui/Popover";
import {textFormat} from "@/helpers/textFormat.ts";
import {SelectUi} from "@/components/ui/Select";

export function tableConstruct<I_ROW extends { ID: string }>(
    columns: I_TableColumn<I_ROW>[]
): I_COL<I_ROW>[] {
    return columns.map((col) => {
        const res: I_COL<I_ROW> = {
            key: String(col.common.dataIndex),
            dataIndex: String(col.common.dataIndex),
            title: (
                typeof col.common.title === "function"
                    ? () => (
                        typeof col.common.title === "function"
                            ? col.common.title()
                            : col.common.title
                    )
                    : col.common.title ?? ""
            ),
            titleString: col.titleString,
            width: col.width,
            type: col.type,
            fixed: col.fixed,
            className: col.classNameCell
        };
        switch (col.type) {
            case "date": {
                res.render = (val) => (
                    <Typography.Text
                        children={textFormat.capitalize(val ? dayjs(val).format(col.format ? col.format : "DD.MM.YYYY") : '')}
                        className={col.className + ' fs--md'}
                    />
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
                res.render = (val) => (
                    <Typography.Text
                        children={val ?? '-'}
                        className={col.className + ' fs--md'}
                    />
                );
                break;
            }
            case "select": {
                if (!col.noSort) {
                    res.sorter = (a, b) =>
                        String(a[col.common.dataIndex] || "").localeCompare(
                            String(b[col.common.dataIndex]) || ""
                        );
                }
                if (col.readonly) {
                    res.render = (value) => (
                        <Typography.Text>
                            {col.options?.find(o => o.value == value)?.label ?? ''}
                        </Typography.Text>
                    )
                    break;
                }
                res.render = (val) => (
                    <SelectUi
                        value={val}
                        onChange={col.onChange}
                        center={true}
                        placeholder={"Выбрать город"}
                        className={"w-100"}
                        options={col.options}
                    />);
                break;
            }
            case "button": {
                res.render = (value, record) => (
                    <Button
                        label={col.label ?? "Кнопка"}
                        background={"accent"}
                        onClick={() =>
                            col.onClick ? col.onClick(value, record) : () => {
                            }
                        }
                        className={col.className}
                    />
                );
                break;
            }
            case "buttonWithModal": {
                res.render = (value, record) => (
                    <PopoverWidget
                        btn={{
                            label: col.label ?? "Кнопка",
                            background: "accent",
                            className: col.className
                        }}
                        title={col.modalTitle}
                        content={col.modalChild(value, record)}
                    />
                );
                break;
            }
        }
        return res;
    });
}
