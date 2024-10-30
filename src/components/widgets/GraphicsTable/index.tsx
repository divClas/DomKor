import { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { graphicThank } from "@/store/graphic";
import { Flex, Popover } from "antd";
import { ReactComponent as CalendarIcon } from "@/assets/calendar.svg";
import { ReactComponent as SearchIcon } from "@/assets/search.svg";
import { ReactComponent as SortIcon } from "@/assets/sortIcon.svg";
import { ReactComponent as CloseIcon } from "@/assets/closeIcon.svg";
import { DataPickerContent } from "../DataPickerContent";
import { I_Graphic } from "@/types/graphic";
import { InputAsync } from "@/components/ui/InputAsync";
import { AllFieldsIs } from "@/types/app";

export const GraphicsTableWidget = () => {
  const dispatch = useAppDispatch();
  const { entity } = useAppSelector((s) => s.graphic);
  const [search, setSearch] = useState<Partial<I_Graphic>>({
    WORK_TYPE: "",
    OBJECTS: "",
  });
  const [filter, setFilter] = useState<
    Partial<
      AllFieldsIs<
        I_Graphic,
        {
          FROM: "";
          TO: "";
        }
      >
    >
  >({
    CONTRACT_SIGNING: {
      FROM: "",
      TO: "",
    },
    SMR_START: {
      FROM: "",
      TO: "",
    },
    TENDER_PLANNED: {
      FROM: "",
      TO: "",
    },
    WINNER_APPROVAL: {
      FROM: "",
      TO: "",
    },
  });
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
          <Flex justify="space-between" align="center" className="input-group">
            <div className="input-wrapper">
              <InputAsync
                ID={"work-type"}
                onChange={(val) => {
                  setSearch({
                    ...search,
                    WORK_TYPE: val,
                  });
                }}
                value={search.WORK_TYPE}
                type="string"
              />
              <label color="#757778" htmlFor="work-type">
                Вид работ
              </label>
            </div>
            <SearchIcon className="icon" />
            {search.WORK_TYPE && <CloseIcon className="icon" />}
          </Flex>
        ),
        accessor: "WORK_TYPE",
      },
      {
        Header: () => (
          <Flex justify="space-between" align="center" className="input-group">
            <div className="input-wrapper">
              <InputAsync
                ID={"objects"}
                onChange={(val) => {
                  setSearch({
                    ...search,
                    OBJECTS: val,
                  });
                }}
                value={search.OBJECTS}
                type="string"
              />
              <label htmlFor="objects">Объекты</label>
            </div>
            <SearchIcon className="icon" />
            {search.OBJECTS && <CloseIcon className="icon" />}
          </Flex>
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
          <button className="actionBtn" onClick={() => console.log(cell.value)}>
            Откликнуться
          </button>
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
      <thead
        className="table-head"
        style={{ background: "rgba(255, 255, 255, 0)" }}
      >
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
