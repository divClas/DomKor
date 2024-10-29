import { Flex, Popover, Table, Typography } from "antd";
import { I_Graphic } from "@/types/graphic.ts";
import { tableConstruct } from "@/helpers/tableConstruct.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { graphicThank } from "@/store/graphic";
import { Input } from "antd";
import { ReactComponent as CalendarIcon } from "@/assets/calendar.svg";
import { DataPickerContent } from "../DataPickerContent";

export const GraphicsTableWidget = () => {
  const { Search } = Input;
  const dataColumns = tableConstruct<I_Graphic>([
    {
      type: "string",
      noSort: true,
      common: {
        dataIndex: "WORK_TYPE",
        title: () => (
          <Search
            placeholder="Вид работ"
            onSearch={(value) => console.log("Поиск:", value)}
          />
        ),
      },
    },
    {
      type: "string",
      noSort: true,
      common: {
        dataIndex: "OBJECTS",
        title: () => (
          <Search
            placeholder="Объекты"
            onSearch={(value) => console.log("Поиск:", value)} // Здесь можно добавить обработку поиска
          />
        ),
      },
    },
    {
      type: "date",
      common: {
        dataIndex: "SMR_START",
        title: () => (
          <Flex justify="space-between" align="center">
            <Typography.Text>Старт СМР по оперативному плану</Typography.Text>
            <Popover content={<DataPickerContent />} trigger="click">
              <CalendarIcon />
            </Popover>
          </Flex>
        ),
      },
    },
    {
      type: "date",
      common: {
        dataIndex: "WINNER_APPROVAL",
        title: "Плановая дата проведения тендера",
      },
    },
    {
      type: "date",
      common: {
        dataIndex: "TENDER_PLANNED",
        title: "Плановая дата утверждения победителя тендера",
      },
    },
    {
      type: "date",
      common: {
        dataIndex: "CONTRACT_SIGNING",
        title: "Плановая дата подписания контракта",
      },
    },
    {
      type: "button",
      common: {
        dataIndex: "ID",
        title: "Действие",
      },
      onClick: (value) => {
        console.log(value);
      },
    },
  ]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(graphicThank.getList({}));
  }, []);
  const { entity } = useAppSelector((s) => s.graphic);
  return (
    <Table<I_Graphic> dataSource={entity} rowKey={"ID"} columns={dataColumns} />
  );
};
