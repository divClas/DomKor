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

export function FormWidget(props: I_Form) {
    const [status, setStatus] = useState<I_StatusType>()
    const [messages, setMessages] = useState<string[]>([])
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
                        if (res.status === 'error') {
                            console.log(res)
                            setMessages(res.errors.map(e => (e.message)).filter(e => !e.startsWith('[Exception]')))
                        } else {
                            setMessages([props.successMessage])
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                }}
                style={{
                    maxWidth: 490
                }}
                layout={"vertical"}
                requiredMark={(label: ReactNode, {required}: { required: boolean }) => (
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
                />
                {status &&
                    messages.map((m) => (
                        <MessageFormUi status={status}
                                       message={m}
                        />
                    ))
                }
                <Flex style={{width: 'fit-content'}}>
                    {status !== 'success' && (
                        <Button label={Dictionary.SEND_EVENT.ru}
                                background={'accent'}
                                type={"submit"}
                        />)}
                    {status === 'success' && (
                        <Button
                            label={Dictionary.OK.ru}
                            background={'accent'}
                            type={"submit"}
                        />)}
                </Flex>
            </Form>
        </FormProvider>
    )
}