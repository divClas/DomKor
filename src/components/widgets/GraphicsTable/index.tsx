import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/storeHooks.ts";
import {
    graphicThank,
    I_GRAPHIC_FILTER,
    I_GRAPHIC_SEARCH,
} from "@/store/graphic";
import {I_PayloadList} from "@/types/api.ts";
import {SearchInputString} from "@/components/ui/SearchInput/String.tsx";
import {I_Graphic} from "@/types/graphic.ts";
import {tableConstruct} from "@/helpers/tableConstruct.tsx";
import {Flex, Table} from "antd";
import {SearchInputDate} from "@/components/ui/SearchInput/Date.tsx";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {NoData} from "@/components/ui/NoData";
import MobileList from "@/components/ui/MobileList/Index";
import {columns} from "@/const";
import {FormSubscribeNewTender, FormSubscribeNotification} from "@/contexts/forms.ts";
import {FormWidget} from "@/components/widgets/Form";
import {PopoverWidget} from "@/components/ui/Popover";
import {ReactComponent as ReportIcon} from "@/assets/report.svg";
import {ReactComponent as SearhIcon} from "@/assets/mobileSearch.svg";
import useSizeHook from "@/hooks/useSizeHook.ts";

export const GraphicsTableWidget = () => {
    const dispatch = useAppDispatch();
    const {entity, status} = useAppSelector((s) => s.graphic);
    const [payload, setPayload] = useState<
        I_PayloadList<I_GRAPHIC_FILTER, I_GRAPHIC_SEARCH>
    >({});
    useEffect(() => {
        dispatch(graphicThank.getList(payload));
    }, [payload]);
    const cols = tableConstruct<I_Graphic>([
        {
            common: {
                title: () => {
                    return (
                        <SearchInputString
                            label={"Вид работ"}
                            val={payload.search?.WORK_TYPE ?? ""}
                            onChange={(val) => {
                                setPayload({
                                    ...payload,
                                    search: {
                                        ...payload.search,
                                        WORK_TYPE: val,
                                    },
                                    filter: {
                                        ...payload.filter,
                                    },
                                });
                            }}
                        />
                    );
                },
                dataIndex: "WORK_TYPE",
            },
            noSort: true,
            className: "fw--lg fs--md",
            type: "string",
        },
        {
            common: {
                title: () => {
                    return (
                        <SearchInputString
                            label={"Объекты"}
                            val={payload.search?.OBJECTS ?? ""}
                            onChange={(val) => {
                                setPayload({
                                    ...payload,
                                    search: {
                                        ...payload.search,
                                        OBJECTS: val,
                                    },
                                    filter: {
                                        ...payload.filter,
                                    },
                                });
                            }}
                        />
                    );
                },
                dataIndex: "OBJECTS",
            },
            noSort: true,
            type: "string",
        },
        {
            common: {
                title: () => {
                    return (
                        <SearchInputDate
                            label={"Старт СМР по оперативному плану"}
                            value={payload.filter?.SMR_START}
                            isDateFilter={
                                !!(
                                    payload.filter?.SMR_START?.FROM ||
                                    payload.filter?.SMR_START?.TO
                                )
                            }
                            isSort={payload.sortby === "SMR_START"}
                            setSort={() => {
                                setPayload({
                                    ...payload,
                                    sortby: "SMR_START",
                                    sort_type: payload.sort_type === "ASC" ? "DESC" : "ASC",
                                });
                            }}
                            onChange={(val) => {
                                setPayload({
                                    ...payload,
                                    search: {
                                        ...payload.search,
                                    },
                                    filter: {
                                        ...payload.filter,
                                        SMR_START: val,
                                    },
                                });
                            }}
                        />
                    );
                },
                dataIndex: "SMR_START",
            },
            format: "MMMM YYYY",
            type: "date",
        },
        {
            common: {
                title: () => {
                    return (
                        <SearchInputDate
                            label={"Плановая дата проведения тендера"}
                            value={payload.filter?.TENDER_PLANNED}
                            isDateFilter={
                                !!(
                                    payload.filter?.TENDER_PLANNED?.FROM ||
                                    payload.filter?.TENDER_PLANNED?.TO
                                )
                            }
                            isSort={payload.sortby === "TENDER_PLANNED"}
                            setSort={() => {
                                setPayload({
                                    ...payload,
                                    sortby: "TENDER_PLANNED",
                                    sort_type: payload.sort_type === "ASC" ? "DESC" : "ASC",
                                });
                            }}
                            onChange={(val) => {
                                setPayload({
                                    ...payload,
                                    search: {
                                        ...payload.search,
                                    },
                                    filter: {
                                        ...payload.filter,
                                        TENDER_PLANNED: val,
                                    },
                                });
                            }}
                        />
                    );
                },
                dataIndex: "TENDER_PLANNED",
            },
            type: "date",
        },
        {
            common: {
                title: () => {
                    return (
                        <SearchInputDate
                            label={"Плановая дата утверждения победителя тендера"}
                            value={payload.filter?.WINNER_APPROVAL}
                            isDateFilter={
                                !!(
                                    payload.filter?.WINNER_APPROVAL?.FROM ||
                                    payload.filter?.WINNER_APPROVAL?.TO
                                )
                            }
                            isSort={payload.sortby === "WINNER_APPROVAL"}
                            setSort={() => {
                                setPayload({
                                    ...payload,
                                    sortby: "WINNER_APPROVAL",
                                    sort_type: payload.sort_type === "ASC" ? "DESC" : "ASC",
                                });
                            }}
                            onChange={(val) => {
                                setPayload({
                                    ...payload,
                                    search: {
                                        ...payload.search,
                                    },
                                    filter: {
                                        ...payload.filter,
                                        WINNER_APPROVAL: val,
                                    },
                                });
                            }}
                        />
                    );
                },
                dataIndex: "WINNER_APPROVAL",
            },
            type: "date",
        },
        {
            common: {
                title: () => {
                    return (
                        <SearchInputDate
                            label={"Плановая дата подписания контракта"}
                            value={payload.filter?.CONTRACT_SIGNING}
                            isDateFilter={
                                !!(
                                    payload.filter?.CONTRACT_SIGNING?.FROM ||
                                    payload.filter?.CONTRACT_SIGNING?.TO
                                )
                            }
                            isSort={payload.sortby === "CONTRACT_SIGNING"}
                            setSort={() => {
                                setPayload({
                                    ...payload,
                                    sortby: "CONTRACT_SIGNING",
                                    sort_type: payload.sort_type === "ASC" ? "DESC" : "ASC",
                                });
                            }}
                            onChange={(val) => {
                                setPayload({
                                    ...payload,
                                    search: {
                                        ...payload.search,
                                    },
                                    filter: {
                                        ...payload.filter,
                                        CONTRACT_SIGNING: val,
                                    },
                                });
                            }}
                        />
                    );
                },
                dataIndex: "CONTRACT_SIGNING",
            },
            type: "date",
        },
        {
            common: {
                title: "Действие",
                dataIndex: "ID",
            },
            noSort: true,
            type: "buttonWithModal",
            modalChild: (val) => <FormWidget {...FormSubscribeNewTender(val)} />,
            modalTitle: Dictionary.SEND_EVENT_GRAPHIC.ru,
            label: Dictionary.SEND_EVENT.ru,
            width: 180,
        },
    ]);

    const windowSize = useSizeHook()


    return (
        <>
            <Flex className="mobile-filter"
                  justify="space-between"
                  align="center"
            >
                <PopoverWidget
                    id={"SUBSCRIBE_TO_NOTIFICATION_MOBILE"}
                    btn={{
                        label: Dictionary.SUBSCRIBE_TO_NOTIFICATION_MOBILE.ru,
                        background: "accent",
                        icon: <ReportIcon />,
                        className: "mobile-popover"
                    }}
                    title={Dictionary.SEND_EVENT_GRAPHIC.ru}
                    content={<FormWidget {...FormSubscribeNotification} />}
                />
                <div className="search-btn">
                    <SearhIcon />
                </div>
            </Flex>
            {windowSize.width < 1000 ? (
                <MobileList data={entity}
                            columns={columns}
                />
            ) : (
                <Table<I_Graphic>
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
                    dataSource={entity}
                    scroll={{y: 200 * 5}}
                    pagination={false}
                />
            )}
        </>
    );
};
