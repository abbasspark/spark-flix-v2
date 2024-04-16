import React from "react";
import { Routes as Switch, Route } from "react-router-dom"
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from "../pages/NotFound";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
        </Switch>
    );
}
