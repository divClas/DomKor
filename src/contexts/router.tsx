import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppLayout} from "@/components/layouts/AppLayout";
import {ErrorPage} from "@/components/pages/Error";
import MainPage from "@/components/pages/Main";


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
            },
        ]
    },
])}
/>