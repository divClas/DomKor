import { FC, useState } from "react";
import { Flex, Input, Radio } from "antd";
import { ReactComponent as SearchIcon } from "@/assets/mobileSearch.svg";
import { I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH } from "@/store/graphic";
import { I_PayloadList } from "@/types/api.ts";
import { Dictionary } from "@/contexts/Dictionary.ts";
import { graphicDateSearch } from "@/contexts/search.ts";
import { Button } from "@/components/ui/Button";
import { ReactComponent as ClearInputIcon } from "@/assets/clearInputIcon.svg";
export const SearchForm: FC<{
  payload: I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>;
  setPayload: (
    payload: I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>
  ) => void;
}> = ({ payload, setPayload }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchKey, setSearchKey] = useState<keyof I_GRAPHIC_SEARCH | "ALL">(
    "ALL"
  );
  const graphicDateList: typeof graphicDateSearch = [
    {
      radioLabel: "Поиск по всем параметрам",
      label: "Все",
      filterKey: "ALL",
    },
    ...graphicDateSearch,
  ];
  return (
    <Flex gap={12} vertical={true}>
      <Flex className={"ant-form-item w-100 pd-xsm"} align="center">
        <Input
          prefix={<SearchIcon />}
          value={searchValue}
          placeholder={Dictionary.SEARCH.ru}
          onChange={(v) => setSearchValue(v.target.value)}
          allowClear={{
            clearIcon: <ClearInputIcon />,
          }}
        />
      </Flex>
      <Radio.Group
        value={searchKey}
        onChange={(val) => setSearchKey(val.target.value)}
      >
        <Flex vertical={true} gap={5}>
          {graphicDateList.map((gdf) => (
            <Radio value={gdf.filterKey} key={gdf.filterKey}>
              {gdf.radioLabel}
            </Radio>
          ))}
        </Flex>
      </Radio.Group>
      <Button
        label={"Найти"}
        background={"accent"}
        onClick={() => {
          setPayload({
            ...payload,
            filter: {
              ...payload.filter,
            },
            search:
              searchKey === "ALL"
                ? {
                    WORK_TYPE: searchValue,
                    OBJECTS: searchValue,
                  }
                : {
                    [searchKey]: searchValue,
                  },
            search_type: searchKey === "ALL" ? "OR" : undefined,
          });
        }}
      />
    </Flex>
  );
};
