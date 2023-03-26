import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRentalDetails } from "../services/listings.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bookProperty } from "../services/booking.service";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const BookPropertyPage = () => {
  let { id } = useParams();
  const [model, setModel] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
    comment: "",
    propertyId: id,
    totalGuests: 1,
  });

  const [data, setData] = useState();
  useEffect(() => {
    getRentalDetails(id, setData);
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    bookProperty(model);
  };
  return data ? (
    <>
      <div>
        {/* Add details */}
        <Card>
          <Card.Header>{data.title}</Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroupItem>
                <strong>Property Type:</strong> {data.propertyType}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Location:</strong> {data.location}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Price:</strong> {data.price}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Bedrooms:</strong> {data.bedrooms}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Bathrooms:</strong> {data.bathrooms}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Available Date:</strong> {data.availableDate}
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="checkIn">Check In</label>
            <DatePicker
              className="form-control"
              selected={model.checkIn}
              onChange={(date) => setModel({ ...model, checkIn: date })}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="checkOut">Check Out</label>
            <DatePicker
              className="form-control"
              selected={model.checkOut}
              onChange={(date) => setModel({ ...model, checkOut: date })}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="totalGuests">Total Guests</label>
            <input
              type="number"
              className="form-control"
              value={model.totalGuests}
              onChange={(e) =>
                setModel({ ...model, totalGuests: e.target.value })
              }
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="checkOut">Comment</label>
            <textarea
              maxLength={100}
              className="form-control"
              value={model.comment}
              onChange={(e) => setModel({ ...model, comment: e.target.value })}
            ></textarea>
          </div>
          <div className="form-group col-md-6">
            <button className="btn btn-primary">Place Booking</button>
          </div>
        </div>
      </form>
    </>
  ) : (
    <div>Loading....</div>
  );
};

export default BookPropertyPage;