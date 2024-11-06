import {Flex, Form, Input, Typography} from "antd";
import {daDataFetch} from "@/store/instance.ts";
import {Button} from "@/components/ui/Button";
import {FC, useState} from "react";
import './style.scss'
import {I_FormFiledProps} from "@/types/form.ts";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

export const FieldOrgSelectUi: FC<I_FormFiledProps> = ({f, disabled}) => {
    const [orgName, setOrgName] = useState<string>('Не выбрано')
    const [orgInn, setOrgInn] = useState<string>('')
    const useFormI = useFormInstance()
    const [orgListSearchDaData, setOrgListSearchDaData] = useState<{
        inn: string,
        name: string
    }[]>([])
    return (
        <>
            <Form.Item label={f.label}
                       required={true}
                       name={String(f.name)}
            >
                <Flex

                    style={{
                        position: 'relative'
                    }}
                >
                    <Input
                        value={orgInn}
                        disabled={disabled}
                        onChange={(e) => {
                            setOrgInn(e.target.value)
                            daDataFetch(e.target.value).then(res => {
                                setOrgListSearchDaData(res.data.suggestions.map(s => ({
                                    inn: s.data.inn,
                                    name: s.value
                                })))
                            })
                        }}
                    />

                    <Flex className={'pd-sm org-select bg--white'}
                          vertical={true}
                          gap={4}
                    >
                        {orgListSearchDaData.map(e => (
                            <Button label={e.name + e.inn}
                                    background={'accent'}
                                    key={e.inn}
                                    onClick={() => {
                                        setOrgName(e.name)
                                        useFormI.setFieldValue('org_name', e.name)
                                        setOrgInn(e.inn)
                                        setOrgListSearchDaData([])
                                    }}
                            />
                        ))}
                    </Flex>
                </Flex>
            </Form.Item>
            <Form.Item name={'org_name'} hidden={true}>
                <input value={orgName} />
            </Form.Item>
            <Flex vertical={true}
                  gap={4}
                  className={'ant-form-item bg--transparent pd--0'}
            >
                <Typography.Text className={'fs--xsm fw--xsm'}>
                    Наименование ООО подставится автоматически:
                </Typography.Text>
                <Typography.Text className={`fs--md fw--sm ${disabled ? 'disabled' : ''}`}>
                    {orgName}
                </Typography.Text>
            </Flex>
        </>
    )
}