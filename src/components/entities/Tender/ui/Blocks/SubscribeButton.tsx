import {Dictionary} from "@/contexts/Dictionary.ts";
import {FormWidget} from "@/components/widgets/Form";
import {FormSubscribeKP} from "@/contexts/forms.ts";
import {PopoverWidget} from "@/components/ui/Popover";
import {useTender} from "@/components/entities/Tender/model/context.ts";

export const TenderBL_SubscribeButton = () =>{
  const {tender} = useTender()

  return (
    <PopoverWidget
      btn={{
        label: Dictionary.SEND_EVENT.ru,
        background: "accent",
        className: 'w-100 h-36'
      }}
      title={Dictionary.SEND_EVENT_TENDER.ru}
      content={<FormWidget {...FormSubscribeKP(tender.ID)} />}
    />
  )
}