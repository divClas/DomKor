import { ConfigProvider, Input } from "antd";

export const CustomInputSearch = () => {
  const { Search } = Input;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorderBg: "none",
          colorPrimaryHover: "none",
        },
      }}
    >
      <Search
        placeholder="Введите текст"
        style={{
          width: "100%",
          boxShadow: "none !important",
          border: "none  !important",
        }}
      />
    </ConfigProvider>
  );
};
