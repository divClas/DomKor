import {TenderProvider} from "@/components/entities/Tender/model/provider.tsx";
import {TenderEntity} from "@/components/entities/Tender/ui";
import {FC} from "react";
import {I_Tender} from "@/types/tender.ts";

export const TenderListWidget: FC<{
  list: I_Tender[]
}> = ({list}) => (
  <div>
    {list.map((item) => (
      <TenderProvider tender={item}
                      key={item.ID}
                      children={<TenderEntity />} />
    ))}
  </div>
)