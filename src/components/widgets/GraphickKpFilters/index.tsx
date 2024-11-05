import { Flex, Popover, Select } from "antd";
import { ReactComponent as CheckedIcon } from "@/assets/chekedIcon.svg";
import { ReactComponent as ArrowDown } from "@/assets/arrowDown.svg";
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

export const GraphicKpFilters: FC<{
  payload: I_PayloadList<I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH>;
  setPayload: (
    p: I_PayloadList<I_GRAPHIC_KP_FILTER, I_GRAPHIC_KP_SEARCH>
  ) => void;
}> = ({ payload, setPayload }) => {
  const dispatch = useAppDispatch();
  const { entity: cityList } = useAppSelector((s) => s.city);
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
  return (
    <div>
      <Flex className="mobile-filter" justify="space-between" align="center">
        <PopoverWidget
          label={Dictionary.SUBSCRIBE_TO_NOTIFICATION_MOBILE.ru}
          background={"accent"}
          icon={<ReportIcon />}
          title={Dictionary.SEND_EVENT_GRAPHIC.ru}
          children={<FormWidget {...FormSubscribeNotification} />}
          className="mobile-popover"
        />
        <div className="search-btn">
          <CalendarIcon />
        </div>{" "}
      </Flex>

      <Flex gap={"20px"} align="center">
        <Select
          className="custom-select"
          style={{ minWidth: "276px", textAlign: "center" }}
          placeholder="Выбрать город"
          options={optionsCityList.map((c) => ({
            value: c.ID,
            label: c.VALUE,
          }))}
          allowClear={true}
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
          optionRender={(option) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {option.label}
              {option.value === payload.search?.CITY && <CheckedIcon />}
            </div>
          )}
        />
        <Popover
          content={
            <DataPickerContent
              value={payload.filter?.DATE_CREATE}
              onChange={(value) =>
                setPayload({
                  ...payload,
                  filter: {
                    ...payload.filter,
                    DATE_CREATE: value,
                  },
                  search: {
                    ...payload.search,
                  },
                })
              }
            />
          }
          trigger="click"
        >
          <div className="select-item">
            <Flex
              justify="space-between"
              align="center"
              gap={8}
              className={
                "date-picker-trigger " +
                (payload.filter?.DATE_CREATE?.TO ||
                payload.filter?.DATE_CREATE?.FROM
                  ? "active-icon"
                  : "")
              }
            >
              <p className="dateSelected">Дата публикации</p>
              <ArrowDown />
            </Flex>
          </div>
        </Popover>
        <Popover
          content={
            <DataPickerContent
              value={payload.filter?.TENDER_END_DATE}
              onChange={(value) =>
                setPayload({
                  ...payload,
                  filter: {
                    ...payload.filter,
                    TENDER_END_DATE: value,
                  },
                  search: {
                    ...payload.search,
                  },
                })
              }
            />
          }
          trigger="click"
        >
          <div className="select-item">
            <Flex
              justify="space-between"
              align="center"
              gap={8}
              className={
                "date-picker-trigger " +
                (payload.filter?.TENDER_END_DATE?.TO ||
                payload.filter?.TENDER_END_DATE?.FROM
                  ? "active-icon"
                  : "")
              }
            >
              <p className="dateSelected">Дата окончания тендера</p>
              <ArrowDown />
            </Flex>
          </div>
        </Popover>
        <Popover
          content={
            <DataPickerContent
              value={payload.filter?.SUBMISSION_DEADLINE}
              onChange={(value) =>
                setPayload({
                  ...payload,
                  filter: {
                    ...payload.filter,
                    SUBMISSION_DEADLINE: value,
                  },
                  search: {
                    ...payload.search,
                  },
                })
              }
            />
          }
          trigger="click"
        >
          <div className="select-item">
            <Flex
              justify="space-between"
              align="center"
              gap={8}
              className={
                "date-picker-trigger " +
                (payload.filter?.SUBMISSION_DEADLINE?.TO ||
                payload.filter?.SUBMISSION_DEADLINE?.FROM
                  ? "active-icon"
                  : "")
              }
            >
              <p className="dateSelected">Дата окончания приема заявок</p>
              <ArrowDown />
            </Flex>
          </div>
        </Popover>
      </Flex>
    </div>
  );
};
