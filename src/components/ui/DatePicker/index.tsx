import {Flex, theme, Typography} from "antd";
import Calendar from "../Calendar";
import {MaskedInput} from "antd-mask-input";
import React, {FC, useMemo, useState} from "react";
import dayjs from "dayjs";

export const DatePickerWidget: FC<{
    label: string
    value: string | undefined
    onChange: (val: string) => void
    navSide?: 'left' | 'right'
}> = ({
          label,
          value,
          onChange,
          navSide = 'right'
      }) => {
    const {token} = theme.useToken();
    const [date, setDate] = useState<string>(!!value ? value : dayjs(new Date()).format('YYYY-MM-DD'))

    const wrapperStyle: React.CSSProperties = {
        width: 307,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const handleCalendarChange = (selectedDate: Date) => {
        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
        setDate(formattedDate);
        onChange(formattedDate);
    };

    return (
        <Flex vertical={true}>
            <Typography.Text strong>{label}</Typography.Text>
            <div
                className={'ant-form-item'}
                style={{
                    margin: "12px 0px"
                }}
            >
                {useMemo(() => <MaskedInput
                    mask={Date}
                    placeholder="ДД.ММ.ГГГГ"
                    value={dayjs(date, 'YYYY-MM-DD').format('DD.MM.YYYY')}
                    onChange={e => {
                        const clearDate = e.target.value.replace(/\_/g, '')
                        if (clearDate.length === 10) {
                            const newDate = dayjs(clearDate, 'DD.MM.YYYY').format('YYYY-MM-DD');
                            onChange(newDate);
                            setDate(newDate);
                        }
                    }}
                    style={{ width: "100%"}}
                />, [date])}
            </div>

            <div style={wrapperStyle}>
                <Calendar
                    navSide={navSide}
                    onChange={handleCalendarChange}
                    initialDate={dayjs(date).toDate()}
                />
            </div>
        </Flex>
    )
}