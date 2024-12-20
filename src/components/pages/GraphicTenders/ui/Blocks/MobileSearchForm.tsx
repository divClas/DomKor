import {useGraphicTenderPage} from "../../model/context"
import {useState} from "react";
import {Flex, Input, Radio} from "antd";
import {ReactComponent as SearchIcon} from "@/assets/mobileSearch.svg";
import {I_GRAPHIC_SEARCH} from "@/store/graphic";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {graphicDateSearch} from "@/contexts/search.ts";
import {Button} from "@/components/ui/Button";
import {ReactComponent as ClearInputIcon} from "@/assets/clearInputIcon.svg";
import {usePopover} from "@/components/ui/Popover/model/popover.tsx";
import {SelectUi} from "@/components/ui/Select";
import {useAppSelector} from "@/hooks/storeHooks.ts";
import {I_City} from "@/types/city.ts";

export const MobileSearchForm = () => {
    const {payload, setPayload} = useGraphicTenderPage()
    const {setIsOpen} = usePopover()
    const [searchKey, setSearchKey] = useState<keyof I_GRAPHIC_SEARCH | "ALL">(
        payload?.search ? (payload.search.OBJECTS ? 'OBJECTS' : (payload.search.NAME ? 'NAME' : (payload.search.WORK_TYPE ? 'WORK_TYPE' : 'ALL'))) : 'ALL'
    );
    const [searchValue, setSearchValue] = useState<string>(payload?.search ? payload.search[searchKey === 'ALL' ? 'WORK_TYPE' : searchKey] ?? '' : '');
    const [searchCity, setSearchCity] = useState<string>();
    const graphicDateList: typeof graphicDateSearch = [
        {
            radioLabel: "Поиск по всем параметрам",
            label: "Все",
            filterKey: "ALL",
        },
        ...graphicDateSearch,
    ];
    const searchHandler = () => {
        setPayload({
            search: (
                searchKey === "ALL"
                    ? {
                        CITY: searchCity,
                        WORK_TYPE: searchValue,
                        OBJECTS: searchValue,
                    }
                    : {
                        CITY: searchCity,
                        [searchKey]: searchValue,
                    }
            ),
            search_type: searchKey === "ALL" ? "OR" : undefined,
        });
        setIsOpen(false)
    }
    const {entity: cityList} = useAppSelector((s) => s.cityTender);
    const optionsCityList: I_City[] = [
        {
            VALUE: "Ничего не выбрано",
            ID: "",
        },
        ...cityList,
    ];
    return (

        <Flex gap={12}
              vertical={true}>
            <SelectUi
                onChange={setSearchCity}
                value={searchCity}
                placeholder={'Выбор города'}
                options={optionsCityList.map((c) => ({
                    value: c.ID,
                    label: c.VALUE,
                }))}
            />
            <Flex className={"ant-form-item w-100 pd-xsm"}
                  align="center">
                <Input
                    prefix={<SearchIcon/>}
                    value={searchValue}
                    placeholder={Dictionary.SEARCH.ru}
                    className={'fs--lgg'}
                    onChange={(v) => setSearchValue(v.target.value)}
                    allowClear={{
                        clearIcon: <ClearInputIcon/>,
                    }}
                />
            </Flex>
            <Radio.Group
                value={searchKey}
                onChange={(val) => setSearchKey(val.target.value)}
            >
                <Flex vertical={true}
                      gap={8}>
                    {graphicDateList.map((gdf) => (
                        <Radio value={gdf.filterKey}
                               key={gdf.filterKey}>
                            {gdf.radioLabel}
                        </Radio>
                    ))}
                </Flex>
            </Radio.Group>
            <Button
                label={"Найти"}
                background={"accent"}
                onClick={searchHandler}
            />
        </Flex>
    )
}