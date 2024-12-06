import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import {FC, ReactNode} from "react";

export const C_ReCaptcha: FC<{ children: ReactNode }> = ({children}) => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}
            language={"JavaScript1.5"}
            useEnterprise={true}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: 'head',
                nonce: undefined
            }}
            container={{
                parameters: {
                    theme: 'light',
                }
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}