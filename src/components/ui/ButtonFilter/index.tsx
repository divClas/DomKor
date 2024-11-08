import {FC, ReactNode} from "react";
import {Flex} from "antd";
import {CountUi} from "@/components/ui/Count";

export const ButtonFilter: FC<{
    icon: ReactNode
    value: number
}> = ({
          icon,
          value
      }) => {
    return (
        <Flex gap={8}
              className={'bg bg--gray pd-wid'}
              align={'center'}
        >
            {icon}
            <CountUi value={value} />
        </Flex>
    )
}