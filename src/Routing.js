import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./Admin/Dashboard";
import AdminIndex from "./Admin/AdminIndex";
import AdminPostIndex from "./Admin/Post/AdminPostIndex";
import AdminPostCreate from "./Admin/Post/AdminPostCreate";
import AdminCategoryIndex from "./Admin/Category/AdminCategoryIndex";
import AdminPostUpdate from "./Admin/Post/AdminPostUpdate";
import AdminMenuIndex from "./Admin/Menu/AdminMenuIndex";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Outlet />}>
                    <Route path="admin" element={<Dashboard />}>
                        <Route path="index" element={<AdminIndex />} />
                        <Route path="post" element={<AdminPostIndex />}>
                            <Route path=":id" element={<AdminPostUpdate />} />
                            <Route path="create" element={<AdminPostCreate />} />
                        </Route>
                        <Route path="category" element={<AdminCategoryIndex />} />
                        <Route path="menu" element={<AdminMenuIndex />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing