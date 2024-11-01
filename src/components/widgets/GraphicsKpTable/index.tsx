import {GraphicKpFilters} from "../GraphickKpFilters";
import {GraphicKpListWidget} from "@/components/widgets/GraphicsKpTable/GraphicKpListWidget.tsx";
import {useEffect, useState} from "react";
import {cityThank} from "@/store/city";
import {useAppDispatch} from "@/hooks/storeHooks.ts";
import {Flex} from "antd";
import {I_PayloadList} from "@/types/api.ts";
import {I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH} from "@/store/graphicKP";

export const GraphicsKpTableWidget = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(cityThank.getList({}));
    }, []);
    const [payload, setPayload] = useState<I_PayloadList<I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH>>({});

    return (
        <Flex vertical={true}
              gap={40}
        >
            <GraphicKpFilters payload={payload}
                              setPayload={setPayload}
            />
            <GraphicKpListWidget onReset={() => {
                setPayload({})
            }}
            />
        </Flex>
    );
};
