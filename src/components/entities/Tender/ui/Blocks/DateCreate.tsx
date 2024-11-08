import {useTender} from "@/components/entities/Tender/model/context.ts";
import {Typography} from "antd";
import {textFormat} from "@/helpers/textFormat.ts";

export const TenderBL_DateCreate = {
  Pc: () => {
    const {tender} = useTender()
    return (
      <Typography.Text children={textFormat.date.YMD_dMY(tender.DATE_CREATE)}
                       className="fs--md fw--sm color--gray view--pc" />
    )
  },
  Mb: () => {
    const {tender} = useTender()
    return (
      <Typography.Text children={textFormat.date.YMD_dMY(tender.DATE_CREATE)}
                       className="fw--sm fs--sm color--gray view--mb ff-apercy" />
    )
  }
}