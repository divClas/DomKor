import {Flex, Typography} from "antd";
import {FC, ReactNode} from "react";
import {ReactComponent as CloseIcon} from '@/assets/close-dark.svg';
import './style.scss'

export const ModalWidget: FC<{
    title: string
    children: ReactNode
    onClose?: () => void
}> = ({
          children,
          title,
          onClose
      }) => {
    return (
        <Flex vertical={true}
              gap={10}
              className={'modal-common bg bg--white'}
        >
            <Flex className={'modal-common-head w-100'}
                  justify={'space-between'}
                  align={'center'}
                  gap={10}
            >
                <Typography.Text className={'fs--md fw--lg'}>{title}</Typography.Text>
                <div className={'modal-common-close'} onClick={onClose}>
                    <CloseIcon/>
                </div>
            </Flex>
            <Flex className={'w-100'}>
                {children}
            </Flex>
        </Flex>
    )
}