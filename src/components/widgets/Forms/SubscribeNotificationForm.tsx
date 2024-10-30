import {Flex, Form, FormProps, Input, Typography} from "antd";
import { I_GraphicEventForm} from "@/types/graphic.ts";
import {ReactNode} from "react";
import {OrgSelectUi} from "@/components/ui/OrgSelect";
import {MaskedInput} from "antd-mask-input";
import {Button} from "@/components/ui/Button";
import {useAppDispatch} from "@/hooks/storeHooks.ts";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {graphicThank} from "@/store/graphic";

export const SubscribeNotificationForm = () => {
    const dispatch = useAppDispatch()

    const onFinish: FormProps<I_GraphicEventForm>['onFinish'] = (values) => {
        dispatch(graphicThank.sendEvent(values))
    };
    return (
        <Form
            onFinish={onFinish}
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
            {/*   Тип формы   */}
            <Form.Item<I_GraphicEventForm> required={true}
                                           hidden={true}
                                           initialValue={"SUBSCRIBE_NOTIFICATIONS"}
                                           name={"form_type"}
            >
                <Input />
            </Form.Item>
            {/*   Организация   */}
            <OrgSelectUi />


            {/*   Номер   */}
            <Form.Item<I_GraphicEventForm> label={'Номер телефона (СМС рассылка)'}
                                           required={true}
                                           name={"phone"}
            >
                <MaskedInput
                    mask={
                        '+7 (000) 000-00-00'
                    }
                />
            </Form.Item>
            {/*   Почта   */}
            <Form.Item<I_GraphicEventForm> label={'Почта'}
                                           required={true}
                                           name={"email"}
                                           rules={[{required: true, type: 'email', message: 'Не корректная почта'}]}
            >
                <Input type={'mail'} />
            </Form.Item>
            <Button label={Dictionary.SEND_EVENT.ru}
                    background={'accent'}
                    type={"submit"}
            />
        </Form>
    )
}