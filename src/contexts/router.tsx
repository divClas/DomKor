import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppLayout} from "@/components/layouts/AppLayout";
import {ErrorPage} from "@/components/pages/Error";
import MainPage from "@/components/pages/Main";
import {GraphicsTableWidget} from "../components/widgets/GraphicsTable";
import {GraphicsKpTableWidget} from "@/components/widgets/GraphicsKpTable";


export const RouterContext = () =><RouterProvider router={createBrowserRouter([
    {
        element: (<AppLayout />),
        children: [
            {
                path: "*",
                element: <ErrorPage />
            },
            {
                path: "/",
                element: <MainPage />,
                children: [
                    {
                        path: '/graphics',
                        element: <GraphicsTableWidget/>
                    },
                    {
                        path: '/graphics-kp',
                        element: <GraphicsKpTableWidget/>
                    }
                ]
            },
        ]
    },
])}
/>