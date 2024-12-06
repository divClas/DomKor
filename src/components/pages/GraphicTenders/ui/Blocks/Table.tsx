import {I_GraphicTender} from "@/types/graphicTender.ts";
import {NoData} from "@/components/ui/NoData";
import {Table} from "antd";
import {useGraphicTenderPage} from "@/components/pages/GraphicTenders/model/context.ts";
import {getGraphicTenderColumns} from "@/components/pages/GraphicTenders/config/graphicList.tsx";

export const GraphicTenderBL_Table = () => {
    const {graphicsTenderList, status, setPayload} = useGraphicTenderPage()
    const cols = getGraphicTenderColumns()
    return (
        <Table<I_GraphicTender>
            scroll={{x: 'max-content'}}
            locale={{
                emptyText: status !== "pending" && (
                    <NoData
                        onReset={() => {
                            setPayload({});
                        }}
                    />
                ),
            }}
            loading={status === "pending"}
            columns={cols}
            rowKey={"ID"}
            pagination={false}
            dataSource={graphicsTenderList}
        />
    )
}