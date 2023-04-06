import { useEffect, useState } from "react";
import { Card, Carousel, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getRentalDetails } from "../services/listings.service";
import { generateImagePath } from "../utils/utils";

const PropertyDetailsPage = () => {
  let { id } = useParams();

  const [details, setData] = useState();
  useEffect(() => {
    getRentalDetails(id, setData);
  }, [id]);

  return details ? (
    <Container>
      <h3 className="text-center">Property Details</h3>
      <Card>
        <Card.Body className="row">
          <div className="row">
            <div className="col-md-6">
              <div>
                <span className="font-weight-bold">Title:</span> {details.title}
              </div>
              <div className="font-weight-bold">{details.description}</div>
              <div>
                <span className="font-weight-bold">Property Type:</span>{" "}
                {details.propertyType}
                <div>
                  <span className="font-weight-bold">Bedrooms:</span>{" "}
                  {details.amenities?.bedrooms}
                </div>
                <div>
                  <span className="font-weight-bold">bathrooms:</span>{" "}
                  {details.amenities?.bathrooms}
                </div>
                <div>
                  <span className="font-weight-bold">Furnished:</span>{" "}
                  {details.amenities?.furnished ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-weight-bold">Electricity:</span>{" "}
                  {details.amenities?.electricityAvailable ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-weight-bold">24*7 Water Supply:</span>{" "}
                  {details.amenities?.waterAvailable ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-weight-bold">Parking Space:</span>{" "}
                  {details.ameniies?.parkingSpace ? "Yes" : "No"}
                </div>
                <div>
                  {" "}
                  <span className="font-weight-bold">Heating:</span>{" "}
                  {details.amenities?.heating}
                </div>
                <div>
                  <span className="font-weight-bold">Cooling:</span>{" "}
                  {details.amenities?.cooling}
                </div>
              </div>
            </div>
            <Carousel className="col-md-6 mb-5">
              {details.imageUrls?.map((item) => {
                return (
                  <Carousel.Item key={item.imagePath}>
                    <img
                      className="d-block w-100"
                      src={generateImagePath(item.imagePath)}
                      alt={`Image ${item.imagePath}`}
                      style={{ height: "400px", width: "400px" }}
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>

          <div className="col-md-3">
            <div>
              <span className="font-weight-bold">State:</span>{" "}
              {details.address?.state}
            </div>
            <div>
              <span className="font-weight-bold">City:</span>{" "}
              {details.address?.city}
            </div>
            <div>
              <span className="font-weight-bold">Landmark:</span>{" "}
              {details.address?.landmark}
            </div>
            <div>
              <span className="font-weight-bold">House No:</span>{" "}
              {details.address?.houseNo}{" "}
              <span className="font-weight-bold">Pincode:</span>{" "}
              {details.address?.pincode}
            </div>
          </div>

          <div className="col-md-3">
            <div>
              <span className="font-weight-bold">Name:</span>{" "}
              {details.contact?.name}
            </div>
            <div>
              <span className="font-weight-bold">Phone:</span>{" "}
              {details.contact?.phone}
            </div>
            <div>
              <span className="font-weight-bold">Email:</span>{" "}
              {details.contact?.email}
            </div>
          </div>
          <div className="mb-5">
            <Link to={"/bookproperty/" + id} className="filled-button">
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  ) : (
    <div>Loading..............</div>
  );
};

export default PropertyDetailsPage;
