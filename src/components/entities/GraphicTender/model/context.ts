import {createContext, useContext} from 'react';
import {I_GraphicTender} from "@/types/graphicTender.ts";

export interface I_GraphicTenderContext {
  graphicTender: I_GraphicTender
}

export const GraphicTenderInitial: I_GraphicTender = {
  ID: "-1",
  NAME: "",
  CONTRACT_SIGNING: "",
  OBJECTS: "",
  TENDER_PLANNED: "",
  SMR_START: "",
  WINNER_APPROVAL: "",
  WORK_TYPE: ""
}
export const GraphicTenderContext = createContext<I_GraphicTenderContext>({
  graphicTender: GraphicTenderInitial,
});

export const useGraphicTender = () => {
  const context = useContext(GraphicTenderContext);
  if (!context) {
    throw new Error('useGraphicTender must be used within GraphicTenderProvider');
  }
  return context;
};