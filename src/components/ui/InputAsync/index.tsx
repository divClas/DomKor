import {FC, useEffect, useState} from "react";
import {Input, InputNumber, InputProps} from "antd";
import {useDebouncedCallback} from "use-debounce";
import {InputNumberProps} from "antd/es/input-number";
import TextArea from "antd/es/input/TextArea";

export const InputAsync: FC<{
    value: number,
    type?: 'number',
    disabled?: boolean,
    onChange: (newVal: number) => void
    config?: InputNumberProps,
    editable?: boolean
    placeholder?: string
} | {
    value: string,
    type: 'string' | 'textarea',
    placeholder?: string
    onChange: (newVal: string) => void
    config?: InputProps,
    disabled?: boolean
    editable?: boolean
}> = ({
          value,
          onChange,
          config,
          disabled,
          type = 'number',
          placeholder = ''
      }) => {
    const [text, setText] = useState<number | string>(value)
    const debounced = useDebouncedCallback(onChange, 500);
    useEffect(() => {
        setText(value)
    }, [value])
    if (type === 'string') {
        return <Input
            className={'w-100'}
            disabled={disabled}
            width={500}
            placeholder={placeholder}
            size={"small"}
            value={text}
            onChange={(v) => {
                setText(v.target.value)
                debounced(v.target.value)
            }}
            {...config as InputProps}
        />
    }
    if (type === 'textarea') {
        return <TextArea
            disabled={disabled}
            placeholder={placeholder}
            value={text}
            size={"small"}
            onChange={(v) => {
                setText(v.target.value)
                debounced(v.target.value)
            }}
        />
    }
    if (type === 'number') {
        return <InputNumber
            style={{
                width: '100px'
            }}
            disabled={disabled}
            placeholder={placeholder}
            size={"small"}
            status={debounced.isPending() ? 'warning' : ''}
            value={text}
            onChange={(v) => {
                setText(Number(v))
                debounced(Number(v))
            }}
            {...config as InputNumberProps}
        />
    }
    return null
}