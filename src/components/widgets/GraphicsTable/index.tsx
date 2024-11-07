import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import {
  graphicThank,
  I_GRAPHIC_FILTER,
  I_GRAPHIC_SEARCH,
} from "@/store/graphic";
import { I_PayloadList } from "@/types/api.ts";
import { SearchInputString } from "@/components/ui/SearchInput/String.tsx";
import { I_Graphic } from "@/types/graphic.ts";
import { tableConstruct } from "@/helpers/tableConstruct.tsx";
import { Flex, Table } from "antd";
import { SearchInputDate } from "@/components/ui/SearchInput/Date.tsx";
import { Dictionary } from "@/contexts/Dictionary.ts";
import { NoData } from "@/components/ui/NoData";
import MobileList from "@/components/ui/MobileList/Index";
import {
  FormSubscribeNewTender,
  FormSubscribeNotification,
} from "@/contexts/forms.ts";
import { FormWidget } from "@/components/widgets/Form";
import { PopoverWidget } from "@/components/ui/Popover";
import { ReactComponent as ReportIcon } from "@/assets/report.svg";
import { ReactComponent as SearchIcon } from "@/assets/mobileSearch.svg";
import useSizeHook from "@/hooks/useSizeHook.ts";
import { ButtonFilter } from "@/components/ui/ButtonFilter";
import { FilterMobile } from "@/components/widgets/GraphicsTable/FilterMobile.tsx";
import { graphicDateFilters } from "@/contexts/filters.ts";
import { I_TableColumn } from "@/types/table";
import { GetUPBtn } from "@/components/ui/getUpBtn";

export const GraphicsTableWidget = () => {
  const dispatch = useAppDispatch();
  const { entity: graphicList, status } = useAppSelector((s) => s.graphic);
  const [payload, setPayload] = useState<
    I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>
  >({});
  useEffect(() => {
    dispatch(graphicThank.getList(payload));
  }, [payload]);
  const dateColumns: I_TableColumn<I_Graphic>[] = graphicDateFilters.map(
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
  const cols = tableConstruct<I_Graphic>([
    {
      width: 397,
      common: {
        title: () => {
          return (
            <SearchInputString
              label={"Вид работ"}
              val={payload.search?.WORK_TYPE ?? ""}
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
      common: {
        title: () => {
          return (
            <SearchInputString
              label={"Объекты"}
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

  const windowSize = useSizeHook();

  return (
    <>
      <Flex className="mobile-filter" justify="space-between" align="center">
        <PopoverWidget
          id={Dictionary.SUBSCRIBE_TO_NOTIFICATION_MOBILE.ru + "gr"}
          btn={{
            label: Dictionary.SUBSCRIBE_TO_NOTIFICATION_MOBILE.ru,
            background: "accent",
            icon: <ReportIcon />,
            className: "mobile-popover",
          }}
          title={Dictionary.SUBSCRIBE_TO_NOTIFICATION.ru}
          content={<FormWidget {...FormSubscribeNotification} />}
        />

        <PopoverWidget
          id={"pick-date-gr"}
          title={"Фильтры"}
          content={<FilterMobile payload={payload} setPayload={setPayload} />}
          children={
            <ButtonFilter value={graphicList.length} icon={<SearchIcon />} />
          }
        />
      </Flex>
      {windowSize.width < 1000 ? (
        <MobileList data={graphicList} columns={cols} />
      ) : (
        <div style={{ position: "relative" }}>
          <Table<I_Graphic>
            locale={{
              emptyText: status !== "pending" && (
                <NoData
                  onReset={() => {
                    setPayload({});
                  }}
                />
              ),
            }}
            loading={status === "pending"}
            columns={cols}
            rowKey={"ID"}
            dataSource={graphicList}
            scroll={{ y: 160 * 5 }}
            pagination={false}
          />
          <GetUPBtn />
        </div>
      )}
    </>
  );
};
