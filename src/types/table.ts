export interface I_ColumnCommons<I_Entity> {
  common: {
    dataIndex: keyof I_Entity;
    title: React.ReactNode | ((props: any) => React.ReactNode);
  };
  disabled?: boolean;
  noSort?: boolean;
  width?: number | "auto";
  readonly?: boolean;
  placeholder?: string;
  afterChange?: (newVel: number, record: I_Entity) => void;
}

export interface I_TableColumn__string {
  type: "string";
  onChange?: (newVal: string) => void;
}

export interface I_TableColumn__date {
  type: "date";
}

export interface I_TableColumn__button<I_COLUMNS> {
  type: "button";
  onClick?: (value: number, record: I_COLUMNS) => void;
  label?: string;
}

export type I_TableColumn<I_COLUMNS> = I_ColumnCommons<I_COLUMNS> &
  (
    | I_TableColumn__date
    | I_TableColumn__string
    | I_TableColumn__button<I_COLUMNS>
  );
