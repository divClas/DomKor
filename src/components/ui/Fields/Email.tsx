import {FC} from "react";
import { I_FormFiledProps} from "@/types/form.ts";
import {Form, Input} from "antd";

export const FieldEmailUi:FC<I_FormFiledProps> = ({f, disabled}) => {
    return (
        <Form.Item
            label={f.label}
            required={f.required}
            name={String(f.name)}
            initialValue={f.defaultValue}
            rules={[{
                required: true,
                type: 'email',
                message: 'Не корректная почта'
            }]}
        >
            <Input type={'mail'}
                   disabled={disabled}
            />
        </Form.Item>
    )
}