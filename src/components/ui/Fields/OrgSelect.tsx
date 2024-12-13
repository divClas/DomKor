import { Flex, Form, Typography } from "antd";
import { daDataFetch } from "@/store/instance.ts";
import { Button } from "@/components/ui/Button";
import { FC, useState } from "react";
import "./style.scss";
import { I_FormFiledProps } from "@/types/form.ts";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import {InputUi} from "@/components/ui/Input";

export const FieldOrgSelectUi: FC<I_FormFiledProps> = ({f, disabled, error}) => {
    const orgNameInit = 'Не выбрано'

    const [orgName, setOrgName] = useState<string>(orgNameInit)
    const [orgInn, setOrgInn] = useState<string>('')
    const useFormI = useFormInstance()
    const [orgListSearchDaData, setOrgListSearchDaData] = useState<{
        inn: string,
        name: string
    }[]>([])
    return (
        <>
            <Form.Item
                required={true}
                name={String(f.name)}
                className={error ? 'status--error' : ''}
            >
                <Flex

                    style={{
                        position: 'relative'
                    }}
                >
                    <InputUi
                        val={orgInn}
                        allowClear={true}
                        type={'default'}
                        required={f.required}
                        label={f.label}
                        onClear={() => {
                            setOrgInn('')
                            setOrgName(orgNameInit)
                            useFormI.setFieldValue('org_name', undefined)
                            useFormI.setFieldValue(f.name, undefined)
                            setOrgListSearchDaData([])
                        }}
                        disabled={disabled}
                        onChange={(value) => {
                            setOrgInn(value)
                            if(!!value) {
                                daDataFetch(value).then(res => {
                                    setOrgListSearchDaData(res.data.suggestions.map(s => ({
                                        inn: s.data.inn,
                                        name: s.value
                                    })))
                                })
                            }
                        }}
                        className={'fs--md'}
                    />

                    <Flex className={'org-select bg bg--white'}
                          vertical={true}
                          justify="flex-start"
                    >
                        {orgListSearchDaData.map(e => (
                            <Button label={e.name + e.inn}
                                    background={'transparent'}
                                    key={e.inn}
                                    className={"ant-flex-justify-flex-start custom-btn-on-select"}
                                    onClick={() => {
                                        setOrgName(e.name)
                                        useFormI.setFieldValue('org_name', e.name)
                                        useFormI.setFieldValue(f.name, e.inn)
                                        setOrgInn(e.inn)
                                        setOrgListSearchDaData([])
                                    }}
                            />
                        ))}
                    </Flex>
                </Flex>
            </Form.Item>
            <Form.Item name={'org_name'}
                       hidden={true}
            >
                <input value={orgName} />
            </Form.Item>
            <Flex vertical={true}
                  gap={4}
                  className={'ant-form-item bg bg--transparent pd--0'}
            >
                <Typography.Text className={"fs--xsm fw--xsm color--gray"}>
                    Наименование ООО подставится автоматически:
                </Typography.Text>
                <Typography.Text className={`fs--md fw--sm ${disabled ? 'disabled' : ''}`}>
                    {orgName}
                </Typography.Text>
            </Flex>
        </>
    )
}