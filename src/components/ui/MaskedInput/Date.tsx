import {FC} from "react";

export const MaskedInputDateUI: FC<{
    value: string
    onChange: (value: string) => void
    disabled?: boolean
    className?: string
    placeholder?: string
    mask?: string
}> = ({
          value,
          onChange,
          disabled,
          className = '',
          mask = 'DD.MM.YYYY'
      }) => {
    const formatValue = (inputValue: string): string => {
        const digits = inputValue.replace(/\D/g, '');
        let formatted = '';
        let digitIndex = 0;

        for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
            if (mask[i] === '9') {
                if (digitIndex === 0 && parseInt(digits[digitIndex]) > 3) {
                    formatted += '0' + digits[digitIndex];
                } else if (digitIndex === 2 && parseInt(digits[digitIndex]) > 1) {
                    formatted += '0' + digits[digitIndex];
                } else {
                    formatted += digits[digitIndex];
                }
                digitIndex++;
            } else {
                formatted += '.';
            }
        }

        return formatted;
    }

    const validateDate = (dateStr: string): boolean => {
        if (dateStr.length !== 10) return false;

        const [day, month, year] = dateStr.split('.');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

        return date.getDate() === parseInt(day) &&
            date.getMonth() === parseInt(month) - 1 &&
            date.getFullYear() === parseInt(year);
    }

    const onChangeHandler = (str: string) => {
        const cleaned = formatValue(str);
        onChange(cleaned);
    }

    return (
        <input
            disabled={disabled}
            value={value}
            placeholder={mask}
            className={className}
            onChange={({target: {value}}) => onChangeHandler(value)}
            onBlur={() => {
                if (!validateDate(value)) {
                    onChange('');
                }
            }}
            maxLength={10}
        />
    )
}
