import {Flex, Tabs} from "antd";
import {DatePickerWidget} from "@/components/ui/DatePicker";
import {FC, useState} from "react";
import {I_DateFilter} from "@/types/api.ts";
import dayjs from "dayjs";
import {Button} from "@/components/ui/Button";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {useAppDispatch} from "@/hooks/storeHooks.ts";
import {setPopover} from "@/store/app";
import useSizeHook from "@/hooks/useSizeHook.ts";

export const DataPickerContent: FC<{
    value: I_DateFilter | undefined;
    onChange: (val: I_DateFilter) => void;
}> = ({value, onChange}) => {
    const initDate = {
        FROM: "",
        TO: "",
    };
    const dispatch = useAppDispatch()
    const size = useSizeHook()
    const [date, setDate] = useState<I_DateFilter>(value ?? initDate);
    return (
        <div>
            <Tabs
                defaultActiveKey="Период"
                items={[
                    {
                        label: "Период",
                        key: "Период",
                        children: (
                            <Flex justify="space-between"
                                  gap={24}
                                  vertical={size.width < 1000}
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
                        key: "Конкретная дата",
                        label: "Конкретная дата",
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
                ]}
            />
            <Flex align="center"
                  gap={12}
                  style={{paddingTop: "24px"}}
            >
                <Flex>
                    <Button
                        background={"accent"}
                        onClick={() => {
                            onChange(date);
                            dispatch(setPopover(''))
                        }}
                        label={Dictionary.APPLY.ru}
                    />
                </Flex>
                <Flex>
                    <Button
                        className="colorBlack"
                        onClick={() => {
                            onChange(initDate);
                            setDate(initDate);
                            dispatch(setPopover(''))
                        }}
                        label={Dictionary.CANCEL.ru}
                        background={"transparent"}
                    />
                </Flex>
            </Flex>
        </div>
    );
};
