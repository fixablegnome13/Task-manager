import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import TaskView from "./views/TaskView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Navigate to="/"/>
            },
            {
                path:'/',
                element: <Dashboard />
            },
            {
                path:'/task/create',
                element: <TaskView />
            },
            {
                path:'/task/:id',
                element: <TaskView />
            },

        ]
    },
    {
        path:'/',
        element: <GuestLayout />,
        children: [
            {
                path:'/login',
                element: <Login />
            },
            {
                path:'/signup',
                element: <Signup />
            },
        ]
    },
])

export default router;