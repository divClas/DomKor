import {Flex, Form, Typography} from "antd";
import {ReactNode, useState} from "react";
import {Button} from "@/components/ui/Button";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {uploadFormData} from "@/store/instance.ts";
import {I_StatusType} from "@/store/notification";
import {MessageFormUi} from "@/components/ui/MessageForm";
import {FormItems} from "@/components/widgets/Form/FormItems.tsx";
import {I_FormFiled} from "@/types/form.ts";
import {useForm} from "antd/es/form/Form";
import {FormProvider} from "antd/es/form/context";

export function FormWidget(props: {
    statusMessage: {
        success: string
        error: string
    }
    route: string
    fields: I_FormFiled[]
}) {
    const [status, setStatus] = useState<I_StatusType>()
    const methods = useForm()
    return (
        <FormProvider {...methods}>
            <Form
                onFinish={async (values) => {
                    if (values.file) {
                        const file = values.file[0] ?? values.file.file
                        await uploadFormData(props.route, {
                            ...values,
                            file: file.originFileObj,
                        }).then(res => {
                            setStatus(res.status)
                        })
                    } else {
                        await uploadFormData(props.route, {
                            ...values,
                        }).then(res => {
                            setStatus(res.status)
                        })
                    }
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
                <FormItems fields={props.fields}
                           disabled={status === 'success'}
                />
                {(status) && (<MessageFormUi status={status}
                                             label={props.statusMessage[status]}
                />)}
                <Button label={Dictionary.SEND_EVENT.ru}
                        background={'accent'}
                        type={"submit"}
                        disabled={status === 'success'}
                />

            </Form>
        </FormProvider>
    )
}