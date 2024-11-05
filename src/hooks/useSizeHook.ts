import {useEffect, useState} from "react";

const useSizeHook = () => {
    const [windowSize, setWindowSize] = useState<{
        width: number,
        height: number,
    }>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const windowSizeHandler = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener("resize", windowSizeHandler);

        return () => {
            window.removeEventListener("resize", windowSizeHandler);
        };
    }, []);

    return windowSize;
};

export default useSizeHook;
