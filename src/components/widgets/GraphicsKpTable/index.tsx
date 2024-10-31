import {Table} from "antd";
import {tableConstruct} from "@/helpers/tableConstruct.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/storeHooks.ts";
import {I_GraphicKP} from "@/types/graphicKP.ts";
import {graphicKPThank} from "@/store/graphicKP";
import {cityThank} from "@/store/city";


export const GraphicsKpTableWidget = () => {
    const dataColumns = tableConstruct<I_GraphicKP>([
        {
            type: "string",
            common: {
                dataIndex: "NAME",
                title: "NAME"
            }
        },
        {
            type: "string",
            common: {
                dataIndex: "CITY",
                title: "CITY"
            }
        },
        {
            type: "string",
            common: {
                dataIndex: "ADDRESS",
                title: "ADDRESS"
            },
        },
        {
            type: "string",
            common: {
                dataIndex: "PERSON",
                title: "PERSON"
            }
        },
        {
            type: "date",
            common: {
                dataIndex: "DATE_CREATE",
                title: "DATE_CREATE"
            }
        },
        {
            type: "string",
            common: {
                dataIndex: "LEGAL_ENTITY",
                title: "LEGAL_ENTITY"
            }
        },
        {
            type: "date",
            common: {
                dataIndex: "SUBMISSION_DEADLINE",
                title: "SUBMISSION_DEADLINE"
            },
        },
        {
            type: "date",
            common: {
                dataIndex: "TENDER_END_DATE",
                title: "TENDER_END_DATE"
            },
        },
    ])
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(graphicKPThank.getList({}))
        dispatch(cityThank.getList({}))
    }, [])
    const {entity: graphicKpList} = useAppSelector(s => s.graphicKP)
    const {entity: cityList} = useAppSelector(s => s.city)
    console.log(cityList)
    return (
        <Table<I_GraphicKP>
            dataSource={graphicKpList}
            rowKey={"ID"}
            columns={dataColumns}
            pagination={false}
        />
    )
}