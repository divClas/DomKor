import { Flex } from "antd";
import { ReactComponent as NoDataIcon } from "@/assets/NoDataIcon.svg";

export const NoData = () => {
  return (
    <>
      <Flex
        vertical={true}
        align="center"
        style={{ padding: "80px 0px 0px 0px" }}
        justify="center"
      >
        <NoDataIcon />
        <p className="no-data-text">По вашему запросу ничего не найдено</p>
        <button className="clear-data">Сбросить результаты поиска</button>
      </Flex>
    </>
  );
};
