import { I_Graphic } from "@/types/graphic";

export const columns: {
  title: string;
  dataIndex: keyof I_Graphic; // Убедитесь, что dataIndex соответствует ключам I_Graphic
  format?: string;
}[] = [
  { title: "Вид работ", dataIndex: "WORK_TYPE" },
  { title: "Объекты", dataIndex: "OBJECTS" },
  { title: "Старт СМР по оперативному плану:", dataIndex: "SMR_START" },
  { title: "Плановая дата проведения тендера:", dataIndex: "TENDER_PLANNED" },
  {
    title: "Плановая дата утверждения победителя тендера:",
    dataIndex: "WINNER_APPROVAL",
  },
  {
    title: "Плановая дата подписания контракта:",
    dataIndex: "CONTRACT_SIGNING",
  },
];
