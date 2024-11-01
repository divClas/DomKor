import {InputAsync} from "@/components/ui/InputAsync";
import {Flex} from "antd";
import {FC} from "react";
import {ReactComponent as CloseIcon} from "@/assets/closeIcon.svg";
import {ReactComponent as SearchIcon} from "@/assets/search.svg";

export const SearchInputString: FC<{
    label: string
    val: string
    onChange: (val: string) => void
}> = ({
    label,
          val,
          onChange
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
                    value={val}
                    type="string"
                />
                <label color="#757778"
                       htmlFor="work-type"
                >
                    {label}
                </label>
            </div>
            <SearchIcon className="icon" />
            {!!val && (
                <CloseIcon className="icon"
                           onClick={() => {
                               onChange('');
                           }}
                />
            )}
        </Flex>
    )
}