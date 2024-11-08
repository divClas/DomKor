import {FC} from "react";
import {I_Value} from "@/types/app.ts";
import {ValueTextUi} from "@/components/ui/Value";

export const TenderPropertyRow: FC<I_Value> = (props) => {
  return (
    <div className="kp-items">
      <div className="fw--sm fs--sm color--gray ff-apercy">{props.label}</div>
      <div className="fw--def fs--md ff-apercy"><ValueTextUi {...props} /></div>
    </div>)
}