import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation } from "swiper/core";
import ClampLines from "react-clamp-lines";

import "swiper/swiper.min.css";
// import "swiper/components/navigation/navigation.min.css";
import "./tagCarousel.scss";

// SwiperCore.use([Navigation]);

type PropTypes = {
  tags: Array<string>;
  currentTag: number;
  setCurrentTag: React.Dispatch<React.SetStateAction<number>>;
};

export default function TagCarousel({
  tags,
  currentTag,
  setCurrentTag,
}: PropTypes) {
  return (
    <div className="tag-carousel-wrapper">
      <Swiper
        slidesPerView={10}
        // width={100}
        slidesOffsetBefore={10}
        navigation={true}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        className="tag-carousel"
      >
        <SwiperSlide
          onClick={() => setCurrentTag(-1)}
          className={
            currentTag === -1
              ? "tag-carousel__slide active"
              : "tag-carousel__slide"
          }
          style={{ width: "auto", padding: "0.5rem 2rem", marginRight: "1rem" }}
        >
          All
        </SwiperSlide>
        {tags.map((tag, i) => (
          <SwiperSlide
            key={"tag" + i}
            onClick={() => setCurrentTag(i)}
            className={
              currentTag === i
                ? "tag-carousel__slide active"
                : "tag-carousel__slide"
            }
            style={{ width: "auto", padding: "0.5rem 2rem" }}
          >
            {/* {tag} */}
            <ClampLines text={tag} id={"tag" + i} lines={1} buttons={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
