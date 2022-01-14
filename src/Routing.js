import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Admin/Dashboard";
import Index from "./Admin/Index";
import { Index as PostAdminIndex } from "./Admin/Post/Index";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Dashboard />}>
                    <Route exact path="index" element={<Index />} />
                    <Route path="post" element={<PostAdminIndex />}>
                        <Route path=":id" element />
                        <Route path="create" element />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing