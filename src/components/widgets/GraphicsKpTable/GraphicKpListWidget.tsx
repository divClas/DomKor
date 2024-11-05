import {ReactComponent as GetDownloadDoc} from "@/assets/getDownloadDoc.svg";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import {useAppSelector} from "@/hooks/storeHooks.ts";
import {PopoverWidget} from "@/components/ui/Popover";
import {Dictionary} from "@/contexts/Dictionary.ts";
import {NoData} from "@/components/ui/NoData";
import {FC, useState} from "react";
import {FormWidget} from "@/components/widgets/Form";
import {FormSubscribeKP} from "@/contexts/forms.ts";

export const GraphicKpListWidget: FC<{
    onReset: () => void;
}> = ({onReset}) => {
    const {entity: graphicKpList, status} = useAppSelector((s) => s.graphicKP);

    const [activeId, setActiveId] = useState<string | null>(null);
    if (graphicKpList.length === 0 && status !== "pending") {
        return <NoData onReset={onReset} />;
    }

    return (
        <>
            {graphicKpList.map((item) => (
                <div
                    key={item.ID}
                    className={`graphics-container ${activeId === item.ID ? "active-container" : ""
                    }`}
                >
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
                        <div className="item">
                            <div className="organization">{item.LEGAL_ENTITY}</div>
                            <div className="date-bottom mobile">
                                {dayjs(item.DATE_CREATE).locale("ru").format("D MMMM YYYY")}
                            </div>
                        </div>
                    </div>
                    <div className="third-column">
                        <PopoverWidget
                            label={Dictionary.SEND_EVENT.ru}
                            background={"accent"}
                            title={Dictionary.SEND_EVENT_TENDER.ru}
                            onOpenChange={(visible) => setActiveId(visible ? item.ID : null)}
                            children={<FormWidget {...FormSubscribeKP(item.ID)} />}
                        />
                        <div className="date-bottom">
                            {dayjs(item.DATE_CREATE).locale("ru").format("D MMMM YYYY")}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
