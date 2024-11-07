import {Flex, Form, Typography} from "antd";
import {ReactNode, useState} from "react";
import {Button} from "@/components/ui/Button";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {uploadFormData} from "@/store/instance.ts";
import {I_StatusType} from "@/store/notification";
import {MessageFormUi} from "@/components/ui/MessageForm";
import {FormItems} from "@/components/widgets/Form/FormItems.tsx";
import {I_Form} from "@/types/form.ts";
import {useForm} from "antd/es/form/Form";
import {FormProvider} from "antd/es/form/context";
import {usePopover} from "@/contexts/popover.tsx";

export function FormWidget(props: I_Form) {
    const [status, setStatus] = useState<I_StatusType>()
    const [messages, setMessages] = useState<string[]>([])
    const [fieldsError, setFieldsError] = useState<string[]>([])
    const {setIsOpen} = usePopover();

    const methods = useForm()
    return (
        <FormProvider {...methods}>
            <Form
                onFinish={async (values) => {
                    const valuesPayload = values.file ? {
                        ...values,
                        file: (values.file[0] ?? values.file.file).originFileObj,
                    } : values
                    setMessages([])

                    await uploadFormData<{
                        message?: string
                    }>(props.route, valuesPayload).then((res) => {
                        setStatus(res.status)
                        setFieldsError([])
                        if (res.status === 'error') {
                            setMessages(res.errors.filter(e => !e.message.startsWith('[Exception]')).map(e => {
                                const [message, json] = e.message.split('[')
                                if (json) {
                                    const errors = JSON.parse('[' + json)
                                    setFieldsError(errors)
                                }
                                return message
                            }))
                        } else {
                            setMessages([props.successMessage])
                        }
                    }).catch(e => {
                        console.error(e)
                    })
                }}
                className={'form-widget'}
                layout={"vertical"}
                requiredMark={(label: ReactNode, {required}) => (
                    <Flex gap={4}>
                        <Typography.Text className={'fs--xsm fw--xsm ln-sm'}>{label}</Typography.Text>
                        {required && (
                            <span style={{color: "red"}}
                                  className={'fs--xsm fw--xsm ln-sm'}
                            >*</span>
                        )}
                    </Flex>
                )}
            >
                <FormItems fields={props.fields}
                           disabled={status === 'success'}
                           fieldsError={fieldsError}
                />
                {status &&
                    messages.map((m, index) => {
                        return (
                            <MessageFormUi
                                key={index}
                                status={status}
                                message={m}
                            />
                        )
                    })
                }
                <Flex style={{width: 'fit-content'}}>
                    {status !== 'success' && (
                        <Button label={props.btnLabel ?? Dictionary.SEND_EVENT.ru}
                                background={'accent'}
                                type={"submit"}
                                className={'pd-8 fs--md'}
                        />)}
                    {status === 'success' && (
                        <Button
                            label={Dictionary.OK.ru}
                            background={'accent'}
                            className={'pd-8 fs--md'}
                            onClick={() => {
                                setIsOpen(false)
                            }}
                        />)}
                </Flex>
            </Form>
        </FormProvider>
    )
}