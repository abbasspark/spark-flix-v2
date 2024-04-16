import React, { useState, useEffect, useContext } from "react";
import SearchBox from "./SearchBox";
import { HeaderItems } from "../../config/SiteData";
import { StateContext } from "../../contexts/StateProvider";

interface Params {
    id: number;
    name: string | undefined;
    type: string | undefined;
}

export default function Header(): JSX.Element {
    const [params, setParams] = useState<Params>({ id: 0, name: "", type: "" });
    const pathname = window.location.pathname;
    const [movieGenres] = useContext(StateContext).moviesGenresContext;
    const [tvGenres] = useContext(StateContext).tvGenresContext;

    useEffect(() => {
        if (movieGenres.length > 0 && tvGenres.length > 0 && pathname.split("/").length > 2) {
            let type = pathname.split("/")[2];
            let id = parseInt(pathname.split("/")[3]);
            let currentItem = type === "tv" ? tvGenres.find((x) => x.id === id) : movieGenres.find((x) => x.id === id);

            let name = currentItem?.name;

            setParams({
                id,
                name,
                type,
            });
        }
    }, [movieGenres, tvGenres, pathname]);

    const [keyword, setKeyword] = useState<string>("");

    interface GenreItem {
        id: number;
        name: string;
    }

    function Genres({ data }: any): JSX.Element[] {
        if (data.isTvShow) {
            return tvGenres.map((item: GenreItem) => {
                return (
                    <li key={item.id}>
                        <a
                            title={item.name}
                            href={`/genre/tv/${item.id}`}
                            className={item.id === params.id ? (params.type === "tv" ? "active" : "") : ""}
                        >
                            {item.name}
                        </a>
                    </li>
                );
            });
        } else {
            return movieGenres.map((item: GenreItem) => {
                return (
                    <li key={item.id}>
                        <a
                            title={item.name}
                            href={`/genre/movie/${item.id}`}
                            className={item.id === params.id ? (params.type === "movie" ? "active" : "") : ""}
                        >
                            {item.name}
                        </a>
                    </li>
                );
            });
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setKeyword(event.target.value);
    };

    return (
        <header className="home">
            <div className="container">
                <div id="menu-toggler">
                    <i className="fa fa-list-ul"></i>
                </div>
                <a href="/" id="logo">
                    <h2>Watch Movies Online Free</h2>
                </a>
                <ul id="menu">
                    {HeaderItems.map((item) => {
                        if (item.isMenu) {
                            return (
                                <li key={item.id}>
                                    <a href={item.link}>
                                        {item.name} <i className="fa fa-plus"></i>
                                    </a>
                                    <ul className="genre">
                                        {Genres({ data: item })}
                                    </ul>
                                </li>
                            );
                        }
                        return (
                            <li key={item.id}>
                                <a href={item.link}>{item.name}</a>
                            </li>
                        );
                    })}
                </ul>
                <div id="user">
                    <div className="guest" data-toggle="modal" data-target="#md-login">
                        <i className="fa fa-user-circle"></i>
                        <span>Login/ Register</span>
                    </div>
                </div>
                <div id="search-toggler">
                    <i className="fa fa-search"></i>
                </div>

                <form id="search" autoComplete="off" action="search">
                    <input
                        type="text"
                        name="keyword"
                        placeholder="Enter your keywords..."
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    <button></button> <div className="suggestions"></div>
                    <SearchBox keyword={keyword} />
                </form>
            </div>
        </header>
    );
}
