import {FC} from "react";
import {setPopover} from "@/store/app";
import {Flex} from "antd";
import {useAppDispatch} from "@/hooks/storeHooks.ts";
import {ReactComponent as CloseIcon} from '@/assets/close-dark.svg';

export const TitlePopover:FC<{
    title?: string
}> = ({title}) => {
    const dispatch = useAppDispatch()

    return (
        <Flex className={'w-100'}
              justify={'space-between'}
              align={'center'}
        >
            <span className={'fs--md fw--lg'}>{title}</span>
            <CloseIcon
                className={'cursor'}
                onClick={() => {
                    dispatch(setPopover(''))
                }}
            />
        </Flex>
    )
}