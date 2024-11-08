import {createContext, useContext} from 'react';
import {I_PayloadList, T_PromiseStatus} from "@/types/api.ts";
import {I_Tender} from "@/types/tender.ts";
import {I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH} from "@/store/graphicKP";
export type T_PayloadTender = I_PayloadList<I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH>
export interface I_TenderPageContext {
  payload: T_PayloadTender
  setPayload: (payload: T_PayloadTender) => void
  tenderList: I_Tender[]
  status: T_PromiseStatus
}

export const PayloadInitialTender: T_PayloadTender = {
  filter: {},
  search: {},
  search_type: "AND",
  sort_type: "ASC",
  sortby: ""
}
export const TenderPageContext = createContext<I_TenderPageContext>({
  payload: PayloadInitialTender,
  setPayload: () => {
  },
  tenderList: [],
  status: "fulfilled"
});

export const useTenderPage = () => {
  const context = useContext(TenderPageContext);
  if (!context) {
    throw new Error('useTenderPage must be used within TenderPageProvider');
  }
  return context;
};