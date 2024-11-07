import {FC} from "react";
import {Flex} from "antd";
import {ReactComponent as CloseIcon} from '@/assets/close-dark.svg';
import {usePopover} from "@/contexts/popover.tsx";

export const TitlePopover: FC<{
    title?: string
}> = ({title}) => {
    const {setIsOpen} = usePopover();
    return (
        <Flex className={'w-100'}
              justify={'space-between'}
              align={'center'}
        >
            <span className={'fs--md fw--lg'}>{title}</span>
            <CloseIcon
                className={'cursor'}
                onClick={() => {
                    setIsOpen(false)
                }}
            />
        </Flex>
    )
}