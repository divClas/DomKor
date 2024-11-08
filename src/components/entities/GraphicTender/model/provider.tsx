import {FC, ReactNode} from "react";
import {I_GraphicTender} from "@/types/graphicTender.ts";
import {GraphicTenderContext} from "@/components/entities/GraphicTender/model/context.ts";

export const GraphicTenderProvider: FC<{
  children: ReactNode,
  graphicTender: I_GraphicTender
}> = ({children, graphicTender}) => {
  return (
    <GraphicTenderContext.Provider
      value={{graphicTender}}
      children={children}
    />
  );
};