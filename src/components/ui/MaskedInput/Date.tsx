import {FC, useEffect, useState} from "react";

export const MaskedInputDateUI: FC<{
    value: string
    mask: string // e.g. "99.99.9999" or "99/99/9999"
    onChange: (value: string) => void
    disabled?: boolean
    className?: string
}> = ({
          value,
          mask,
          onChange,
          disabled,
          className = ''
      }) => {
    const [strVal, setStrVal] = useState<string>(value)
    useEffect(() => {
        setStrVal(value)
    }, [value])
    const maskArr = mask.split('')
    const replaceValToMaskChars = (newVal: string | null): string => {
        const arStr = strVal.split('')
        const newIndex = arStr.findIndex((v, i) => {
            return (maskArr[i] === v && v !== '.')
        })
        if (newVal == null) {
            arStr[newIndex + 1] = maskArr[newIndex + 1]
        } else {
            arStr[newIndex] = newVal
        }
        return arStr.join('')
    }
    const validateForNumbers = (str: string): boolean => {
        return /^[\d._]+$/.test(str);
    }
    const validateForEmpty = (str: string): boolean => {
        return !!str.replace(/[_.\s]/g, '');
    }
    const validateLength = (str: string): boolean => {
        return (str.length > mask.length);
    }
    const onChangeHandler = (str: string, newVal: string | null) => {

        if (validateLength(str)) {
            const s = replaceValToMaskChars(newVal)
            setStrVal(s)
            if(s.slice(-1) != mask.slice(-1)){
                onChange(s)
            }
            return false
        }
        if (!validateForEmpty(str)) {
            setStrVal(mask)
            return false
        }
        if (!validateForNumbers(str)) {
            setStrVal(mask)
            return false
        }
        console.log(str)
        setStrVal(str);
        onChange(str);
    }

    return (
        <input
            disabled={disabled}
            value={strVal}
            onClick={()=>{
                if(value.length == 0){
                    setStrVal(mask)
                }
            }}
            placeholder={mask}
            className={className}
            onChange={(e) => onChangeHandler(e.target.value, (e.nativeEvent as InputEvent).data)}
        />
    )
}
