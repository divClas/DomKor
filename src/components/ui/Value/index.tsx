import {FC} from "react";
import {I_Value} from "@/types/app.ts";
import {Typography} from "antd";

export const ValueTextUi: FC<I_Value> = ({value, formatter, postfix, label}) => {
  return (<Typography.Text title={label}>
    {formatter ? formatter(value) : value}&nbsp;{postfix}
  </Typography.Text>)
}