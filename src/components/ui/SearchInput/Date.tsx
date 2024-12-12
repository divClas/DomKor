import {Flex} from "antd";
import {FC} from "react";
import {DataPickerContent} from "@/components/widgets/DataPickerContent";
import {ReactComponent as CalendarIcon} from "@/assets/calendar.svg";
import {I_DateFilter} from "@/types/api.ts";
import {ReactComponent as SortIcon} from "@/assets/sortIcon.svg";
import {PopoverWidget} from "@/components/ui/Popover";
import {InputUi} from "@/components/ui/Input";
import dayjs from "dayjs";

export const SearchInputDate: FC<{
    label: string
    value: I_DateFilter | undefined
    onChange: (val: I_DateFilter) => void
    setSort: () => void
    isSort: boolean
    isDateFilter: boolean
}> = ({
          label,
          value = {
              FROM: "",
              TO: ""
          },
          setSort,
          onChange,
          isDateFilter,
          isSort
      }) => {
    return (
        <Flex justify="space-between"
              align="center"
              gap={15}
              vertical={true}
              className={'date-picker-input-wrap'}
        >
            <InputUi
                label={label}
                onChange={() => {
                }}
                disabled={true}
                type={'default'}
                className={'fw--def'}
                val={value.FROM || value.TO ? `${value.FROM ? dayjs(value.FROM, 'YYYY-MM-DD').format('DD.MM.YYYY') : '...'} ${value.TO ? '- ' + dayjs(value.TO, 'YYYY-MM-DD').format('DD.MM.YYYY') : ''}` : undefined}
            />
            <Flex vertical={false}>
                <PopoverWidget
                    content={(
                        <DataPickerContent
                            value={value}
                            onChange={onChange}
                        />
                    )}
                    title={'Выбор даты'}
                >
                    <Flex className={isDateFilter ? 'active-icon' : ''}>
                        <CalendarIcon className="icon cursor" />
                    </Flex>
                </PopoverWidget>
                <Flex className={isSort ? 'active-icon' : ''}>
                    <SortIcon
                        className="icon"
                        onClick={setSort}
                        style={{cursor: "pointer"}}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}
