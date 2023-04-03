import { useEffect, useState } from "react";
import { getListings } from "../../services/listings.service";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Card } from "react-bootstrap";
import { generateImagePath } from "../../utils/utils";

const RentalListingsPage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getListings(setList);
  }, []);

  return (
    <div>
      <h3 className="text-center">Rental Listings</h3>

      {list.map((item) => {
        return (
          <Card className="mb-3" key={item._id}>
            <Card.Body className="row">
              <div className="col-md-2">
                {item.imageUrls.length > 0 && (
                  <img
                    src={generateImagePath(item.imageUrls[0].imagePath)}
                    style={{ height: "150px", width: "100%" }}
                  />
                )}
              </div>

              <div className="col-md-4">
                <div>
                  <span className="font-weight-bold">Title:</span> {item.title}
                </div>
                <div>
                  <span className="font-weight-bold">Property Type:</span>{" "}
                  {item.propertyType}
                </div>
                <div>
                  <span className="font-weight-bold">Location:</span>{" "}
                  {item.address?.state} , {item.address?.city}|
                  {item.address?.landmark}
                </div>
                <div>
                  <span className="font-weight-bold">Available Date:</span>{" "}
                  <Moment format="d-MMM-yyyy">{item.checkIn}</Moment>
                </div>
                <div>
                  {" "}
                  <span className="font-weight-bold">Contact:</span>{" "}
                  {item.contact?.phone} || {item.contact?.email}
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  {" "}
                  <span className="font-weight-bold">Furnished:</span>{" "}
                  {item.amenities?.furnished ? "Yes" : "No"}
                </div>
                <div>
                  {" "}
                  <span className="font-weight-bold">BHK | WC:</span>{" "}
                  {item.amenities?.bedrooms}|{item.amenities?.bathrooms}
                </div>
                <div>
                  {" "}
                  <span className="font-weight-bold">Heating:</span>{" "}
                  {item.amenities?.heating}
                </div>
                <div>
                  {" "}
                  <span className="font-weight-bold">cooling:</span>{" "}
                  {item.amenities?.cooling}
                </div>
                <div>
                  {" "}
                  <span className="font-weight-bold">Price:</span> {item.price}
                </div>
              </div>
              <div className="col-md-2">
                <Link
                  className="btn btn-primary"
                  to={"/landlord/rentalListings/" + item._id}
                  role="button"
                >
                  View Details
                </Link>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default RentalListingsPage;
