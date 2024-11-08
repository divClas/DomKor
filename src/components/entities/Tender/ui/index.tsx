import {FC} from "react";
import {TenderBL_SubscribeButton,} from "@/components/entities/Tender/ui/Blocks/SubscribeButton.tsx";
import {TenderBL_LinkDownload} from "@/components/entities/Tender/ui/Blocks/LinkDownload.tsx";
import {TenderBL_DateCreate} from "@/components/entities/Tender/ui/Blocks/DateCreate.tsx";
import {TenderBL_LegalText} from "@/components/entities/Tender/ui/Blocks/Legal.tsx";
import {TenderBL_Name} from "@/components/entities/Tender/ui/Blocks/Name.tsx";
import {TenderBL_PropertyList} from "@/components/entities/Tender/ui/Blocks/Mappings/Properties/list.tsx";

export const TenderEntity: FC = () => {
  return (
    <div
      className={`graphics-container`}
    >
      <div className="first-column">
        <TenderBL_Name />
        <TenderBL_LinkDownload.Pc />
      </div>
      <div className="second-column">
        <TenderBL_PropertyList />
        <div className="item">
          <TenderBL_LegalText />
          <TenderBL_DateCreate.Mb />
        </div>
      </div>
      <div className="third-column">
        <TenderBL_SubscribeButton />
        <TenderBL_LinkDownload.Mb />
        <TenderBL_DateCreate.Pc />
      </div>
    </div>
  )
}