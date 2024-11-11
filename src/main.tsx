import {createRoot} from 'react-dom/client'
import './index.scss'
import {Provider} from "react-redux";
import {store} from "@/store";
import {AppLayout} from "@/components/layouts/AppLayout";
import {C_ReCaptcha} from "@/components/widgets/Form/model/reCaptcha.tsx";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <C_ReCaptcha>
            <AppLayout />
        </C_ReCaptcha>
    </Provider>,
)
