import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRentalDetails } from "../services/listings.service";
import { generateImagePath } from "../utils/utils";

const PropertyDetailsPage = () => {
  let { id } = useParams();

  const [data, setData] = useState({});
  useEffect(() => {
    getRentalDetails(id, setData);
  }, [id]);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Property Details</h2>
            </div>
          </div>
          <div className="col-md-6">
            <div className="left-content">
              <h4>{data.title}</h4>
              <p>{data.description}</p>
              <ul className="featured-list">
                <li>{data.propertyType}</li>
                <li>{data.location}</li>
                <li>{data.price}</li>
                <li>{data.bedrooms} BHK</li>
                <li>{data.bathrooms} Bathrooms</li>
                <li>{data.availableDate}</li>
              </ul>
              <a href="about.html" className="filled-button">
                Book Now
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-image">
              {data.imageUrls?.length > 0 && (
                <img src={generateImagePath(data.imageUrls[0].imagePath)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
