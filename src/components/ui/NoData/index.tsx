import {Flex} from "antd";
import {ReactComponent as NoDataIcon} from "@/assets/NoDataIcon.svg";
import {FC} from "react";
import {Button} from "@/components/ui/Button";

export const NoData: FC<{
    onReset?: () => void
}> = ({onReset}) => {
    return (
        <>
            <Flex
                vertical={true}
                align="center"
                style={{padding: "80px 0px 0px 0px"}}
                justify="center"
            >
                <NoDataIcon />
                <p className="no-data-text">По вашему запросу ничего не найдено</p>
                <Flex>
                    <Button label={'Сбросить результаты поиска'}
                            background={'gray'}
                            className={'pd-xmd'}
                            onClick={onReset}
                    />
                </Flex>
            </Flex>
        </>
    );
};
