import {Flex} from "antd";
import {Dictionary} from "@/contexts/Dictionary.ts";

export const ErrorPage = (() => {
    return (
        <div>
            <Flex vertical={true}
                  align={'center'}
                  gap={20}
                  justify={'center'}
            >
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: 800
                }}
                >404</h1>
                <h3>{Dictionary.PAGE_NOT_FOUND.ru}</h3>
            </Flex>
        </div>
    )
})