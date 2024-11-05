import {FC} from "react";
import {I_FormFiledProps} from "@/types/form.ts";
import {Form} from "antd";
import {MaskedInput} from "antd-mask-input";

export const FieldPhoneUi:FC<I_FormFiledProps> = ({f, disabled}) => {
    return (
        <Form.Item
            label={f.label}
            required={f.required}
            name={String(f.name)}
            initialValue={f.defaultValue}
        >
            <MaskedInput
                mask={
                    '+7 (000) 000-00-00'
                }
                disabled={disabled}
            />
        </Form.Item>
    )
}