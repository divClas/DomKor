import {Flex, Form, Input, Typography} from "antd";
import {I_GraphicEventForm} from "@/types/graphic.ts";
import {daDataFetch} from "@/store/instance.ts";
import {Button} from "@/components/ui/Button";
import {FC, useState} from "react";
import './style.scss'

export const OrgSelectUi: FC<{
    orgName: string
    setOrgName: (val: string) => void
    disabled?: boolean
}> = ({
          setOrgName,
          orgName,
                                    disabled
      }) => {
    const [orgInn, setOgrInn] = useState<string>('')

    const [orgsSearchDaData, setOrgsSearchDaData] = useState<{
        inn: string,
        name: string
    }[]>([])

    return (
        <>
            <Form.Item<I_GraphicEventForm> label={'ИНН Организации'}
                                           required={true}
                                           name={"inn"}
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
                            setOgrInn(e.target.value)
                            daDataFetch(e.target.value).then(res => {
                                setOrgsSearchDaData(res.data.suggestions.map(s => ({
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
                        {orgsSearchDaData.map(e => (
                            <Button label={e.name + e.inn}
                                    background={'accent'}
                                    key={e.inn}
                                    onClick={() => {
                                        setOrgName(e.name)
                                        setOgrInn(e.inn)
                                        setOrgsSearchDaData([])
                                    }}
                            />
                        ))}
                    </Flex>
                </Flex>
            </Form.Item>
            <Flex vertical={true}
                  gap={4}
                  className={'ant-form-item'}
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