import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import banners from '../data/banners'

const BannerSlider = () => {
  return (
    <div className="mb-12">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BannerSlider
