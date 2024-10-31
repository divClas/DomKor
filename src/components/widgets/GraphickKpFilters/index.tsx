import { Flex, Popover, Select } from "antd";
import { ReactComponent as ChekedIcon } from "@/assets/chekedIcon.svg";
import { ReactComponent as AroowDown } from "@/assets/aroowDown.svg";

import { useState } from "react";
import { DataPickerContent } from "../DataPickerContent";

interface GraphickKpFiltersProps {
  cities?: string[];
}

export const GraphickKpFilters = ({ cities }: GraphickKpFiltersProps) => {
  const transformCities = (data: any) => {
    const emptyOption = {
      key: "0",
      value: "0",
      label: "Ничего не выбрано",
    };
    const citiesArray = Object.entries(data).map(
      ([_, city]: [string, unknown]) => {
        if (
          typeof city === "object" &&
          city !== null &&
          "ID" in city &&
          "VALUE" in city
        ) {
          return {
            key: (city as { ID: string }).ID,
            value: (city as { ID: string }).ID,
            label: (city as { VALUE: string }).VALUE,
          };
        }
        return { key: "", value: "", label: "" };
      }
    );

    return [emptyOption, ...citiesArray];
  };
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  return (
    <div>
      <Flex gap={"20px"} align="center">
        <Select
          className="custom-select"
          style={{ minWidth: "276px", textAlign: "center" }}
          placeholder="Выбрать город"
          options={transformCities(cities)}
          value={selectedValue}
          onChange={(value) => setSelectedValue(value)}
          optionRender={(option) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {option.label}
              {option.value === selectedValue && <ChekedIcon />}
            </div>
          )}
        />
        <Popover content={<DataPickerContent />} trigger="click">
          <Flex
            justify="space-between"
            style={{ cursor: "pointer", padding: "10px 16px" }}
            align="center"
            gap={8}
          >
            <p className="dateSelected">Дата окончания тендера</p>
            <AroowDown />
          </Flex>
        </Popover>
        <Popover content={<DataPickerContent />} trigger="click">
          <Flex
            style={{ cursor: "pointer", padding: "10px 16px" }}
            justify="space-between"
            align="center"
            gap={8}
          >
            <p className="dateSelected">Дата окончания тендера</p>
            <AroowDown />
          </Flex>
        </Popover>
        <Popover content={<DataPickerContent />} trigger="click">
          <Flex
            style={{ cursor: "pointer", padding: "10px 16px" }}
            justify="space-between"
            align="center"
            gap={8}
          >
            <p className="dateSelected">Дата окончания тендера</p>
            <AroowDown />
          </Flex>
        </Popover>
      </Flex>
    </div>
  );
};
