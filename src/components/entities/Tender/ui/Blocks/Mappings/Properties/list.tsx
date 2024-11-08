import {useTender} from "@/components/entities/Tender/model/context.ts";
import {propertyRows} from "@/components/entities/Tender/config/mapping/propertyRows.ts";
import {TenderPropertyRow} from "@/components/entities/Tender/ui/Blocks/Mappings/Properties/item.tsx";

export const TenderBL_PropertyList = () => {
  const {tender} = useTender()
  return (
    <div className="kp-char">
      {propertyRows.map((p, index) => (
        <TenderPropertyRow key={index} {...p}
                           value={tender[p.propertyKey]} />
      ))}
    </div>
  )
}