import {Flex} from "antd";
import {DatePickerWidget} from "@/components/ui/DatePicker";
import dayjs from "dayjs";
import {I_DateFilter} from "@/types/api.ts";
import {ReactNode} from "react";

export interface I_DateTabsOption {
  label: "Период" | "Конкретная дата"
  key: "Период" | "Конкретная дата"
  children: ReactNode
}

export const TabOptions = (
  date: I_DateFilter,
  setDate: (val: I_DateFilter) => void,
  isMobile: boolean
): I_DateTabsOption[] => [
  {
    label: "Период",
    key: "Период",
    children: (
      <Flex justify="space-between"
            gap={24}
            vertical={isMobile}
      >
        <DatePickerWidget
          label={"От"}
          value={date?.FROM}
          navSide={'left'}
          onChange={(e) => {
            setDate({
              TO: date?.TO ?? "",
              FROM: dayjs(e).format("YYYY-MM-DD"),
            });
          }}
        />
        <DatePickerWidget
          label={"До"}
          value={date?.TO}
          navSide={'right'}
          onChange={(e) => {
            setDate({
              FROM: date?.FROM ?? "",
              TO: dayjs(e).format("YYYY-MM-DD"),
            });
          }}
        />
      </Flex>
    ),
  },
  {
    label: "Конкретная дата",
    key: "Конкретная дата",
    children: (
      <DatePickerWidget
        label={"Выберите дату"}
        value={date?.TO}
        onChange={(e) => {
          setDate({
            FROM: dayjs(e).format("YYYY-MM-DD"),
            TO: dayjs(e).format("YYYY-MM-DD"),
          });
        }}
      />
    ),
  },
]