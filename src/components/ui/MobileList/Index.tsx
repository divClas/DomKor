import { Modal, Typography } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Button } from "../Button";
import { useState } from "react";

dayjs.locale("ru");

interface MobileListProps<T> {
    data: T[];
    columns: {
        title: string;
        dataIndex: keyof T;
        format?: string;
    }[];
}

const MobileList = <T,>({ data, columns }: MobileListProps<T>) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div >
            {data.map((row, index) => (
                <div
                    key={index}
                    style={{
                        marginBottom: "16px",
                        padding: "12px",
                        borderBottom: "1px solid #e0e0e0",
                        borderTop: "1px solid #e0e0e0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}
                >
                    {columns.map((col) => (
                        <div key={String(col.dataIndex)} style={{ borderLeft: "1px solid rgba(117, 119, 120, 1)", paddingLeft: '8px' }}>
                            <p className="title" >{col.title}</p>
                            <p className="sub-title" style={{ display: "block" }}>
                                {col.dataIndex === "SMR_START"
                                    ? dayjs(row[col.dataIndex] as string).format("MMMM YYYY")
                                    : col.format && row[col.dataIndex]
                                        ? dayjs(row[col.dataIndex] as string).format("DD.MM.YYYY")
                                        : String(row[col.dataIndex] ?? "")}
                            </p>
                        </div>
                    ))}
                    <Button background="accent" label="Откликнуться" onClick={showModal} />
                    {/* марат нужно прокинуть сюда форму  */}
                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>

                </div>
            ))}
        </div>
    );
};

export default MobileList;
