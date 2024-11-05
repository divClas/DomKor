import {InputAsync} from "@/components/ui/InputAsync";
import {Flex} from "antd";
import {FC} from "react";
import {ReactComponent as CloseIcon} from "@/assets/closeIcon.svg";
import {ReactComponent as SearchIcon} from "@/assets/search.svg";

export const SearchInputString: FC<{
    label: string
    val?: string
    onChange?: (val: string) => void
    editable?: boolean
}> = ({
          label,
          val,
          onChange = () => {
          },
                                          editable = true
      }) => {
    return (
        <Flex justify="space-between"
              align="center"
              className="input-group"
        >
            <div className="input-wrapper">
                <InputAsync
                    ID={"work-type"}
                    onChange={onChange}
                    value={val ?? ''}
                    type="string"
                    disabled={!editable}
                />
                <label color="#757778"
                       className={'fs--sm'}
                       htmlFor="work-type"
                >
                    {label}
                </label>
            </div>
            {editable && <SearchIcon className="icon" />}
            {editable && !!val && (
                <CloseIcon className="icon"
                           onClick={() => {
                               onChange('');
                           }}
                />
            )}
        </Flex>
    )
}