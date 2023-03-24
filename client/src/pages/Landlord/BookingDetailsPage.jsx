import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getBookingDetails } from "../../services/booking.service";

const BookingDetailsPage = () => {
  let { id } = useParams();

  const [details, setDetails] = useState({});
  useEffect(() => {
    getBookingDetails(id, setDetails);
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="lbl" htmlFor="bookedBy">
              Booked By:
            </label>
            <span className="ml-3" id="bookedBy">
              {details.bookedBy?.email}
            </span>
          </div>

          <div className="mb-3">
            <label className="lbl" htmlFor="title">
              Property Title:
            </label>
            <span className="ml-3" id="title">
              {details.property?.title}
            </span>
          </div>

          <div className="mb-3">
            <label className="lbl" htmlFor="checkIn">
              Check In Date:
            </label>
            <span className="ml-3" id="checkIn">
              {details.checkIn}
            </span>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="lbl" htmlFor="checkOut">
              Check Out Date:
            </label>
            <span className="ml-3" id="checkOut">
              {details.checkOut}
            </span>
          </div>

          <div className="mb-3">
            <label className="lbl" htmlFor="price">
              Price:
            </label>
            <span className="ml-3" id="price">
              {details.property?.price}
            </span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="lbl" htmlFor="totalGuests">
              Total Guests:
            </label>
            <span className="ml-3" id="totalGuests">
              {details.totalGuests}
            </span>
          </div>

          <div className="mb-3">
            <label className="lbl" htmlFor="paymentStatus">
              Payment Status:
            </label>
            <span className="ml-3" id="paymentStatus">
              {details.paymentStatus}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookingDetailsPage;
