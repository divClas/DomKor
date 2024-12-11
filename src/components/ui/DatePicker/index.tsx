import {Flex, theme, Typography} from "antd";
import Calendar from "../Calendar";
import React, {FC, useState} from "react";
import dayjs from "dayjs";
import {InputUi} from "@/components/ui/Input";
import useSizeHook from "@/hooks/useSizeHook.ts";
import {C_PAD} from "@/contexts/theme.ts";

export const DatePickerWidget: FC<{
    label: string
    value: string | undefined
    onChange: (val: string) => void
    navSide?: 'left' | 'right'
}> = ({
          label,
          value,
          onChange, 
          navSide
      }) => {
    const {token} = theme.useToken();
    const [date, setDate] = useState<string | undefined>(value)
    const {width} = useSizeHook()
    const wrapperStyle: React.CSSProperties = {
        width: width > C_PAD ? 307 : '100%',
        border: `1px solid ${token.colorBorderSecondary}`,
    };

    const handleCalendarChange = (selectedDate: Date) => {
        const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
        setDate(formattedDate);
        onChange(formattedDate);
    };
    return (
        <Flex vertical={true}>
            {width > C_PAD && <Typography.Text strong>{label}</Typography.Text>}
            <div
                className={'ant-form-item'}
                style={{
                    margin: "12px 0px"
                }}
            >
                <InputUi
                    type={'date'}
                    placeholder="ДД.ММ.ГГГГ"
                    val={date}
                    label={label}
                    onChange={value => {
                        const clearDate = value.replace(/\_/g, '')
                        if (clearDate.length === 10) {
                            const newDate = dayjs(clearDate, 'DD.MM.YYYY').format('YYYY-MM-DD');
                            onChange(newDate);
                            setDate(newDate);
                        }
                    }}
                    className={'w-100'}
                />

            </div>

            <div style={wrapperStyle}>
                <Calendar
                    navSide={navSide}
                    onChange={handleCalendarChange}
                    date={date ? dayjs(date).toDate() : undefined}
                />
            </div>
        </Flex>
    )
}