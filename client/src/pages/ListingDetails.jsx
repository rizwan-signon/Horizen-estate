import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ListingDetails = () => {
  const { listingId } = useParams();
  const [listingData, setListingdata] = useState({});
  var settings = {
    dots: true,
    cssEase: "linear",
    autoplay: true,
    fade: true,
    autoplaySpeed: 2000,
    focusOnSelect: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/user/get_listing/${listingId}`);
      const data = await res.json();
      setListingdata(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <div className="max-w-full mt-3">
      <div>
        <Slider {...settings} className=" max-w-7xl mx-auto">
          {listingData.imageUrls?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="not found"
              className="w-full h-[450px] rounded-lg object-cover"
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ListingDetails;
