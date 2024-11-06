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
import useSizeHook from "@/hooks/useSizeHook.ts";

export const GraphicKpListWidget: FC<{
    onReset: () => void;
}> = ({onReset}) => {
    const {entity: graphicKpList, status} = useAppSelector((s) => s.graphicKP);

    const [activeId, setActiveId] = useState<string | null>(null);
    if (graphicKpList.length === 0 && status !== "pending") {
        return <NoData onReset={onReset} />;
    }
    const size = useSizeHook()
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
                            download
                            className="downloadDocument"
                        >
                            <GetDownloadDoc />
                            <span>Скачать тендерную документацию</span>
                        </a>
                    </div>
                    <div className="second-column">
                        <div className="kp-char">
                            <div className="kp-items">
                                <div className="fw--sm fs--sm color--gray">Заявки принимаются до:</div>
                                <div className="fw--sm fs--md">
                                    {dayjs(item.SUBMISSION_DEADLINE)
                                        .locale("ru")
                                        .format("D MMMM YYYY")}
                                </div>
                            </div>
                            <div className="kp-items">
                                <div className="fw--sm fs--sm color--gray">Дата окончания тендера:</div>
                                <div className="fw--sm fs--md">
                                    {dayjs(item.TENDER_END_DATE)
                                        .locale("ru")
                                        .format("D MMMM YYYY")}
                                </div>
                            </div>
                            <div className="kp-items">
                                <div className="fw--sm fs--sm color--gray">Адрес:</div>
                                <div className="fw--sm fs--md">{item.ADDRESS}</div>
                            </div>
                            <div className="kp-items">
                                <div className="fw--sm fs--sm color--gray">Ответственный:</div>
                                <div className="fw--sm fs--md">{item.PERSON}</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className={`${size.width > 1000 ? 'fs--md' : 'fs--sm'} fw--sm color--gray`}>{item.LEGAL_ENTITY}</div>
                            <div className="fw--sm fs--sm color--gray view--mb">
                                {dayjs(item.DATE_CREATE).locale("ru").format("D MMMM YYYY")}
                            </div>
                        </div>
                    </div>
                    <div className="third-column">
                        <PopoverWidget
                            id={item.ID + Dictionary.SEND_EVENT.ru}
                            btn={{
                                label: Dictionary.SEND_EVENT.ru,
                                background: "accent",
                                className: 'w-100'
                            }}
                            title={Dictionary.SEND_EVENT_TENDER.ru}
                            onOpenChange={(visible) => setActiveId(visible ? item.ID : null)}
                            content={<FormWidget {...FormSubscribeKP(item.ID)} />}
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
