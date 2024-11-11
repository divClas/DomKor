import {Flex} from "antd";
import {FC} from "react";
import {ReactComponent as CloseIcon} from "@/assets/closeIcon.svg";
import {ReactComponent as SearchIcon} from "@/assets/search.svg";
import {InputUi} from "@/components/ui/Input";

export const SearchInputString: FC<{
    label: string
    val?: string
    onChange: (val: string) => void
    noEditable?: boolean
    placeholder?: string
}> = (props) => {
    return (
        <Flex>
            <InputUi {...props} type={'async'} disabled={!!props.noEditable} placeholder={props.placeholder} />
            <Flex>
                {!props.noEditable && <SearchIcon className={"icon bg " + (props.val ? 'bg--gr' : '')} />}
                {!props.noEditable && !!props.val && (
                    <CloseIcon
                               className={"icon cursor bg " + (props.val ? 'bg--gray' : '')}
                               onClick={() => {
                                   props.onChange('');
                               }}
                    />
                )}
            </Flex>
        </Flex>
    )
}