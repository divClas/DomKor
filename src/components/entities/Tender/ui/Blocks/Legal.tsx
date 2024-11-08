import {useTender} from "@/components/entities/Tender/model/context.ts";
import useSizeHook from "@/hooks/useSizeHook.ts";
import {Typography} from "antd";

export const TenderBL_LegalText = () => {
  const {tender} = useTender()
  const {width} = useSizeHook()

  return (
    <Typography.Text children={tender.LEGAL_ENTITY}
                     className={`${width > 1000 ? 'fs--md' : 'fs--sm'} fw--sm color--gray ff-apercy`}/>
  )
}