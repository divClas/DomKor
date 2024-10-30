import React, { useState } from "react";
import { Button, Calendar, Flex, Tabs, theme, Typography } from "antd";
import { MaskedInput } from "antd-mask-input";
import dayjs, { Dayjs } from "dayjs";

const { TabPane } = Tabs;

export const DataPickerContent: React.FC = () => {
  const { token } = theme.useToken();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [singleDate, setSingleDate] = useState<string>("");

  const [startCalendarDate, setStartCalendarDate] = useState<Dayjs | undefined>(
    undefined
  );
  const [endCalendarDate, setEndCalendarDate] = useState<Dayjs | undefined>(
    undefined
  );
  const [singleCalendarDate, setSingleCalendarDate] = useState<
    Dayjs | undefined
  >(undefined);

  const wrapperStyle: React.CSSProperties = {
    width: 307,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const handleCalendarChange = (
    date: Dayjs | undefined,
    setDate: React.Dispatch<React.SetStateAction<string>>,
    setCalendarDate: React.Dispatch<React.SetStateAction<Dayjs | undefined>>
  ) => {
    if (date) {
      const formattedDate = dayjs(date).format("DD.MM.YYYY");
      setDate(formattedDate);
      setCalendarDate(date);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setDate: React.Dispatch<React.SetStateAction<string>>,
    setCalendarDate: React.Dispatch<React.SetStateAction<Dayjs | undefined>>
  ) => {
    const { value } = e.target;
    setDate(value);

    const parsedDate = dayjs(value, "DD.MM.YYYY", true);
    if (parsedDate.isValid()) {
      setCalendarDate(parsedDate);
    } else {
      setCalendarDate(undefined);
    }
  };

  return (
    <div style={{ width: "638px", padding: "16px 20px" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Период" key="1">
          <Flex justify="space-between" align="center" gap={24}>
            <div className="column">
              <Typography.Text strong>От</Typography.Text>
              <MaskedInput
                mask={Date}
                placeholder="ДД.ММ.ГГГГ"
                value={startDate}
                onChange={(e) =>
                  handleInputChange(e, setStartDate, setStartCalendarDate)
                }
                style={{ margin: "12px 0px", width: "100%" }}
              />
              <div style={wrapperStyle}>
                <Calendar
                  fullscreen={false}
                  value={startCalendarDate || undefined}
                  onSelect={(date) =>
                    handleCalendarChange(
                      date,
                      setStartDate,
                      setStartCalendarDate
                    )
                  }
                  style={{ width: "307px" }}
                />
              </div>
            </div>
            <div className="column">
              <Typography.Text strong>До</Typography.Text>
              <MaskedInput
                mask={Date}
                placeholder="ДД.ММ.ГГГГ"
                value={endDate}
                onChange={(e) =>
                  handleInputChange(e, setEndDate, setEndCalendarDate)
                }
                style={{ margin: "12px 0px", width: "100%" }}
              />
              <div style={wrapperStyle}>
                <Calendar
                  fullscreen={false}
                  value={endCalendarDate || undefined}
                  onSelect={(date) =>
                    handleCalendarChange(date, setEndDate, setEndCalendarDate)
                  }
                  style={{ width: "307px" }}
                />
              </div>
            </div>
          </Flex>
        </TabPane>
        <TabPane tab="Конкретная дата" key="2">
          <Typography.Text strong>Выберите дату</Typography.Text>
          <MaskedInput
            mask={Date}
            placeholder="ДД.ММ.ГГГГ"
            value={singleDate}
            onChange={(e) =>
              handleInputChange(e, setSingleDate, setSingleCalendarDate)
            }
            style={{ margin: "12px 0px", width: "100%" }}
          />
          <div style={wrapperStyle}>
            <Calendar
              fullscreen={false}
              value={singleCalendarDate || undefined}
              onSelect={(date) =>
                handleCalendarChange(date, setSingleDate, setSingleCalendarDate)
              }
              style={{ width: "307px" }}
            />
          </div>
        </TabPane>
      </Tabs>
      <Flex align="center" gap={12} style={{ paddingTop: "24px" }}>
        <Button type="primary">Применить</Button>
        <Button type="link">Отмена</Button>
      </Flex>
    </div>
  );
};
