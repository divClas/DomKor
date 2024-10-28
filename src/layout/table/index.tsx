import { Button, Table, DatePicker, ConfigProvider, Input } from "antd";
import { mockDataForTable } from "../../mockData";
import { ColumnType, TableDataType } from "../../types/tableColumns";

const { Search } = Input;
export default function TableLayout() {
  const dataColumns: ColumnType[] = [
    {
      title: () => (
        <div>
          <Search placeholder="Вид работ" style={{ width: "100%" }} />
        </div>
      ),
      dataIndex: "workType",
      key: "workType",
    },
    {
      title: "Старт СМР по оперативному плану",
      dataIndex: "objects",
      key: "objects",
    },
    {
      title: "Старт СМР по оперативному плану",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a: TableDataType, b: TableDataType) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    },
    {
      title: "Плановая дата проведения тендера",
      dataIndex: "tenderDate",
      key: "tenderDate",
      sorter: (a: TableDataType, b: TableDataType) =>
        new Date(a.tenderDate).getTime() - new Date(b.tenderDate).getTime(),
    },
    {
      title: "Плановая дата подписания контракта",
      dataIndex: "contractDate",
      key: "contractDate",
      sorter: (a: TableDataType, b: TableDataType) =>
        new Date(a.contractDate).getTime() - new Date(b.contractDate).getTime(),
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: TableDataType) => (
        <Button type="primary" onClick={() => handleActionClick(record)}>
          {text}
        </Button>
      ),
    },
  ];

  const handleActionClick = (record: any) => {
    console.log(`Button clicked for: ${JSON.stringify(record)}`);
  };

  return (
    <ConfigProvider
      theme={{
        token: {},
      }}
    >
      <Table
        dataSource={mockDataForTable}
        columns={dataColumns}
        scroll={{ x: "max-content", y: 100 * 5 }}
      />
    </ConfigProvider>
  );
}
