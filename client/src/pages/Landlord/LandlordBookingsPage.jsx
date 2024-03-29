import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { bookingsForLandlord } from "../../services/property-booking.service";
import { generateImagePath } from "../../utils/utils";

const LandlordBookingsPage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    bookingsForLandlord(setList);
  }, []);

  return (
    <div>
      <h3 className="text-center">My Bookings</h3>

      {list.map((item) => {
        return (
          <Card className="mb-3" key={item._id}>
            <Card.Body className="row">
              <div className="col-md-2">
                {item.property.imageUrls && (
                  <img
                    src={generateImagePath(
                      item.property.imageUrls[0].imagePath
                    )}
                    style={{ height: "150px", width: "100%" }}
                  />
                )}
              </div>

              <div className="col-md-4">
                <div>
                  <span className="font-weight-bold">Title:</span>{" "}
                  {item.property?.title}
                </div>
                <div>
                  <span className="font-weight-bold">Booked By:</span>{" "}
                  {item.bookedBy?.fullname}
                </div>
                <div>
                  <span className="font-weight-bold">Location:</span>{" "}
                  {item.property?.address.city} ,{" "}
                  {item.property?.address?.state}
                </div>
                <div>
                  <span className="font-weight-bold">Check In:</span>{" "}
                  <Moment format="d-MMM-yyyy">{item.checkIn}</Moment>
                </div>
                <div>
                  <span className="font-weight-bold">Check Out:</span>{" "}
                  <Moment format="d-MMM-yyyy">{item.checkOut}</Moment>
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <span className="font-weight-bold">Booking Id:</span>{" "}
                  {item.bookingId}
                </div>
                <div>
                  {" "}
                  <span className="font-weight-bold">Total Guests:</span>{" "}
                  {item.totalGuests}
                </div>

                <div>
                  {" "}
                  <span className="font-weight-bold">Price:</span>{" "}
                  {item.property?.price}
                </div>
                <div>
                  {" "}
                  <span className="font-weight-bold">Total Price:</span>{" "}
                  {item.totalPrice}
                </div>
                <div>
                  {" "}
                  <span className="font-weight-bold">Payment Status:</span>{" "}
                  {item.paymentStatus}
                </div>
              </div>
              <div className="col-md-2">
                <Link
                  className="btn btn-primary"
                  to={"/landlord/booking/" + item._id}
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

export default LandlordBookingsPage;
