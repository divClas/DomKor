import {FC, useState} from "react";
import {Form, Upload} from "antd";
import {Button} from "@/components/ui/Button";
import {ReactComponent as AddFileIcon} from "@/assets/add_file.svg";
import {I_FormFiledProps} from "@/types/form.ts";

export const FieldUploadUi: FC<I_FormFiledProps> = ({f, disabled}) => {
    const [files, setFiles] = useState<any[]>([])
    return (
        <Form.Item
            name={String(f.name)}
            className={'form-item-def mb-1'}
            required={f.required}
            getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                    return e;
                }
                setFiles(e.fileList)
                return e && e.fileList;
            }
            }
        >
            <Upload
                disabled={disabled}
                customRequest={() => {
                }}
                fileList={files}
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