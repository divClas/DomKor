import {Flex} from "antd";
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
                <h3>Страница не найдена</h3>
            </Flex>
        </div>
    )
})