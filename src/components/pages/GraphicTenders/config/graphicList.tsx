import {I_TableColumn} from "@/types/table.ts";
import {I_GraphicTender} from "@/types/graphicTender.ts";
import {graphicDateFilters} from "@/contexts/filters.ts";
import {SearchInputDate} from "@/components/ui/SearchInput/Date.tsx";
import {tableConstruct} from "@/helpers/tableConstruct.tsx";
import {SearchInputString} from "@/components/ui/SearchInput/String.tsx";
import {FormWidget} from "@/components/widgets/Form";
import {FormSubscribeNewTender} from "@/contexts/forms.ts";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {useGraphicTenderPage} from "@/components/pages/GraphicTenders/model/context.ts";

export function getGraphicTenderColumns() {
  const {
    setPayload,
    payload
  } = useGraphicTenderPage()
  const dateColumns: I_TableColumn<I_GraphicTender>[] = graphicDateFilters.map(
    (date) => ({
      common: {
        title: () => {
          return (
            <SearchInputDate
              label={date.label}
              value={payload.filter?.[date.filterKey]}
              isDateFilter={
                !!(
                  payload.filter?.[date.filterKey]?.FROM ||
                  payload.filter?.[date.filterKey]?.TO
                )
              }
              isSort={payload.sortby === date.filterKey}
              setSort={() => {
                setPayload({
                  ...payload,
                  sortby: date.filterKey,
                  sort_type: payload.sort_type === "ASC" ? "DESC" : "ASC",
                });
              }}
              onChange={(val) => {
                setPayload({
                  ...payload,
                  search: {
                    ...payload.search,
                  },
                  filter: {
                    ...payload.filter,
                    [date.filterKey]: val,
                  },
                });
              }}
            />
          );
        },
        dataIndex: date.filterKey,
      },
      format: date.mask ?? "",
      type: "date",
      titleString: date.label,
    })
  );

  return tableConstruct<I_GraphicTender>([
    {
      width: "20%",
      common: {
        title: () => {
          return (
            <SearchInputString
              label={"Вид работ"}
              val={payload.search?.WORK_TYPE ?? ""}
              placeholder={"Введите текст"}
              onChange={(val) => {
                setPayload({
                  ...payload,
                  search: {
                    ...payload.search,
                    WORK_TYPE: val,
                  },
                  filter: {
                    ...payload.filter,
                  },
                });
              }}
            />
          );
        },
        dataIndex: "WORK_TYPE",
      },
      noSort: true,
      className: "fw--lg fs--md",
      type: "string",
      titleString: "Вид работ",
    },
    {
      width: "13%",
      common: {
        title: () => {
          return (
            <SearchInputString
              label={"Объекты"}
              placeholder={"Введите текст"}
              val={payload.search?.OBJECTS ?? ""}
              onChange={(val) => {
                setPayload({
                  ...payload,
                  search: {
                    ...payload.search,
                    OBJECTS: val,
                  },
                  filter: {
                    ...payload.filter,
                  },
                });
              }}
            />
          );
        },
        dataIndex: "OBJECTS",
      },
      noSort: true,
      type: "string",
      titleString: "Объекты",
    },
    ...dateColumns,
    {
      common: {
        title: "Действие",
        dataIndex: "ID",
      },
      className: "btn-table",
      noSort: true,
      type: "buttonWithModal",
      modalChild: (val) => <FormWidget {...FormSubscribeNewTender(val)} />,
      modalTitle: Dictionary.SEND_EVENT_GRAPHIC.ru,
      label: Dictionary.SEND_EVENT.ru,
      width: 180,
      titleString: "Действие",
    },
  ]);
}