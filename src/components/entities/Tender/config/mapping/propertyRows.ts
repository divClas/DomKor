import {I_Row} from "@/types/app.ts";
import {textFormat} from "@/helpers/textFormat.ts";
import {I_Tender} from "@/types/tender.ts";

export const propertyRows: I_Row<I_Tender>[] = [
  {
    label: 'Заявки принимаются до:',
    formatter: textFormat.date.YMD_dMY,
    propertyKey: "SUBMISSION_DEADLINE"
  },
  {
    label: 'Дата начала работ:',
    formatter: textFormat.date.YMD_dMY,
    propertyKey: "START_WORK_DATE"
  },
  {
    label: 'Дата окончания тендера:',
    formatter: textFormat.date.YMD_dMY,
    propertyKey: "TENDER_END_DATE"
  },
  {
    label: 'Адрес:',
    propertyKey: "ADDRESS"
  },
  {
    label: 'Ответственный:',
    propertyKey: "PERSON"
  },
]