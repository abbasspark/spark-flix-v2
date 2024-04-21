import React from "react";
import { Link } from "react-router-dom";
import Tootipster from "../ToolTip";
import { EndPoints } from "../../utils/endpoints";

export default function MovieScroller({ data, category }: any) {
  console.log("🚀 ~ MovieScroller ~ data:", data)
  return (
    <div className="content">
      <div className="filmlist ">
        {data.map((item: any) => (
          <div key={item.id} id={`tooltipster-${category}-${item.id}`} className={`item tooltipster-${item.id}`}>
            <Link to={`/movie/${item.id}`} className="poster">
              <img src={item.poster_path ? `${EndPoints.IMAGE_API}${item.poster_path}` : EndPoints.DEFAULT_POSTER_PATH} alt={item.id} />
            </Link>

            <span className="imdb">
              <i className="fa fa-star"></i> {item.vote_average}
            </span>
            <h3>
              <Link to={`/movie/${item.id}`} className="title">
                {item.title}
              </Link>
            </h3>
            <div className="meta">
              {item.release_date ? item.release_date : ""} {/*<i className="dot"></i> {item.runtime} min{" "}*/}
            </div>
            {item && <Tootipster item={item} category={category} />}
          </div>
        ))}

        <div className="clearfix"></div>
      </div>
    </div>
  );
}
