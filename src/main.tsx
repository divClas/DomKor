import { createRoot } from 'react-dom/client'
import './index.scss'
import {Provider} from "react-redux";
import {store} from "@/store";
import {RouterContext} from "@/contexts/router.tsx";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterContext />
    </Provider>,
)
