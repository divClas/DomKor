import {FC} from "react";
import {Flex, Typography} from "antd";
import { I_StatusType} from "@/store/notification";
import StatusIcon from "@/components/ui/StatusIcon";

export const MessageFormUi: FC<{
    status: I_StatusType
    label: string
}> = ({
          status,
          label
      }) => {
    return (
        <Flex className={`pd-sm fs--sm fw--def mb-3 status-bg--${status}`}
              gap={13}
              align={'center'}
        >
            <StatusIcon type={status} />
            <Typography.Text>{label}</Typography.Text>
        </Flex>
    )
}