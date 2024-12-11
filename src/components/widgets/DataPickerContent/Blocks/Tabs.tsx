import {Flex, Tabs} from "antd";
import useSizeHook from "@/hooks/useSizeHook.ts";
import {I_DateFilter} from "@/types/api.ts";
import {FC, useState} from "react";
import {SelectUi} from "@/components/ui/Select";
import {I_DateTabsOption, TabOptions} from "@/components/widgets/DataPickerContent/config/tabOptions.tsx";
import {C_MB, C_PAD} from "@/contexts/theme.ts";

export const DataPickerContentBL_Tabs: FC<{
    date: I_DateFilter,
    setDate: (val: I_DateFilter) => void
}> = ({
          date,
          setDate
      }) => {
    const size = useSizeHook()
    const options = TabOptions(date, setDate, size.width < C_MB)
    const [selectedDateKey, setSelectedDateKey] = useState<I_DateTabsOption['key']>('Период')
    if (size.width < C_PAD) return (
        <Flex vertical={true}
              gap={10}
        >
            <SelectUi onChange={setSelectedDateKey}
                      value={selectedDateKey}
                      icon={true}
                      className={'w-100'}
                      options={options.map(o => ({
                          label: o.label,
                          value: o.label,
                      }))}
            />
            {options.map(o => (selectedDateKey === o.key && <div key={o.key}>{o.children}</div>))}
        </Flex>
    )
    return (
        <Tabs
            defaultActiveKey="Период"
            items={options}
        />
    )
}