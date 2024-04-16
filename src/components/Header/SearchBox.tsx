import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../contexts/StateProvider";
import { TmdbService } from "../../services/tmdb.service";
import { MultiMedia } from "../../types/tmdb.type";
import { EndPoints } from "../../utils/endpoints";
import { Lables } from "../../config/SiteData";

interface Props {
    keyword?: string;
}

const SearchBox: React.FC<Props> = ({ keyword = "" }) => {
    const [searching, setSearching] = useContext(StateContext).searchContext;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (keyword.trim() !== "" && keyword.length > 2) {
                    const searchData: MultiMedia[] = await TmdbService.search.multi(keyword, 5);
                    setSearching(searchData);
                } else {
                    setSearching([]);
                }
            } catch (error) {
                console.error("Error fetching search data:", error);
            }
        };

        fetchData();

        // Clean-up function
        return () => {
            setSearching([]); // Reset searching state when component unmounts or keyword changes
        };
    }, [keyword, setSearching]);

    return (
        <div className="suggestions" style={{ display: "block" }}>
            {searching.length > 0 && (
                <div>
                    {searching.map((item: any) => (
                        <Link key={item.id} className="item" to={`/${item.media_type}/${item.id}`}>
                            <div className="poster">
                                <img src={item.poster_path ? `${EndPoints.IMAGE_API}${item.poster_path}` : EndPoints.DEFAULT_POSTER_PATH} alt={item.id.toString()} />
                            </div>
                            <div className="info">
                                <div className="title">{item.name || item.title}</div>
                                <div className="meta">
                                    <span className="imdb">
                                        <i className="fa fa-star"></i> {item.vote_average}
                                    </span>
                                    <i className="dot"></i>
                                    {item.release_date ? item.release_date.slice(0, 4) : item.first_air_date ? item.first_air_date.slice(0, 4) : ""}
                                    <i className="dot"></i>
                                    <i className="type">{item.media_type}</i>
                                </div>
                            </div>
                        </Link>
                    ))}
                    <Link className="more" to={`/search?keyword=${keyword}`}>
                        {Lables.viewallresults} <i className="fa fa-angle-right"></i>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SearchBox;
