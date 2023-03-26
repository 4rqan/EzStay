import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { addComment, getBookingDetails } from "../services/booking.service";
const MyBookingDetailsPage = () => {
  let { id } = useParams();

  const [comment, setComment] = useState("");
  const [details, setDetails] = useState({});

  const [model, setModel] = useState({
    status: "",
    price: 0,
    comment: "",
    id,
  });
  const addNewComment = () => {
    addComment(id, comment, (data) => {
      setComment("");
      setDetails(data);
    });
  };

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
          <div className="mb-3">
            <label className="lbl" htmlFor="totalPrice">
              Total Price:
            </label>
            <span className="ml-3" id="paymentStatus">
              {details.totalPrice}
            </span>
          </div>
          <div className="mb-3">
            <label className="lbl" htmlFor="status">
              Status:
            </label>
            <span className="ml-3" id="status">
              {details.status}
            </span>
          </div>

          <div className="mb-3">
            <span className="ml-3" id="pbutton"></span>
          </div>
        </div>
      </div>

      <Card>
        <Card.Body>
          <ListGroup>
            {details.comments?.map((item) => {
              return (
                <ListGroupItem key={item._id}>
                  <div className="row">
                    <div className="col-md-2">Furqan</div>
                    <div className="col-md-10">{item.comment}</div>
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
          <div className="row">
            <div className="col-md-8">
              <textarea
                name="comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                rows="10"
                className="form-control"
              ></textarea>
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary" onClick={addNewComment}>
                Add Comment
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyBookingDetailsPage;
