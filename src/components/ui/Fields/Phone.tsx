import {FC} from "react";
import {I_FormFiledProps} from "@/types/form.ts";
import {Form} from "antd";
import {InputUi} from "@/components/ui/Input";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

export const FieldPhoneUi: FC<I_FormFiledProps> = ({f, disabled, error}) => {
    const formInstance = useFormInstance()

    return (
        <Form.Item
            name={String(f.name)}
            initialValue={f.defaultValue}
            className={error ? 'status--error' : ''}
        >
            <InputUi
                required={f.required}
                htmlType={'phone'}
                type={'masked'}
                allowClear={true}
                label={f.label }
                onClose={()=>{
                    formInstance.setFieldValue(f.name, undefined)
                }}
                onChange={() => {
                }}
                mask={
                    '00 000 00 00'
                }
                disabled={disabled}
                className={'phone-input'}
            />
        </Form.Item>
    )
}