import {FC, useEffect, useState} from "react";
import {Input, InputNumber, InputProps} from "antd";
import {useDebouncedCallback} from "use-debounce";
import {InputNumberProps} from "antd/es/input-number";
import TextArea from "antd/es/input/TextArea";

export const InputAsync: FC<{
    ID: number | string,
    value: number,
    type?: 'number',
    disabled?: boolean,
    onChange: (newVal: number) => void
    config?: InputNumberProps,
    placeholder?: string
    readonly: boolean
} | {
    ID: number | string,
    value: string,
    type: 'string' | 'textarea',
    placeholder?: string
    onChange: (newVal: string) => void
    config?: InputProps,
    disabled?: boolean
    readonly: boolean
}> = ({
          ID,
          value,
          onChange,
          config,
          disabled,
          type = 'number',
                                   readonly = false,
          placeholder = ''
      }) => {
    const [text, setText] = useState<number | string>(value)
    const debounced = useDebouncedCallback(onChange, 500);
    useEffect(() => {
        setText(value)
    }, [value])
    const key = ID + placeholder
    if (type === 'string') {
        return <Input
            className={'w-100'}
            disabled={disabled}
            key={key}
            width={500}
            id={key}
            placeholder={placeholder}
            size={"small"}
            value={text}
            readOnly={readonly}
            onChange={(v) => {
                setText(v.target.value)
                debounced(v.target.value)
            }}
            {...config as InputProps}
        />
    }
    if (type === 'textarea') {
        return <TextArea
            key={key}
            id={key}
            disabled={disabled}
            placeholder={placeholder}
            readOnly={readonly}
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
            key={key}
            placeholder={placeholder}
            size={"small"}
            id={key}
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