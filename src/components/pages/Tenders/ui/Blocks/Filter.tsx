import {Flex} from "antd";
import {ReactComponent as ArrowDown} from "@/assets/black-arrow-down.svg";
import {FC} from "react";
import {
    I_GRAPHIC_KP_FILTER,
    I_GRAPHIC_KP_SEARCH,
} from "@/store/graphicKP";
import {useAppSelector} from "@/hooks/storeHooks.ts";
import {DataPickerContent} from "@/components/widgets/DataPickerContent";
import {I_City} from "@/types/city.ts";
import {PopoverWidget} from "@/components/ui/Popover";
import {Dictionary} from "@/contexts/Dictionary";
import {ReactComponent as ReportIcon} from "@/assets/report.svg";
import {ReactComponent as CalendarIcon} from "@/assets/mobileCalendar.svg";
import {FormSubscribeNotification} from "@/contexts/forms";
import {SelectUi} from "@/components/ui/Select";
import {DatePickerFilterMobile} from "@/components/widgets/GraphicsKpTable/Modile/DatePicker.tsx";
import {tenderDateFilters} from "@/contexts/filters.ts";
import useSizeHook from "@/hooks/useSizeHook.ts";
import {CountUi} from "@/components/ui/Count";
import {ButtonFilter} from "@/components/ui/ButtonFilter";
import {useTenderPage} from "@/components/pages/Tenders/model/context.ts";
import {FormWidget} from "@/components/widgets/Form";
import {C_PAD} from "@/contexts/theme.ts";

export const TenderBL_Filter: FC = () => {
    const {setPayload, payload} = useTenderPage()
    const {entity: graphicKpList} = useAppSelector((s) => s.graphicKP);
    const {entity: cityList} = useAppSelector((s) => s.city);
    const optionsCityList: I_City[] = [
        {
            VALUE: "Ничего не выбрано",
            ID: "",
        },
        ...cityList,
    ];
    const size = useSizeHook();
    const SelectCity = () => (
        <SelectUi
            value={payload.search?.CITY}
            onChange={(value) =>
                setPayload({
                    ...payload,
                    filter: {
                        ...payload.filter,
                    },
                    search: {
                        ...payload.search,
                        CITY: value,
                    },
                })
            }
            style={{
                minWidth: "276px",
            }}
            center={true}
            placeholder={"Выбрать город"}
            labelRenderPostfix={<CountUi value={graphicKpList.length} />}
            className={size.width < C_PAD ? "w-100" : ""}
            options={optionsCityList.map((c) => ({
                value: c.ID,
                label: c.VALUE,
            }))}
        />
    );
    const DatePickerList = () => tenderDateFilters.map((df) => (
        <PopoverWidget
            key={df.filterKey}
            title={"Выбор даты"}
            content={
                <DataPickerContent
                    value={payload.filter?.[df.filterKey]}
                    onChange={(value) =>
                        setPayload({
                            ...payload,
                            filter: {
                                ...payload.filter,
                                [df.filterKey]: value,
                            },
                            search: {
                                ...payload.search,
                            },
                        })
                    }
                />
            }
            btn={{
                label: df.label,
                icon: <ArrowDown />,
                iconPosition: "end",
                background:
                    payload.filter &&
                    (payload.filter[df.filterKey]?.TO ||
                        payload.filter[df.filterKey]?.FROM)
                        ? "low"
                        : "transparent",
            }}
        />
    ));

    return (
        <div>
            <Flex
                className="view--mb w-100"
                justify="space-between"
                align="center"
                vertical={true}
                gap={16}
            >
                <Flex
                    gap={12}
                    className={"w-100"}
                    justify={"space-between"}
                    align={"center"}
                >
                    <PopoverWidget
                        btn={{
                            label: Dictionary.SUBSCRIBE_TO_NOTIFICATION_MOBILE.ru,
                            background: "accent",
                            icon: <ReportIcon />,
                            className: "mobile-popover",
                        }}
                        title={Dictionary.SUBSCRIBE_TO_NOTIFICATION.ru}
                        content={<FormWidget {...FormSubscribeNotification()} />}
                    />
                    <PopoverWidget
                        title={"Выбрать дату"}
                        content={
                            <DatePickerFilterMobile<I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH>
                                payloadFilter={payload.filter}
                                onChange={(filter) =>
                                    setPayload({
                                        ...payload,
                                        filter,
                                        search: {
                                            ...payload.search,
                                        },
                                    })
                                }
                                dateFilters={tenderDateFilters}
                            />
                        }
                        children={
                            <ButtonFilter
                                value={graphicKpList.length}
                                icon={<CalendarIcon />}
                            />
                        }
                    />
                </Flex>
                <SelectCity />
            </Flex>

            <Flex align={"center"}
                  justify={"space-between"}
                  className={"view--pc w-100"}
            >
                <Flex gap={20}
                      align="center"
                >
                    <SelectCity />
                    <DatePickerList />
                </Flex>
                <span className={"fw--lg fs--md"}>Найдено: {graphicKpList.length}</span>
            </Flex>
        </div>
    );
};
