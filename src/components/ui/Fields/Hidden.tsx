import {FC} from "react";
import {I_FormFiledProps} from "@/types/form.ts";
import {Form, Input} from "antd";

export const FieldHiddenUi:FC<I_FormFiledProps> = ({f, disabled}) => {
    return (
        <Form.Item
            required={f.required}
            hidden={true}
            initialValue={f.defaultValue}
            name={String(f.name)}
        >
            <Input
                disabled={disabled}
            />
        </Form.Item>
    )
}