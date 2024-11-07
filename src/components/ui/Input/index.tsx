import {FC, useEffect, useState} from "react";
import {InputAsync} from "@/components/ui/InputAsync";
import {Flex, Input} from "antd";
import {MaskedInput} from "antd-mask-input";
import {ReactComponent as CloseIcon} from '@/assets/close-dark.svg';

export const InputUi: FC<{
    type: 'async' | 'masked' | 'default'
    disabled: boolean
    htmlType?: 'mail' | 'phone'
    mask?: string
    label: string
    val?: string
    onChange: (val: string) => void
    noEditable?: boolean
    required?: boolean
    className?: string
    allowClear?: boolean
    onClose?: () => void
}> = ({
          type,
          label,
          htmlType,
          disabled, required,
          val,
          onChange,
          noEditable,
          className = '',
          mask = '',
          allowClear,
          onClose
      }) => {
    const [value, setValue] = useState<string>(val ?? '')
    useEffect(() => {
        setValue(val ?? '')
    }, [val])
    const CloseComponent = () => (allowClear && value) ? (
        <CloseIcon className={'cursor'}
                   onClick={() => {
                       setValue('')
                       if (onClose) {
                           onClose()
                       }
                   }}
        />
    ) : null
    return (
        <Flex justify="space-between"
              align="center"
              className="input-group"
        >
            <div className="input-wrapper">
                {type === 'async' && (
                    <InputAsync
                        onChange={(v) => {
                            setValue(v)
                            onChange(v)
                        }}
                        value={value}
                        type="string"
                        disabled={noEditable ?? disabled}
                        placeholder={'Введите текст'}
                    />
                )}
                {type === 'masked' && (
                    <MaskedInput
                        mask={mask}
                        onChange={(v) => {
                            setValue(v.target.value)
                            onChange(v.target.value)
                        }}
                        value={value.replace(/\_/g, '')}
                        disabled={noEditable ?? disabled}
                        className={className}
                    />
                )}
                {type === 'default' && (
                    <Input
                        onChange={(v) => {
                            setValue(v.target.value)
                            onChange(v.target.value)
                        }}
                        value={value}
                        type={htmlType}
                        disabled={noEditable ?? disabled}
                        className={className}
                        placeholder={'Введите текст'}
                    />
                )}
                <CloseComponent />
                <label color="#757778"
                       className={'fs--sm fw--lg'}
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