import React from "react";
import { Routes as Switch, Route } from "react-router-dom"
import Home from '../pages/Home';
import NotFound from "../pages/NotFound";
import List from "../pages/List";
import Genre from "../pages/Genre";
import MovieDetails from "../pages/MovieDetails";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/topimdb" element={<List />} />
            <Route path="/upcoming" element={<List />} />
            <Route path="/genre/:type/:id" element={<Genre />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="*" element={<NotFound />} />
        </Switch>
    );
}
