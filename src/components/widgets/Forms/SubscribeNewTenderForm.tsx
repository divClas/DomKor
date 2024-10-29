import {Flex, Form, FormProps, Input, Typography} from "antd";
import {I_Graphic, I_GraphicEventForm} from "@/types/graphic.ts";
import {FC, ReactNode} from "react";
import {OrgSelectUi} from "@/components/ui/OrgSelect";
import {MaskedInput} from "antd-mask-input";
import {Button} from "@/components/ui/Button";
import {useAppDispatch} from "@/hooks/storeHooks.ts";

export const SubscribeNewTenderForm: FC<{
    graphic: I_Graphic
}> = ({
          graphic
      }) => {
    const dispatch = useAppDispatch()

    const onFinish: FormProps<I_Graphic>['onFinish'] = (values) => {

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
            {/*   graphic_id   */}
            <Form.Item<I_GraphicEventForm> required={true}
                                           hidden={true}
                                           initialValue={graphic.ID}
                                           name={"graphic_id"}
            >
                <Input />
            </Form.Item>
            {/*   Тип формы   */}
            <Form.Item<I_GraphicEventForm> required={true}
                                           hidden={true}
                                           initialValue={"REPLY"}
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
            <Button label={'Откликнуться'}
                    background={'accent'}
                    type={"submit"}
            />
        </Form>
    )
}