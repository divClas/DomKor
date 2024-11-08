import {FC} from "react";
import {I_FormFiledProps} from "@/types/form.ts";
import {Form} from "antd";
import {InputUi} from "@/components/ui/Input";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

export const FieldEmailUi: FC<I_FormFiledProps> = ({f, disabled, error}) => {
    const formInstance = useFormInstance()
    return (
        <Form.Item
            name={String(f.name)}
            initialValue={f.defaultValue}
            className={error ? 'status--error' : ''}
        >
            <InputUi
                required={f.required}
                htmlType={'mail'}
                type={'default'}
                allowClear={true}
                onClear={()=>{
                    formInstance.setFieldValue(f.name, undefined)
                }}
                className={'fs--md'}
                label={f.label }
                onChange={() => {
                }}
                disabled={disabled}
            />
        </Form.Item>
    )
}