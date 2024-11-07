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
}> = (props) => {
    return (
        <Flex>
            <InputUi {...props} type={'async'} disabled={!!props.noEditable}  />
            <Flex>
                {!props.noEditable && <SearchIcon className={"icon " + (props.val ? 'bg--gray' : '')} />}
                {!props.noEditable && !!props.val && (
                    <CloseIcon className="icon cursor"
                               onClick={() => {
                                   props.onChange('');
                               }}
                    />
                )}
            </Flex>
        </Flex>
    )
}