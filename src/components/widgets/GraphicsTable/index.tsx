import { Table } from "antd";
import { I_Graphic } from "@/types/graphic.ts";
import { tableConstruct } from "@/helpers/tableConstruct.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { graphicThank } from "@/store/graphic";

export const GraphicsTableWidget = () => {
  const dataColumns = tableConstruct<I_Graphic>([
    {
      type: "string",
      common: {
        dataIndex: "WORK_TYPE",
        title: "Вид работ",
      },
    },
    {
      type: "string",
      common: {
        dataIndex: "OBJECTS",
        title: "Объекты",
      },
    },
    {
      type: "date",
      common: {
        dataIndex: "SMR_START",
        title: "Старт СМР по оперативному плану",
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
