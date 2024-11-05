import {Flex, Form, Input, Typography, Upload, UploadFile} from "antd";
import {I_Graphic} from "@/types/graphic.ts";
import {FC, ReactNode, useState} from "react";
import {OrgSelectUi} from "@/components/ui/OrgSelect";
import {MaskedInput} from "antd-mask-input";
import {Button} from "@/components/ui/Button";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {A_SEND_EVENT, R_GRAPHIC_KP} from "@/store/constants.ts";
import {uploadFormData} from "@/store/instance.ts";
import {ReactComponent as AddFileIcon} from "@/assets/add_file.svg";
import {I_TenderEventForm} from "@/store/graphicKP";
import {I_StatusType} from "@/store/notification";
import {MessageFormUi} from "@/components/ui/MessageForm";

export const SubscribeKPForm: FC<{
    tender_id: I_Graphic['ID']
}> = ({
          tender_id
      }) => {
    const [orgName, setOgrName] = useState<string>(Dictionary.NO_SELECT.ru)
    const [status, setStatus] = useState<I_StatusType>()
    const [files, setFiles] = useState<UploadFile[]>()
    const message = {
        success: 'Вам придет уведомление о статусе субподряда',
        error: 'Данные получены не корректно'
    }

    return (
        <Form
            onFinish={async (values) => {
                await uploadFormData(R_GRAPHIC_KP + A_SEND_EVENT, {
                    ...values,
                    file: values.file[0]?.originFileObj ?? null,
                    org_name: orgName
                }).then(res => {
                    setStatus(res.status)
                })
            }}

            layout="vertical"
            requiredMark={(label: ReactNode, {required}: { required: boolean }) => (
                <Flex gap={4}>
                    <Typography.Text className={'fs--xsm fw--xsm'}>{label}</Typography.Text>
                    {required && (
                        <span style={{color: "red"}}
                              className={'fs--xsm'}
                        >*</span>
                    )}
                </Flex>
            )}
        >
            {/*   graphic_id   */}
            <Form.Item<I_TenderEventForm> required={true}
                                          hidden={true}
                                          initialValue={tender_id}
                                          name={"tender_id"}

            >
                <Input
                    disabled={status === 'success'}
                />
            </Form.Item>
            {/*   Организация   */}
            <OrgSelectUi
                orgName={orgName}
                disabled={status === 'success'}
                setOrgName={setOgrName}
            />


            {/*   Номер   */}
            <Form.Item<I_TenderEventForm> label={'Номер телефона (СМС рассылка)'}
                                          required={true}
                                          name={"phone"}
            >
                <MaskedInput
                    mask={
                        '+7 (000) 000-00-00'
                    }
                    disabled={status === 'success'}
                />
            </Form.Item>
            {/*   Почта   */}
            <Form.Item<I_TenderEventForm> label={'Почта'}
                                          required={true}
                                          name={"email"}
                                          rules={[{required: true, type: 'email', message: 'Не корректная почта'}]}
            >
                <Input type={'mail'}
                       disabled={status === 'success'}
                />
            </Form.Item>

            <Form.Item<I_TenderEventForm>
                name={'file'}
                className={'form-item-def mb-1'}
                required={true}
                rules={[{required: true, message: 'Загрузите файл'}]}
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    if (e) {
                        setFiles(e.fileList)
                        return e.fileList;
                    }
                    return []
                }}
            >
                <Upload
                    disabled={status === 'success'}
                    customRequest={() => {
                    }}
                    fileList={files}
                    listType={'text'}
                    multiple={false}
                    itemRender={(_, file) => {
                        return (
                            <Button label={file?.name ?? ''}
                                    background={'low'}
                                    icon={<AddFileIcon />}
                                    className={'flex-jc--start mt-1'}
                            />
                        )
                    }}
                >
                    <Button label={'Прикрепить файл (не более 100 МБ)'}
                            background={'gray'}
                            icon={<AddFileIcon />}
                    />
                </Upload>
            </Form.Item>
            {(status) && (<MessageFormUi status={status}
                                         label={message[status]}
            />)}
            <Button label={Dictionary.SEND_EVENT.ru}
                    background={'accent'}
                    type={"submit"}
                    disabled={status === 'success'}
            />

        </Form>
    )
}