import { ReactComponent as GetDownloadDoc } from "@/assets/getDownloadDoc.svg";
import { Button } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ru";

interface GraphicKpItem {
  ID: string;
  NAME: string;
  DATE_CREATE: string;
  SUBMISSION_DEADLINE: string;
  TENDER_END_DATE: string;
  ADDRESS: string;
  PERSON: string;
  LEGAL_ENTITY: string;
  CITY: string;
  DOCUMENT: string;
}

interface ListProps {
  items: GraphicKpItem[];
}

export const List = ({ items }: ListProps) => {
  return (
    <>
      {items.map((item) => (
        <div key={item.ID} className="graphics-container">
          <div className="first-column">
            <div className="kp-name">{item.NAME}</div>
            <a
              target="_blank"
              href={item.DOCUMENT}
              className="downloadDocument"
            >
              <GetDownloadDoc />
              <span>Скачать тендерную документацию</span>
            </a>
          </div>
          <div className="second-column">
            <div className="kp-char">
              <div className="kp-items">
                <div className="kp-item-title">Заявки принимаются до:</div>
                <div className="kp-item-description">
                  {dayjs(item.SUBMISSION_DEADLINE)
                    .locale("ru")
                    .format("D MMMM YYYY")}
                </div>
              </div>
              <div className="kp-items">
                <div className="kp-item-title">Дата окончания тендера:</div>
                <div className="kp-item-description">
                  {dayjs(item.TENDER_END_DATE)
                    .locale("ru")
                    .format("D MMMM YYYY")}
                </div>
              </div>
              <div className="kp-items">
                <div className="kp-item-title">Адрес:</div>
                <div className="kp-item-description">{item.ADDRESS}</div>
              </div>
              <div className="kp-items">
                <div className="kp-item-title">Ответственный:</div>
                <div className="kp-item-description">{item.PERSON}</div>
              </div>
            </div>
            <div className="organization">{item.LEGAL_ENTITY}</div>
          </div>
          <div className="third-column">
            <Button>Откликнуться</Button>
            <div className="date-bottom">
              {dayjs(item.DATE_CREATE).locale("ru").format("D MMMM YYYY")}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
