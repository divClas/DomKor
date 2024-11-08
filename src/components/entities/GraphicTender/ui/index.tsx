import {FC} from "react";
import './style.scss'
import { GraphicTenderEntityBL_Properties } from "./Blocks/Properties";

export const GraphicTenderEntity: FC = () => {
  return (
    <div
      className={'graphic-tender-mobile'}
    >
      <GraphicTenderEntityBL_Properties/>
    </div>
  )
}