import {Flex, Form, FormProps, Input, Typography} from "antd";
import {I_Graphic, I_GraphicEventForm} from "@/types/graphic.ts";
import {FC, ReactNode} from "react";
import {OrgSelectUi} from "@/components/ui/OrgSelect";
import {MaskedInput} from "antd-mask-input";
import {Button} from "@/components/ui/Button";
import {useAppDispatch} from "@/hooks/storeHooks.ts";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {graphicThank} from "@/store/graphic";
import {fetchData} from "@/store/mainThank.ts";
import {A_SEND_EVENT, R_GRAPHIC} from "@/store/constants.ts";

export const SubscribeNewTenderForm: FC<{
    graphic_id: I_Graphic['ID']
}> = ({
          graphic_id
      }) => {
    const dispatch = useAppDispatch()

    const onFinish: FormProps<I_GraphicEventForm>['onFinish'] = (values) => {
        const formData = new FormData(values)
        fetchData(R_GRAPHIC + A_SEND_EVENT, {
            method: "POST",
        }).then(res=>{
            console.log(res)
        })
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
                                           initialValue={graphic_id}
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
            <Button label={Dictionary.SEND_EVENT.ru}
                    background={'accent'}
                    type={"submit"}
            />
        </Form>
    )
}