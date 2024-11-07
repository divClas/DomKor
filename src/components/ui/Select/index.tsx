import {FC} from "react";
import {Select} from "antd";
import {I_SelectProps} from "@/types/app.ts";
import {ReactComponent as CheckedIcon} from "@/assets/chekedIcon.svg";

export const SelectUi: FC<I_SelectProps> = ({
                                                onChange,
                                                value,
                                                options,
                                                className,
                                                labelRenderPostfix,
                                                placeholder
                                            }) => {
    return (
        <Select
            className={"custom-select " + className}
            style={{minWidth: "276px", textAlign: "center"}}
            placeholder={placeholder}
            options={options}
            allowClear={true}
            value={value}
            onChange={onChange}
            labelRender={(label) => {
                return <div>{label.label} {labelRenderPostfix}</div>
            }}
            optionRender={(option   ) => (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {option.label}
                    {option.value === value && <CheckedIcon />}
                </div>
            )}
        />
    )
}