import {createContext, useContext} from 'react';
import {I_PayloadList, T_PromiseStatus} from "@/types/api.ts";
import {I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH} from "@/store/graphic";
import {I_GraphicTender} from "@/types/graphicTender.ts";

export interface I_GraphicTenderPageContext {
  payload: I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>
  setPayload: (payload: I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>) => void
  graphicsTenderList: I_GraphicTender[]
  status: T_PromiseStatus
}

export const PayloadInitialGraphicTender: I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH> = {
  filter: {},
  search: {},
  search_type: "AND",
  sort_type: "ASC",
  sortby: ""
}
export const GraphicTenderPageContext = createContext<I_GraphicTenderPageContext>({
  payload: PayloadInitialGraphicTender,
  setPayload: () => {
  },
  graphicsTenderList: [],
  status: "fulfilled"
});

export const useGraphicTenderPage = () => {
  const context = useContext(GraphicTenderPageContext);
  if (!context) {
    throw new Error('useGraphicTenderPage must be used within GraphicTenderPageProvider');
  }
  return context;
};