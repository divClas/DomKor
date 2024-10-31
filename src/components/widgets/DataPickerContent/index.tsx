import {Button, Flex, Tabs} from "antd";
import {DatePickerWidget} from "@/components/ui/DatePicker";
import {FC, useState} from "react";
import {I_DateFilter} from "@/types/api.ts";
import dayjs from "dayjs";

export const DataPickerContent: FC<{
    value: I_DateFilter | undefined
    onChange: (val: I_DateFilter) => void
}> = ({
          value,
          onChange
      }) => {
    const initDate = {
        FROM: '',
        TO: ''
    }
    const [date, setDate] = useState<I_DateFilter>(value ?? initDate)
    return (
        <div style={{width: "638px", padding: "16px 20px"}}>
            <Tabs defaultActiveKey="Период"
                  items={[
                      {
                          label: "Период",
                          key: 'Период',
                          children: <Flex justify="space-between"
                                          align="center"
                                          gap={24}
                          >
                              <DatePickerWidget
                                  label={'От'}
                                  value={date?.FROM}
                                  onChange={(e) => {
                                      setDate({
                                          TO: date?.TO ?? '',
                                          FROM: dayjs(e).format('YYYY-MM-DD'),
                                      })
                                  }}
                              />
                              <DatePickerWidget
                                  label={'До'}
                                  value={date?.TO}
                                  onChange={(e) => {
                                      setDate({
                                          FROM: date?.FROM ?? '',
                                          TO: dayjs(e).format('YYYY-MM-DD'),
                                      })
                                  }}
                              />
                          </Flex>
                      },
                      {
                          key: 'Конкретная дата',
                          label: 'Конкретная дата',
                          children: <DatePickerWidget
                              label={'Выберите дату'}
                              value={date?.TO}
                              onChange={(e) => {
                                  setDate({
                                      FROM: dayjs(e).format('YYYY-MM-DD'),
                                      TO: dayjs(e).format('YYYY-MM-DD'),
                                  })
                              }}
                          />
                      }
                  ]}
            />
            <Flex align="center"
                  gap={12}
                  style={{paddingTop: "24px"}}
            >
                <Button type="primary"
                        onClick={() => {
                            onChange(date)
                        }}
                >Применить</Button>
                <Button type="link"
                        onClick={() => {
                            onChange(initDate)
                            setDate(initDate)
                        }}
                >Отмена</Button>
            </Flex>
        </div>
    );
};
