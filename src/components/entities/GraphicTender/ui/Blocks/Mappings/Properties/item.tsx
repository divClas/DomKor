import { ListItem } from "@/components/ui/ListItem";
import { I_TableColumn } from "@/types/table";
import { FC, ReactNode } from "react";

export const GraphicTenderPropertyItem: FC<{
    type: I_TableColumn<object>["type"];
    render: string | ReactNode;
    label: string;
}> = ({
    type,
    render,
    label
}) => {
        switch (type) {
            case "button": return (
                <ListItem.Full children={render} />
            )
            case "buttonWithModal": return (
                <ListItem.Full children={render} />
            )
            case "date": return (
                <ListItem.WithLeftBorder children={render} label={label} />
            )
            case "select": return (
                <ListItem.WithLeftBorder children={render} label={label} />
            )
            case "string": return (
                <ListItem.WithLeftBorder children={render} label={label} />
            )
        }
    }