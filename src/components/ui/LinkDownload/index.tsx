import {FC} from "react";
import {ReactComponent as GetDownloadDoc} from "@/assets/getDownloadDoc.svg";
import {Flex} from "antd";

export const LinkDownloadUi: FC<{
    href: string
    label: string
    className?: {
        a?: string
        Flex?: string
    }
}> = ({href, label, className}) => (
    <a
        target="_blank"
        href={href}
        download
        className={`w-fit pd-sm ${className?.a}`}

    >
        <Flex align={'center'}
              gap={8}
              justify={'center'}
              className={`${className?.Flex}`}
        >
            <GetDownloadDoc />
            <span
                className={"fs--md fw--def color--black"}
            >{label}</span>
        </Flex>
    </a>
)