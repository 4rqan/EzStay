import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const BannerComponent = () => {
  const [index, setIndex] = useState(0);

  const [slider, setSlider] = useState([
    {
      id: 1,
      imagePath: "/images/banner-cover-ezstay.jpg",
      caption1: "Ez Stay",
      caption2: "Find your perfect stay, effortlessly with EzStay.",
    },
    {
      id: 2,
      imagePath: "/images/house-banner.jpg",
      caption1: "Ez Stay",
      caption2: "Where there is a will, there is a way",
    },
  ]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="carousel">
      {slider.map((item) => (
        <Carousel.Item key={item.id} className="carousel-item">
          <img
            className="d-block w-100"
            src={item.imagePath}
            alt="First slide"
          />
          <Carousel.Caption className="caption">
            <h4>{item.caption1}</h4>
            <h2>{item.caption2}</h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
    // <div className="banner header-text">
    //   <div className="owl-banner owl-carousel">
    //     <div className="banner-item-01">
    //       <div className="text-content">
    //         <h4>EzStay</h4>
    //         <h2>Find your perfect stay, effortlessly with EzStay.</h2>
    //       </div>
    //     </div>
    //     {/* <div className="banner-item-02">
    //     <div className="text-content">
    //       <h4>Flash Deals</h4>
    //       <h2>Get your best products</h2>
    //     </div>
    //   </div>
    //   <div className="banner-item-03">
    //     <div className="text-content">
    //       <h4>Last Minute</h4>
    //       <h2>Grab last minute deals</h2>
    //     </div>
    //   </div> */}
    //   </div>
    // </div>
  );
};

export default BannerComponent;
