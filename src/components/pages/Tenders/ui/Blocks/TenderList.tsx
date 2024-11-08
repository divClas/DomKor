import {useAppSelector} from "@/hooks/storeHooks.ts";
import {NoData} from "@/components/ui/NoData";
import {FC} from "react";
import {TenderListWidget} from "@/components/widgets/Mappings/Tender.tsx";
import {useTenderPage} from "@/components/pages/Tenders/model/context.ts";

export const TenderBL_TenderList: FC = () => {
  const {entity: tenderList, status} = useAppSelector((s) => s.graphicKP);
  const {setPayload} = useTenderPage()

  if (tenderList.length === 0 && status !== "pending") {
    return <NoData onReset={() => setPayload({})} />
  } else {
    return <TenderListWidget list={tenderList} />;
  }
};
