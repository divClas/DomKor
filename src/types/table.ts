import {ReactNode} from "react";
import {ColumnGroupType, ColumnType} from "antd/es/table";

export type I_COL<I_ROW> = (ColumnGroupType<I_ROW> | ColumnType<I_ROW>) & I_ColumnCustom

export interface I_ColumnCommons<I_Entity> {
    common: {
        dataIndex: keyof I_Entity;
        title: ReactNode | (() => ReactNode);
    };
    titleString: string
    className?: string
    noSort?: boolean;
    disabled?: boolean;
    width?: number | "auto" | string;
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
    format?: string
}

export interface I_TableColumn__button<I_Entity> {
    type: "button";
    onClick?: (value: number, record: I_Entity) => void;
    label?: string;
}

export interface I_TableColumn__buttonWithModal<I_Entity> {
    type: "buttonWithModal";
    modalChild: (val: string, record: I_Entity) => ReactNode;
    modalTitle: string;
    label?: string;
}

export type I_TableColumn<I_Entity> = I_ColumnCommons<I_Entity> &
    (
        | I_TableColumn__date
        | I_TableColumn__string
        | I_TableColumn__button<I_Entity>
        | I_TableColumn__buttonWithModal<I_Entity>
        );


export interface I_ColumnCustom {
    titleString: string
    type: I_TableColumn<object>['type']
}
