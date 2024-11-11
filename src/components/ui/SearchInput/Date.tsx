import {Flex} from "antd";
import {FC} from "react";
import {DataPickerContent} from "@/components/widgets/DataPickerContent";
import {ReactComponent as CalendarIcon} from "@/assets/calendar.svg";
import {I_DateFilter} from "@/types/api.ts";
import {ReactComponent as SortIcon} from "@/assets/sortIcon.svg";
import {PopoverWidget} from "@/components/ui/Popover";
import {InputUi} from "@/components/ui/Input";
import dayjs from "dayjs";
import useSizeHook from "@/hooks/useSizeHook.ts";

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
  const size = useSizeHook()
    return (
        <Flex justify="space-between"
              align="center"
              gap={size.width < 1150 ? 15 : 5}
              vertical={size.width < 1150}
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
            <Flex vertical={size.width < 1400 && size.width >= 1150}>
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
