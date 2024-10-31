import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { graphicKPThank } from "@/store/graphicKP";
import { cityThank } from "@/store/city";
import { GraphickKpFilters } from "../GraphickKpFilters";
import { List } from "./list";

export const GraphicsKpTableWidget = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(graphicKPThank.getList({ filter: {} }));
    dispatch(cityThank.getList({}));
  }, []);
  // const { entity: graphicKpList } = useAppSelector((s) => s.graphicKP);
  const { entity: cityList } = useAppSelector((s) => s.city);
  const { entity: graphicKpList } = useAppSelector((s) => s.graphicKP);
  console.log(graphicKpList);
  return (
    <>
      <GraphickKpFilters cities={cityList} />
      <List items={graphicKpList} />
    </>
  );
};
