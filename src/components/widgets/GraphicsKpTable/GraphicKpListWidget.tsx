import {useAppSelector} from "@/hooks/storeHooks.ts";
import {NoData} from "@/components/ui/NoData";
import {FC} from "react";
import {TenderListWidget} from "@/components/widgets/Mappings/Tender.tsx";

export const GraphicKpListWidget: FC<{
  onReset: () => void;
}> = ({onReset}) => {
  const {entity: tenderList, status} = useAppSelector((s) => s.graphicKP);
  if (tenderList.length === 0 && status !== "pending") <NoData onReset={onReset} />
  return <TenderListWidget list={tenderList} />;
};
