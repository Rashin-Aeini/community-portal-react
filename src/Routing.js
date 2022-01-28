import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Admin/Dashboard";
import AdminIndex from "./Admin/AdminIndex";
import AdminPostIndex from "./Admin/Post/AdminPostIndex";
import AdminPostCreate from "./Admin/Post/AdminPostCreate";
import AdminCategoryIndex from "./Admin/Category/AdminCategoryIndex";
import AdminPostUpdate from "./Admin/Post/AdminPostUpdate";
import AdminMenuIndex from "./Admin/Menu/AdminMenuIndex";
import Login from "./Identity/Login";
import HomePage from "./HomePage";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />}>
                    <Route path="page/:number" element={<HomePage />} />
                    <Route path="category/:category" element={<HomePage />} >
                        <Route path="page/:number" element={<HomePage />} />
                    </Route>
                    <Route path="login" element={<Login />} />
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