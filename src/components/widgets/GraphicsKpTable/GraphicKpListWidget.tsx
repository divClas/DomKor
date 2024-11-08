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
import {LinkDownloadUi} from "@/components/ui/LinkDownload";

export const GraphicKpListWidget: FC<{
    onReset: () => void;
}> = ({onReset}) => {
    const {entity: graphicKpList, status} = useAppSelector((s) => s.graphicKP);

    const [activeId, setActiveId] = useState<string | null>(null);
    const size = useSizeHook()


    if (graphicKpList.length === 0 && status !== "pending") {
        return <NoData onReset={onReset} />;
    }
    return (
        <div>
            {graphicKpList.map((item) => (
                <div
                    key={item.ID}
                    className={`graphics-container ${activeId === item.ID ? "active-container" : ""
                    }`}
                >
                    <div className="first-column">
                        <div className="kp-name">{item.NAME}</div>
                        <LinkDownloadUi label={Dictionary.DOWNLOAD_TENDER_DOC.ru}
                                        href={item.DOCUMENT}
                                        className={{
                                            a: 'view--pc'
                                        }}
                        />
                    </div>
                    <div className="second-column">
                        <div className="kp-char">
                            <div className="kp-items">
                                <div className="fw--sm fs--sm color--gray ff-apercy">Заявки принимаются до:</div>
                                <div className="fw--def fs--md ff-apercy">
                                    {dayjs(item.SUBMISSION_DEADLINE)
                                        .locale("ru")
                                        .format("D MMMM YYYY")}
                                </div>
                            </div>
                            <div className="kp-items">
                                <div className="fw--sm fs--sm color--gray ff-apercy ">Дата окончания тендера:</div>
                                <div className="fw--def fs--md ff-apercy">
                                    {dayjs(item.TENDER_END_DATE)
                                        .locale("ru")
                                        .format("D MMMM YYYY")}
                                </div>
                            </div>
                            <div className="kp-items">
                                <div className="fw--sm fs--sm color--gray ff-apercy">Адрес:</div>
                                <div className="fw--def fs--md ff-apercy">{item.ADDRESS}</div>
                            </div>
                            <div className="kp-items">
                                <div className="fw--sm fs--sm color--gray ff-apercy">Ответственный:</div>
                                <div className="fw--def fs--md ff-apercy">{item.PERSON}</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className={`${size.width > 1000 ? 'fs--md' : 'fs--sm'} fw--sm color--gray ff-apercy`}>{item.LEGAL_ENTITY}</div>
                            <div className="fw--sm fs--sm color--gray view--mb ff-apercy">
                                {dayjs(item.DATE_CREATE).locale("ru").format("D MMMM YYYY")}
                            </div>
                        </div>
                    </div>
                    <div className="third-column">
                        <PopoverWidget
                            btn={{
                                label: Dictionary.SEND_EVENT.ru,
                                background: "accent",
                                className: 'w-100 h-36'
                            }}
                            title={Dictionary.SEND_EVENT_TENDER.ru}
                            onOpenChange={(visible) => setActiveId(visible ? item.ID : null)}
                            content={<FormWidget {...FormSubscribeKP(item.ID)} />}
                        />

                        <LinkDownloadUi label={Dictionary.DOWNLOAD_TENDER_DOC.ru}
                                        href={item.DOCUMENT}
                                        className={{
                                            a: 'view--mb w-100 mt-1',
                                            Flex: 'w-100 flex-jc-center'
                                        }}
                        />
                        <div className="date-bottom">
                            {dayjs(item.DATE_CREATE).locale("ru").format("D MMMM YYYY")}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
