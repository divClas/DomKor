import {FC} from "react";
import {Form, Upload} from "antd";
import {Button} from "@/components/ui/Button";
import {ReactComponent as AddFileIcon} from "@/assets/add_file.svg";
import {I_FormFiledProps} from "@/types/form.ts";

export const FieldUploadUi:FC<I_FormFiledProps> = ({f, disabled}) => {
    return (

        <Form.Item
            name={String(f.name)}
            className={'form-item-def mb-1'}
            required={f.required}
            rules={[{required: true, message: 'Загрузите файл'}]}
        >
            <Upload
                disabled={disabled}
                customRequest={() => {
                }}
                multiple={false}
                itemRender={(_, file) => {
                    return (
                        <Button label={file?.name ?? 'файл'}
                                background={'low'}
                                icon={<AddFileIcon />}
                                className={'flex-jc--start mt-1'}
                        />
                    )
                }}
            >
                <Button label={f.label}
                        background={'gray'}
                        icon={<AddFileIcon />}
                />
            </Upload>
        </Form.Item>
    )
}