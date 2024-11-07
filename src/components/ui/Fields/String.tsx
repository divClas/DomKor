import {FC} from "react";
import {I_FormFiledProps} from "@/types/form.ts";
import {Form} from "antd";
import {InputUi} from "@/components/ui/Input";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

export const FieldStringUi: FC<I_FormFiledProps> = ({f, disabled, error}) => {
    const formInstance = useFormInstance()

    return (
        <Form.Item
            required={f.required}
            name={String(f.name)}
            initialValue={f.defaultValue}
            className={error ? 'status--error' : ''}
        >
            <InputUi
                required={f.required}
                type={'default'}
                allowClear={true}
                label={f.label}
                onClose={()=>{
                    formInstance.setFieldValue(f.name, undefined)
                }}
                onChange={() => {
                }}
                disabled={disabled}
            />
        </Form.Item>
    )
}