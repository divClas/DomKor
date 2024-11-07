import {FC, useState} from "react";
import {Form, Upload} from "antd";
import {Button} from "@/components/ui/Button";
import {ReactComponent as AddFileIcon} from "@/assets/add_file.svg";
import {I_FormFiledProps} from "@/types/form.ts";

export const FieldUploadUi: FC<I_FormFiledProps> = ({f, disabled, error}) => {
    const [files, setFiles] = useState<any[]>([])
    return (
        <Form.Item
            name={String(f.name)}
            className={`form-item-def pd--0 mb-1 w-100 ${error ? 'status--error' : ''}`}
            required={f.required}
            getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                    return e;
                }
                setFiles(e.fileList.slice(-1))
                return e && e.fileList;
            }
            }
        >
            <Upload
                disabled={disabled}
                customRequest={() => {
                }}
                fileList={[]}
                multiple={false}
                itemRender={(_, file) => {
                    return (
                        <Button label={file?.name ?? 'файл'}
                                background={'low'}
                                icon={<AddFileIcon />}
                                className={'flex-jc--start mt-1 w-100'}
                        />
                    )
                }}
            >
                <Button label={(files.slice(-1).length > 0 && files.slice(-1)[0] ? files.slice(-1)[0].name : f.label)}
                        background={'gray'}
                        icon={<AddFileIcon />}
                        className={'w-100 flex-jc--start'}
                />
            </Upload>
        </Form.Item>
    )
}