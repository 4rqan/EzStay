import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { getRentalDetails } from "../../services/listings.service";

const RentalDetailsPage = () => {
  let { id } = useParams();

  const [details, setDetails] = useState({});
  useEffect(() => {
    getRentalDetails(id, setDetails);
  });

  return (
    <Container>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="lbl" htmlFor="title">
              Title:
            </label>
            <span className="ml-3" id="title">
              {details.title}
            </span>
          </div>

          <div className="mb-3">
            <label className="lbl" htmlFor="description">
              Description:
            </label>
            <span className="ml-3" id="description">
              {details.description}
            </span>
          </div>

          <div className="mb-3">
            <label className="lbl" htmlFor="propertyType">
              Property Type:
            </label>
            <span className="ml-3" id="propertyType">
              {details.propertyType}
            </span>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="lbl" htmlFor="location">
              Location:
            </label>
            <span className="ml-3" id="location">
              {details.location}
            </span>
          </div>

          <div className="mb-3">
            <label className="lbl" htmlFor="price">
              Price:
            </label>
            <span className="ml-3" id="price">
              {details.price}
            </span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="lbl" htmlFor="bedrooms">
              Bedrooms:
            </label>
            <span className="ml-3" id="bedrooms">
              {details.bedrooms}
            </span>
          </div>

          <div className="mb-3">
            <label className="lbl" htmlFor="bathrooms">
              Bathrooms:
            </label>
            <span className="ml-3" id="bathrooms">
              {details.bathrooms}
            </span>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="lbl" htmlFor="availableDate">
              Available Date:
            </label>
            <span className="ml-3" id="availableDate">
              {details.availableDate}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RentalDetailsPage;
