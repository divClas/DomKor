import { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import {
  graphicThank,
  I_GRAPHIC_FILTER,
  I_GRAPHIC_SEARCH,
} from "@/store/graphic";
import { Flex, Popover } from "antd";
import { ReactComponent as CalendarIcon } from "@/assets/calendar.svg";
import { ReactComponent as SortIcon } from "@/assets/sortIcon.svg";
import { DataPickerContent } from "../DataPickerContent";
import { I_PayloadList } from "@/types/api.ts";
import { PopoverWidget } from "@/components/ui/Popover";
import { SubscribeNewTenderForm } from "@/components/widgets/Forms/SubscribeNewTenderForm.tsx";
import { Dictionary } from "@/contexts/Dictionary.ts";
import { SearchInputString } from "@/components/ui/SearchInput/String.tsx";
import { TableColumns } from "@/components/widgets/GraphicsTable/Columns.tsx";
import { TableRows } from "@/components/widgets/GraphicsTable/Rows.tsx";

export const GraphicsTableWidget = () => {
  const dispatch = useAppDispatch();
  const { entity } = useAppSelector((s) => s.graphic);
  const [search, setSearch] = useState<
    I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>["search"]
  >({});
  const [filter, setFilter] = useState<
    I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>["filter"]
  >({});
  useEffect(() => {
    dispatch(
      graphicThank.getList({
        search,
        filter,
      })
    );
  }, [search, filter]);
  const columns = useMemo(
    () => [
      {
        Header: () => (
          <SearchInputString
            val={search?.WORK_TYPE ?? ""}
            onChange={(val) => {
              setSearch({
                ...search,
                WORK_TYPE: val,
              });
            }}
          />
        ),
        accessor: "WORK_TYPE",
      },
      {
        Header: () => (
          <SearchInputString
            val={search?.OBJECTS ?? ""}
            onChange={(val) => {
              setSearch({
                ...search,
                OBJECTS: val,
              });
            }}
          />
        ),
        accessor: "OBJECTS",
      },
      {
        Header: ({
          column,
        }: {
          column: {
            toggleSortBy: (desc: boolean) => void;
            isSortedDesc: boolean;
          };
        }) => (
          <Flex justify="space-between" align="center">
            <p className="table-header-text">Старт СМР по оперативному плану</p>
            <Popover content={<DataPickerContent />} trigger="click">
              <CalendarIcon className="icon" />
            </Popover>
            <SortIcon
              className="icon"
              onClick={() => column.toggleSortBy(!column.isSortedDesc)}
              style={{ cursor: "pointer" }}
            />
          </Flex>
        ),
        accessor: "SMR_START",
      },
      {
        Header: ({
          column,
        }: {
          column: {
            toggleSortBy: (desc: boolean) => void;
            isSortedDesc: boolean;
          };
        }) => (
          <Flex justify="space-between" align="center">
            <p className="table-header-text">Плановая дата проведения тендер</p>
            <Popover content={<DataPickerContent />} trigger="click">
              <CalendarIcon className="icon" />
            </Popover>
            <SortIcon
              className="icon"
              onClick={() => column.toggleSortBy(!column.isSortedDesc)}
              style={{ cursor: "pointer" }}
            />
          </Flex>
        ),
        accessor: "WINNER_APPROVAL",
      },
      {
        Header: ({
          column,
        }: {
          column: {
            toggleSortBy: (desc: boolean) => void;
            isSortedDesc: boolean;
          };
        }) => (
          <Flex justify="space-between" align="center">
            <p className="table-header-text">
              Плановая дата утверждения победителя тендера
            </p>
            <Popover content={<DataPickerContent />} trigger="click">
              <CalendarIcon className="icon" />
            </Popover>
            <SortIcon
              className="icon"
              onClick={() => column.toggleSortBy(!column.isSortedDesc)}
              style={{ cursor: "pointer" }}
            />
          </Flex>
        ),
        accessor: "TENDER_PLANNED",
      },
      {
        Header: ({
          column,
        }: {
          column: {
            toggleSortBy: (desc: boolean) => void;
            isSortedDesc: boolean;
          };
        }) => (
          <Flex justify="space-between" align="center">
            <p className="table-header-text">
              Плановая дата подписания контракта
            </p>
            <Popover content={<DataPickerContent />} trigger="click">
              <CalendarIcon className="icon" />
            </Popover>
            <SortIcon
              className="icon"
              onClick={() => column.toggleSortBy(!column.isSortedDesc)}
              style={{ cursor: "pointer" }}
            />
          </Flex>
        ),
        accessor: "CONTRACT_SIGNING",
      },
      {
        Header: "Действие",
        accessor: "ID",
        Cell: ({ cell }: { cell: { value: any } }) => (
          <PopoverWidget
            label={Dictionary.SEND_EVENT.ru}
            title={Dictionary.SEND_EVENT_GRAPHIC.ru}
            background={"accent"}
            children={<SubscribeNewTenderForm graphic_id={cell.value} />}
          />
        ),
      },
    ],
    []
  );

  const data = useMemo(() => entity || [], [entity]);

  const tableInstance = useTable({ columns, data }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()} style={{ width: "100%" }}>
      <TableColumns headerGroups={headerGroups} />
      <TableRows
        getTableBodyProps={getTableBodyProps}
        rows={rows}
        prepareRow={prepareRow}
      />
    </table>
  );
};
