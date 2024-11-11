import {FC} from "react";
import {Typography} from "antd";

export const CountUi: FC<{
    value: number
}> = ({value}) => {
    const revValue = value > 99 ? '99+': `${value}`
    return <Typography.Text className={'nowrap'} children={revValue}/>
}