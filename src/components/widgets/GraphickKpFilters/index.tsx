import { Flex } from "antd";
import { ReactComponent as ArrowDown } from "@/assets/black-arrow-down.svg";
import { FC, useEffect } from "react";
import {
  graphicKPThank,
  I_GRAPHIC_KP_FILTER,
  I_GRAPHIC_KP_SEARCH,
} from "@/store/graphicKP";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { DataPickerContent } from "@/components/widgets/DataPickerContent";
import { I_PayloadList } from "@/types/api.ts";
import { cityThank } from "@/store/city";
import { I_City } from "@/types/city.ts";
import { PopoverWidget } from "@/components/ui/Popover";
import { Dictionary } from "@/contexts/Dictionary";
import { ReactComponent as ReportIcon } from "@/assets/report.svg";
import { ReactComponent as CalendarIcon } from "@/assets/mobileCalendar.svg";
import { FormWidget } from "../Form";
import { FormSubscribeNotification } from "@/contexts/forms";
import { SelectUi } from "@/components/ui/Select";
import { DatePickerFilterMobile } from "@/components/widgets/GraphicsKpTable/Modile/DatePicker.tsx";
import { tenderDateFilters } from "@/contexts/filters.ts";
import useSizeHook from "@/hooks/useSizeHook.ts";
import { CountUi } from "@/components/ui/Count";
import { ButtonFilter } from "@/components/ui/ButtonFilter";

export const GraphicKpFilters: FC<{
  payload: I_PayloadList<I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH>;
  setPayload: (
    p: I_PayloadList<I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH>
  ) => void;
}> = ({ payload, setPayload }) => {
  const dispatch = useAppDispatch();
  const { entity: cityList } = useAppSelector((s) => s.city);
  const { entity: graphicKpList } = useAppSelector((s) => s.graphicKP);
  useEffect(() => {
    dispatch(graphicKPThank.getList(payload));
    dispatch(cityThank.getList({}));
  }, [payload]);
  const optionsCityList: I_City[] = [
    {
      VALUE: "Ничего не выбрано",
      ID: "",
    },
    ...cityList,
  ];
  const size = useSizeHook();
  const SelectCity = (
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
      placeholder={"Выбрать город"}
      labelRenderPostfix={<CountUi value={graphicKpList.length} />}
      className={size.width < 1000 ? "w-100" : ""}
      options={optionsCityList.map((c) => ({
        value: c.ID,
        label: c.VALUE,
      }))}
    />
  );
  const DatePickerList = tenderDateFilters.map((df) => (
    <PopoverWidget
      id={df.filterKey + df.label}
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
            id={Dictionary.SUBSCRIBE_TO_NOTIFICATION_MOBILE.ru + "kp"}
            btn={{
              label: Dictionary.SUBSCRIBE_TO_NOTIFICATION_MOBILE.ru,
              background: "accent",
              icon: <ReportIcon />,
            }}
            title={Dictionary.SUBSCRIBE_TO_NOTIFICATION.ru}
            content={<FormWidget {...FormSubscribeNotification} />}
          />
          <PopoverWidget
            id={"pick-date"}
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
        {SelectCity}
      </Flex>

      <Flex gap={"20px"} align="center" className={"view--pc"}>
        {SelectCity}
        {DatePickerList}
      </Flex>
    </div>
  );
};
