import {FC, useState} from "react";
import {I_FormFiledProps} from "@/types/form.ts";
import {Flex, Form} from "antd";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

export const FieldCheckboxUi: FC<I_FormFiledProps> = ({f, disabled, error}) => {
    const [val, setVal] = useState<boolean>()
    const formInstance = useFormInstance()

    return (
        <Form.Item
            name={String(f.name)}
            initialValue={f.defaultValue}
            className={`form-item-def pd--0 ${error ? 'status--error' : ''}`}
        >
            <Flex align={'center'}
                  gap={10}
            >
                <input
                    type={'checkbox'}
                    required={f.required}
                    className={'fs--md'}
                    onChange={(s) => {
                        setVal(s.target.checked)
                    }}
                    checked={val}
                    disabled={disabled}
                />
                <label
                    dangerouslySetInnerHTML={{__html: f.label}}
                    htmlFor={f.name}
                    className={'cursor'}
                    onClick={() => {
                        setVal(!val)
                        formInstance.setFieldValue(f.name, (!val) ? 'on' : undefined)
                    }}
                />
            </Flex>
        </Form.Item>
    )
}