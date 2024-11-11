import { FC } from "react";
import {Flex, Select} from "antd";
import { I_SelectProps } from "@/types/app.ts";
import { ReactComponent as CheckedIcon } from "@/assets/chekedIcon.svg";
import { ReactComponent as ArrowDown } from "@/assets/arrowDown.svg";

export const SelectUi: FC<I_SelectProps> = ({
  onChange,
  value,
  options,
  className,
  labelRenderPostfix,
  placeholder,
  icon,
  center
}) => {
  return (
    <Select
      className={"custom-select " + className}
      style={{ minWidth: "276px", }}
      placeholder={placeholder}
      options={options}
      allowClear={true}
      value={value}
      onChange={onChange}
      labelRender={(label) => {
        return (
          <Flex align={'center'} gap={8} justify={center ? 'center' : 'flex-start'}>
            {icon && <ArrowDown width={16} />} {label.label} {labelRenderPostfix}
          </Flex>
        );
      }}
      optionRender={(option) => (
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
  );
};
