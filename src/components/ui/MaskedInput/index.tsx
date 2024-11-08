import {FC} from "react";

export const MaskedInputUI: FC<{
    value: string
    mask: string
    onChange: (value: string) => void
    maskChar?: string
    disabled?: boolean
    className?: string
}> = ({
    value,
    onChange,
    mask,
    maskChar = '_',
    disabled,
    className = ''
}) => {
    const formatValue = (inputValue: string): string => {
        let formatted = '';
        let valueIndex = 0;
        
        for (let i = 0; i < mask.length && valueIndex < inputValue.length; i++) {
            if (mask[i] === '9') {
                if (/\d/.test(inputValue[valueIndex])) {
                    formatted += inputValue[valueIndex];
                    valueIndex++;
                } else {
                    valueIndex++;
                    i--;
                }
            } else {
                formatted += mask[i];
            }
        }
        return formatted;
    }

    const onChangeHandler = (str: string) => {
        const cleaned = formatValue(str);
        onChange(cleaned);
    }

    return (
        <input 
            disabled={disabled}
            value={value}
            placeholder={mask.replace(/9/g, maskChar)}
            className={className}
            onChange={({target: {value}}) => onChangeHandler(value)}
            onBlur={() => {
                const valueWithoutEmpty = value.replace(/[\s_0]+/g, '');
                if (!valueWithoutEmpty) {
                    onChange('');
                }
            }}
        />
    )
}
