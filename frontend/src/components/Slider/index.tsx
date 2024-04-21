import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules';
// import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';

import { StateContext } from "../../contexts/StateProvider";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EndPoints } from "../../utils/endpoints";
import { Lables } from "../../config/SiteData";


export default function Slider() {
  const [swiper] = useContext(StateContext).swiperContext;
  const [genres] = useContext(StateContext).moviesGenresContext;

  return (
    <div>
      {swiper && (
        <Swiper
          id="slider"
          className="swiper-container"
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
          autoplay={{ delay: 5000, waitForTransition: true }}
          pagination={{ clickable: true }}
          onSlideChange={() => console.log('slide change')}
          grabCursor
          loop
          effect={"coverflow"}
        >
          {swiper.map((item: any, i: number) => (
            <SwiperSlide
              key={item.id}
              className="item swiper-slide lazyloaded"
              style={{
                width: "599",
                backgroundImage: `url(${EndPoints.IMAGE_API}${item.backdrop_path})`,
              }}
            >
              <div className="container">
                <div className="info">
                  <h3 className="title">{item.title}</h3>
                  <div className="meta">
                    <span className="imdb">
                      <i className="fa fa-star"></i> {item.vote_average}
                    </span>
                    <span><i className="fa fa-heart"></i> {item.vote_count} </span>
                    <span>
                      {genres.filter((x) => item.genre_ids.includes(x.id)).map((genre) => (
                        <Link key={genre.id} to={`/genre/movie/${genre.id}`} title={genre.name}>
                          {genre.name},
                        </Link>

                      ))}

                    </span>
                    <span> {item.release_date} </span>
                  </div>
                  <div className="desc">{item.overview}</div>
                  <div className="actions">
                    <Link className="watchnow" to={`/movie/${item.id}`}>
                      <i className="fa fa-play"></i> {Lables.watchNow}
                    </Link>
                    <Link className="bookmark" to=".">
                      <i className="fa fa-heart" style={{ fontWeight: "400" }}></i> {Lables.addToList}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
