import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import skincare from "../../assets/img/skincare.jpg"
import slide1 from "../../assets/img/slide1.jpg"
import slide2 from "../../assets/img/slide2.jpg"
import slide3 from "../../assets/img/slide3.png"
import slide4 from "../../assets/img/slide4.jpg"




export default function SilidingBar() {
    const imagesSliding = [
        {img: skincare },
        {img: slide1 },
        {img: slide2 },
        {img: slide3 },
        {img: slide4 },
    ];

    return (
        <div className="pt-18 w-screen h-[50vh]">
            <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000} showStatus={false}>
                {imagesSliding.map((item, index) => (
                    <div key={index} className="w-full h-[50vh]">
                        <img className="w-full h-full object-cover" src={item.img} alt={`Slide ${index +1}`} />

                    </div>
                ))}
            </Carousel>
        </div>
    );
}