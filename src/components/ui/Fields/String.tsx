import {FC} from "react";
import {I_FormFiledProps} from "@/types/form.ts";
import {Form, Input} from "antd";

export const FieldStringUi:FC<I_FormFiledProps> = ({f, disabled}) => {
    return (
        <Form.Item
            required={f.required}
            name={String(f.name)}
            initialValue={f.defaultValue}
        >
            <Input
                disabled={disabled}
            />
        </Form.Item>
    )
}