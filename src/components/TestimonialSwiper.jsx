import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import "./swiper.css";
import TestimonialData from "../utils/Testimonialdata";
import { Box, Rating, Typography } from "@mui/material";

const TestimonialSwiper = () => {
  return (
    <>
      <Swiper
        spaceBetween={40}
        slidesPerView={2}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        className="mySwiper"
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        {TestimonialData.map((item) => {
          const { id, name, designation, avatar, message, stars } = item;

          return (
            <SwiperSlide key={id}>
              <div className="testimonial-card">
                <div className="test-image">
                  <img src={avatar} alt={name} />
                </div>
                <Box>
                  <Typography
                    fontWeight="bold"
                    color="primary"
                    mb={1}
                    className="Typography name"
                  >
                    {name}
                  </Typography>
                  <Typography className="Typography post text-secondary" mb={1}>
                    {designation}
                  </Typography>
                  <Typography
                    color="gray"
                    mb={2}
                    className="Typography rev-message"
                  >
                    {message}
                  </Typography>
                  <Rating value={stars} precision={0.5} readOnly />
                </Box>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default TestimonialSwiper;
