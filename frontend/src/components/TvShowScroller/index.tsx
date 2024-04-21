import React from "react";
import { Link } from "react-router-dom";
import Tootipster from "../ToolTip";
import { EndPoints } from "../../utils/endpoints";
export default function TvShowScroller({ data, category }: any) {
  return (
    <div className="content">
      <div className="filmlist ">
        {data.map((item: any) => (
          <div key={item.id} className="item tooltipstered" id={`tooltipster-${category}-${item.id}`}>
            <Link to={`/tv/${item.id}`} className="poster">
              <img src={item.poster_path ? `${EndPoints.IMAGE_API}${item.poster_path}` : EndPoints.DEFAULT_POSTER_PATH} alt={item.id} />
            </Link>
            <span className="imdb">
              <i className="fa fa-star"></i> {item.vote_average}
            </span>
            <h3>
              <Link className="title" to={`/tv/${item.id}`}>
                {item.name}
              </Link>
            </h3>
            <div className="meta">
              {item.first_air_date}
            </div>
            {item && <Tootipster item={item} category={category} />}
          </div>
        ))}
        <div className="clearfix"></div>
      </div>
    </div>
  );
}
