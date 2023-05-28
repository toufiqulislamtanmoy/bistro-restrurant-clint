import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import slide1 from "../../../assets/home/slide1.jpg"
import slide2 from "../../../assets/home/slide2.jpg"
import slide3 from "../../../assets/home/slide3.jpg"
import slide4 from "../../../assets/home/slide4.jpg"
import slide5 from "../../../assets/home/slide5.jpg"
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
const Category = () => {
    return (
        <section className="my-24">
            <SectionTitle subtitle="From 11:00am to 10:00pm" title="ORDER ONLINE"/>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={slide1} alt="" />
                    <h3 className="text-4xl -mt-16 uppercase font-bold text-center shadow-2xl text-white">Salad</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="" />
                    <h3 className="text-4xl -mt-16 uppercase font-bold text-center shadow-2xl text-white">Pizza</h3>

                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="" />
                    <h3 className="text-4xl -mt-16 uppercase font-bold text-center shadow-2xl text-white">Soup</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="" />
                    <h3 className="text-4xl -mt-16 uppercase font-bold text-center shadow-2xl text-white">Desert</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="" />
                    <h3 className="text-4xl -mt-16 uppercase font-bold text-center shadow-2xl text-white">Salad</h3>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;