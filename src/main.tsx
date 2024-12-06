import {createRoot} from 'react-dom/client'
import './index.scss'
import {Provider} from "react-redux";
import {store} from "@/store";
import {AppLayout} from "@/components/layouts/AppLayout";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
            <AppLayout />
    </Provider>,
)
