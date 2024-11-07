import { GraphicKpListWidget } from "@/components/widgets/GraphicsKpTable/GraphicKpListWidget.tsx";
import { useState } from "react";
import { Flex } from "antd";
import { I_PayloadList } from "@/types/api.ts";
import { I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH } from "@/store/graphicKP";
import {GraphicKpFilters} from "@/components/widgets/GraphickKpFilters";
import useSizeHook from "@/hooks/useSizeHook.ts";

export const GraphicsKpTableWidget = () => {
  const [payload, setPayload] = useState<
    I_PayloadList<I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH>
  >({});
    const size = useSizeHook()

  return (
    <>
      <Flex vertical={true} gap={size.width > 1000 ? 40 : 16}>
        <GraphicKpFilters
          payload={payload}
          setPayload={(p) => {
            setPayload(p);
          }}
        />
        <GraphicKpListWidget
          onReset={() => {
            setPayload({});
          }}
        />
      </Flex>
    </>
  );
};
