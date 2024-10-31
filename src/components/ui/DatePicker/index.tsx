import {Calendar, Flex, theme, Typography} from "antd";
import {MaskedInput} from "antd-mask-input";
import React, {FC, useMemo, useState} from "react";
import dayjs from "dayjs";

export const DatePickerWidget: FC<{
    label: string
    value: string | undefined
    onChange: (val: string) => void
}> = ({
          label,
          value,
          onChange
      }) => {
    const {token} = theme.useToken();
    const [date, setDate] = useState<string>(!!value ? value : dayjs(new Date()).format('YYYY-MM-DD'))
    const wrapperStyle: React.CSSProperties = {
        width: 307,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    return (
        <Flex vertical={true}>
            <Typography.Text strong>{label}</Typography.Text>
            {useMemo(() => <MaskedInput
                mask={Date}
                placeholder="ДД.ММ.ГГГГ"
                value={dayjs(date, 'YYYY-MM-DD').format('DD.MM.YYYY')}
                onChange={e => {
                    const clearDate = e.target.value.replace(/\_/g, '')
                    if (clearDate.length === 10) {
                        onChange(dayjs(clearDate, 'DD.MM.YYYY').format('YYYY-MM-DD'))
                        setDate(dayjs(clearDate, 'DD.MM.YYYY').format('YYYY-MM-DD'))
                    }
                }}
                style={{margin: "12px 0px", width: "100%"}}
            />, [date])}
            <div style={wrapperStyle}>
                <Calendar
                    fullscreen={false}
                    value={dayjs(date, 'YYYY-MM-DD')}
                    onSelect={e => {
                        onChange(e.format('YYYY-MM-DD'))
                        setDate(e.format('YYYY-MM-DD'))
                    }}
                    style={{width: "307px"}}
                />
            </div>
        </Flex>
    )
}