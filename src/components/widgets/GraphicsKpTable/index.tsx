import {GraphicKpFilters} from "../GraphickKpFilters";
import {GraphicKpListWidget} from "@/components/widgets/GraphicsKpTable/GraphicKpListWidget.tsx";
import {useEffect} from "react";
import {cityThank} from "@/store/city";
import {useAppDispatch} from "@/hooks/storeHooks.ts";
import {Flex} from "antd";

export const GraphicsKpTableWidget = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(cityThank.getList({}));
    }, []);
    return (
        <Flex vertical={true}
              gap={40}
        >
            <GraphicKpFilters />
            <GraphicKpListWidget />
        </Flex>
    );
};
