import {FC, ReactNode} from "react";
import {TenderContext} from "@/components/entities/Tender/model/context.ts";
import {I_Tender} from "@/types/tender.ts";

export const TenderProvider: FC<{
  children: ReactNode,
  tender: I_Tender
}> = ({children, tender}) => {

  return (
    <TenderContext.Provider value={{tender}}>
      {children}
    </TenderContext.Provider>
  );
};