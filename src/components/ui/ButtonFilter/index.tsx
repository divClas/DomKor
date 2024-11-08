import {FC, ReactNode} from "react";
import {Flex} from "antd";
import {CountUi} from "@/components/ui/Count";

export const ButtonFilter: FC<{
  icon: ReactNode
  value: number
  showCount?: boolean
}> = ({
        icon,
        value,
        showCount
      }) => {
  return (
    <Flex gap={8}
          className={'bg bg--gray pd-wid height-35'}
          align={'center'}
    >
      {icon}
      {showCount && <CountUi value={value ?? 0} />}
    </Flex>
  )
}