import {createContext, useContext} from 'react';
import {I_Tender} from "@/types/tender.ts";

export interface I_TenderContext {
  tender: I_Tender

}

export const TenderInitial: I_Tender = {
  ID: "-1",
  ADDRESS: "",
  CITY: "",
  DATE_CREATE: "",
  DOCUMENT: "",
  NAME: "",
  PERSON: "",
  LEGAL_ENTITY: "",
  SUBMISSION_DEADLINE: "",
  TENDER_END_DATE: "",
  START_WORK_DATE: ""
}
export const TenderContext = createContext<I_TenderContext>({
  tender: TenderInitial,
});

export const useTender = () => {
  const context = useContext(TenderContext);
  if (!context) {
    throw new Error('useTender must be used within TenderProvider');
  }
  return context;
};