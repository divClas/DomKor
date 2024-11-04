import {GraphicKpFilters} from "../GraphickKpFilters";
import {GraphicKpListWidget} from "@/components/widgets/GraphicsKpTable/GraphicKpListWidget.tsx";
import { useState} from "react";
import {Flex} from "antd";
import {I_PayloadList} from "@/types/api.ts";
import {I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH} from "@/store/graphicKP";

export const GraphicsKpTableWidget = () => {
    const [payload, setPayload] = useState<I_PayloadList<I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH>>({});

    return (
        <Flex vertical={true}
              gap={40}
        >
            <GraphicKpFilters payload={payload}
                              setPayload={(p)=>{
                                  setPayload(p)
                              }}
            />
            <GraphicKpListWidget onReset={() => {
                setPayload({})
            }}
            />
        </Flex>
    );
};
