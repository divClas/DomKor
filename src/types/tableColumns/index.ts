export interface TableDataType {
  key: string;
  workType: string;
  objects: string;
  startDate: string;
  tenderDate: string;
  contractDate: string;
  action: string;
  sorter?: (a: TableDataType, b: TableDataType) => number | string;
}

export interface ColumnType {
  title: string;
  dataIndex: keyof TableDataType;
  key: keyof TableDataType;
  render?: (text: string, record: TableDataType) => JSX.Element;
}
