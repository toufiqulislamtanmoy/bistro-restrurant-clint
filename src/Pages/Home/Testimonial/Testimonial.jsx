import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import quataion from "../../../assets/home/right-quotation-mark.png"
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";


const Testimonial = () => {
    const [review, setReview] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/reviews').then(res => res.json()).then(data => setReview(data));
    }, [])
    return (
        <section className="my-24">
            <div className="w-full">
                <SectionTitle color="text-black" subtitle="What Our Clients Say" title="TESTIMONIALS" />
            </div>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    review.map(singleReview => <SwiperSlide key={singleReview._id}>
                        <div className="flex flex-col items-center mx-24 my-16">
                            <img src={quataion} alt="" />
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={3}
                                readOnly
                            />

                            <p className="py-8">{singleReview.details}</p>
                            <h3 className="text-2xl text-orange-400">{singleReview.name}</h3>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </section>
    );
};

export default Testimonial;