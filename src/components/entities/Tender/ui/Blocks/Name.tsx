import {useTender} from "@/components/entities/Tender/model/context.ts";
import {Typography} from "antd";

export const TenderBL_Name = () => {
  const {tender} = useTender()

  return (
    <Typography.Text children={tender.NAME}
                     className={`kp-name`}/>
  )
}