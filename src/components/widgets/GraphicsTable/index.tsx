import {Table} from "antd";
import {I_Graphic} from "@/types/graphic.ts";
import {tableConstruct} from "@/helpers/tableConstruct.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/storeHooks.ts";
import {graphicThank} from "@/store/graphic";
import {SubscribeNewTenderForm} from "@/components/widgets/Forms/SubscribeNewTenderForm.tsx";

export const GraphicsTableWidget = () => {
    const dataColumns = tableConstruct<I_Graphic>([
        {
            type: "string",
            common: {
                dataIndex: "WORK_TYPE",
                title: "Вид работ",
            },
        },
        {
            type: "string",
            common: {
                dataIndex: "OBJECTS",
                title: "Объекты",
            },
        },
        {
            type: "date",
            common: {
                dataIndex: "SMR_START",
                title: "Старт СМР по оперативному плану",
            },
        },
        {
            type: "date",
            common: {
                dataIndex: "WINNER_APPROVAL",
                title: "Плановая дата проведения тендера",
            },
        },
        {
            type: "date",
            common: {
                dataIndex: "TENDER_PLANNED",
                title: "Плановая дата утверждения победителя тендера",
            },
        },
        {
            type: "date",
            common: {
                dataIndex: "CONTRACT_SIGNING",
                title: "Плановая дата подписания контракта",
            },
        },
        {
            type: "buttonWithModal",
            common: {
                dataIndex: "ID",
                title: "Действие",
            },
            modalTitle: 'Откликнуться на субподряд',
            modalChild: (_, record)=> <SubscribeNewTenderForm graphic={record}/>,
            label: 'Откликнуться',
        },
    ]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(graphicThank.getList({}));
    }, []);
    const {entity} = useAppSelector((s) => s.graphic);
    return (
        <Table<I_Graphic> dataSource={entity}
                          rowKey={"ID"}
                          columns={dataColumns}
                          pagination={false}
        />
    );
};
