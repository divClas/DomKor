import {FC, ReactNode, useEffect, useState} from "react";
import {GraphicTenderPageContext} from "@/components/pages/GraphicTenders/model/context.ts";
import {useAppDispatch, useAppSelector} from "@/hooks/storeHooks.ts";
import {I_PayloadList} from "@/types/api.ts";
import {graphicThank, I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH} from "@/store/graphic";

export const GraphicTenderPageProvider: FC<{
  children: ReactNode
}> = ({children}) => {
  const dispatch = useAppDispatch();
  const {entity: graphicsTenderList, status} = useAppSelector((s) => s.graphic);
  const [payload, setPayload] = useState<
    I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>
  >({});

  useEffect(() => {
    dispatch(graphicThank.getList(payload));
  }, [payload]);
  return (
    <GraphicTenderPageContext.Provider value={{
      graphicsTenderList,
      status,
      setPayload,
      payload
    }}>
      {children}
    </GraphicTenderPageContext.Provider>
  );
};