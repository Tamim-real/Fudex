import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";

const router= createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,


        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }
])

export default router;