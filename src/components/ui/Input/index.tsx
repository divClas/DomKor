import {FC, useEffect, useState} from "react";
import {InputAsync} from "@/components/ui/InputAsync";
import {Flex, Input} from "antd";
import {ReactComponent as CloseIcon} from '@/assets/close-dark.svg';
import {MaskedInputUI} from "@/components/ui/MaskedInput";
import dayjs from "dayjs";
import {MaskedInput} from "antd-mask-input";

export const InputUi: FC<{
    type: 'async' | 'masked' | 'default' | 'date'
    disabled?: boolean
    htmlType?: 'mail' | 'phone'
    mask?: string
    label: string
    val?: string
    onChange: (val: string) => void
    noEditable?: boolean
    required?: boolean
    className?: string
    allowClear?: boolean
    placeholder?: string
    maskChar?: string
    asyncWait?: number
    onClear?: () => void
}> = ({
          type,
          label,
          htmlType,
          disabled,
          required,
          val,
          onChange,
          noEditable,
          className = '',
          mask = '',
          allowClear,
          onClear,
          placeholder,
          asyncWait,
          maskChar
      }) => {
    const [value, setValue] = useState<string>(val ?? '')
    useEffect(() => {
        setValue(val ?? '')
    }, [val])
    const setValueHandler = (val: string) => {
        setValue(val)
        onChange(val)
    }
    return (
        <Flex justify="space-between"
              align="center"
              className="input-group"
        >
            <div className="input-wrapper">
                {type === 'async' && (
                    <InputAsync
                        onChange={setValueHandler}
                        value={value}
                        type="string"
                        className={className}
                        disabled={noEditable ?? disabled}
                        placeholder={placeholder}
                        wait={asyncWait}
                    />
                )}
                {type === 'masked' && (
                    <MaskedInputUI
                        mask={mask}
                        onChange={(v) => {
                            setValueHandler(v)
                        }}
                        maskChar={maskChar}
                        value={value}
                        disabled={noEditable ?? disabled}
                        className={className}
                    />
                )}
                {type === 'default' && (
                    <Input
                        onChange={(v) => {
                            setValueHandler(v.target.value)
                        }}
                        value={value}
                        type={htmlType}
                        disabled={noEditable ?? disabled}
                        className={className}
                        placeholder={placeholder ?? ''}
                    />
                )}
                {type === 'date' && (
                    <MaskedInput
                        mask={Date}
                        placeholder="ДД.ММ.ГГГГ"
                        value={!!value ? dayjs(value, 'YYYY-MM-DD').format('DD.MM.YYYY') : ''}
                        onChange={(v) => {
                            setValueHandler(v.target.value)
                        }}
                        style={{width: "100%"}}
                    />
                )}
                {(allowClear && value) && (
                    <CloseIcon className={'cursor'}
                               onClick={() => {
                                   setValueHandler('')
                                   if (onClear) {
                                       onClear()
                                   }
                               }}
                    />
                )}
                <label color="#757778"
                       className={'fs--sm fw--def'}
                       htmlFor="work-type"
                >
                    {label}
                    {required && (
                        <span style={{marginLeft: '4px'}}
                              className={'fs--xsm fw--xsm ln-sm color--red'}
                              children={"*"}
                        />
                    )}
                </label>
            </div>
        </Flex>
    )
}