import {Flex, Form, Input, Typography} from "antd";
import {I_Graphic, I_GraphicEventForm} from "@/types/graphic.ts";
import {FC, ReactNode, useState} from "react";
import {OrgSelectUi} from "@/components/ui/OrgSelect";
import {MaskedInput} from "antd-mask-input";
import {Button} from "@/components/ui/Button";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {A_SEND_EVENT, R_GRAPHIC} from "@/store/constants.ts";
import {uploadFormData} from "@/store/instance.ts";
import {I_StatusType} from "@/store/notification";
import {MessageFormUi} from "@/components/ui/MessageForm";

export const SubscribeNewTenderForm: FC<{
    graphic_id: I_Graphic['ID']
}> = ({
                                               graphic_id
      }) => {

    const [orgName, setOgrName] = useState<string>(Dictionary.NO_SELECT.ru)
    const [status, setStatus] = useState<I_StatusType>()
    const message = {
        success: 'Теперь вам будут приходить уведомления о новых тендерах',
        error: 'Данные получены не корректно'
    }
    return (
        <Form
            onFinish={async (values) => {
                await uploadFormData(R_GRAPHIC + A_SEND_EVENT, {
                    ...values,
                    org_name: orgName
                }).then(res => {
                    setStatus(res.status)
                })
            }}
            layout="vertical"
            requiredMark={(label: ReactNode, {required}: { required: boolean }) => (
                <Flex gap={4}>
                    <Typography.Text className={'fs--xsm fw--xsm'}>{label}</Typography.Text>
                    {required && <span style={{color: "red"}}
																			 className={'fs--xsm'}
										>*</span>}
                </Flex>
            )}
        >
            {/*   graphic_id   */}
            <Form.Item<I_GraphicEventForm> required={true}
                                           hidden={true}
                                           initialValue={graphic_id}
                                           name={"graphic_id"}
            >
                <Input                     disabled={status === 'success'}
                />
            </Form.Item>
            {/*   Тип формы   */}
            <Form.Item<I_GraphicEventForm> required={true}
                                           hidden={true}
                                           initialValue={"REPLY"}
                                           name={"form_type"}
            >
                <Input                     disabled={status === 'success'}
                />
            </Form.Item>
            {/*   Организация   */}
            <OrgSelectUi
                orgName={orgName}
                setOrgName={setOgrName}                    disabled={status === 'success'}

            />


            {/*   Номер   */}
            <Form.Item<I_GraphicEventForm> label={'Номер телефона (СМС рассылка)'}
                                           required={true}
                                           name={"phone"}
            >
                <MaskedInput
                    mask={
                        '+7 (000) 000-00-00'
                    }                    disabled={status === 'success'}

                />
            </Form.Item>
            {/*   Почта   */}
            <Form.Item<I_GraphicEventForm> label={'Почта'}
                                           required={true}
                                           name={"email"}
                                           rules={[{required: true, type: 'email', message: 'Не корректная почта'}]}
            >
                <Input type={'mail'}                     disabled={status === 'success'}
                />
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