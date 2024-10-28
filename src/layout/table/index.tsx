import React from 'react'
import { Button, Table } from "antd";
import { mockDataForTable } from '../../mockData';
export default function TableLayout() {
    const dataColumns = [
        {
            title: 'Вид работ',
            dataIndex: 'workType',
            key: 'workType',
        },
        {
            title: 'Объекты',
            dataIndex: 'objects',
            key: 'objects',
        },
        {
            title: 'Старт СМР по оперативному плану',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Плановая дата проведения тендера',
            dataIndex: 'tenderDate',
            key: 'tenderDate',
        },
        {
            title: 'Плановая дата подписания контракта',
            dataIndex: 'contractDate',
            key: 'contractDate',
        },
        {
            title: 'Действие',
            dataIndex: 'action',
            key: 'action',
            render: (text: string | number, record: any) => (
                <Button type="primary" onClick={() => handleActionClick(record)}>
                    {text}
                </Button>
            ),
        }
    ];

    const handleActionClick = (record: any) => {
        console.log(`Button clicked for: ${JSON.stringify(record)}`);
    };

    return (
        <div>
            <Table dataSource={mockDataForTable} columns={dataColumns}
                scroll={{ x: 'max-content', y: 100 * 5 }} />
        </div>
    )
}
