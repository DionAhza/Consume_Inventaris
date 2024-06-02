import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/User/Login";
import Profile from "./pages/User/Profile";
import Stuff from "./pages/Stuff/Stuff";
import StuffCreate from "./pages/Stuff/Create";
import StuffEdit from "./pages/Stuff/Edit";
import Dashboard from "./pages/dashboard";
import TrashStuff from "./pages/TrashStuff";
import Inbound from "./pages/Inbound/Inbound";
import IndexInbound from "./pages/Inbound/indexInbound";
import Lending from "./pages/Lending/index";
import User from "./pages/User";
import TrashInbound from "./pages/Inbound/TrashInbound";
import TrashUser from "./pages/User/TrashUser";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/edit/:id', element: <StuffEdit /> },
    { path: '/dashboard', element: <Dashboard /> },
    {path: '/stuff/trash', element: <TrashStuff/>},
    {path: '/inbound/create', element:<Inbound/>} ,
    {path: '/inbound/trash',element:<TrashInbound/>},
    {path: '/inbound',element:<IndexInbound/>},
    {path: '/lending', element:<Lending/>},
    {path: '/user', element: <User/>},
    {path: '/user/trash', element: <TrashUser/>},
])

