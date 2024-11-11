import {Flex} from "antd";
import {FC, useState} from "react";
import {I_DateFilter} from "@/types/api.ts";
import {Button} from "@/components/ui/Button";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {usePopover} from "@/components/ui/Popover/model/popover.tsx";
import {DataPickerContentBL_Tabs} from "@/components/widgets/DataPickerContent/Blocks/Tabs.tsx";

export const DataPickerContent: FC<{
  value: I_DateFilter | undefined;
  onChange: (val: I_DateFilter) => void;
}> = ({value, onChange}) => {
  const initDate = {
    FROM: "",
    TO: "",
  };
  const {setIsOpen} = usePopover();

  const [date, setDate] = useState<I_DateFilter>(value ?? initDate);
  return (
    <div>
      <DataPickerContentBL_Tabs date={date} setDate={setDate}/>
      <Flex align="center"
            gap={12}
            style={{paddingTop: "24px"}}
      >
        <Flex>
          <Button
            background={"accent"}
            onClick={() => {
              onChange(date);
              setIsOpen(false)
            }}
            label={Dictionary.APPLY.ru}
          />
        </Flex>
        <Flex>
          <Button
            className="color--black"
            onClick={() => {
              onChange(initDate);
              setDate(initDate);
              setIsOpen(false)
            }}
            label={Dictionary.CANCEL.ru}
            background={"transparent"}
          />
        </Flex>
      </Flex>
    </div>
  );
};
