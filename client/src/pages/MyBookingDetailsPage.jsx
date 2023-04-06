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
import { generateImagePath } from "../utils/utils";
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
            <label className="lbl font-weight-bold" htmlFor="title">
              Property Title:
            </label>
            <span className="ml-3" id="title">
              {details.property?.title}
            </span>
          </div>

          <div className="mb-3">
            <label className="lbl " htmlFor="checkIn">
              Property Type:
            </label>
            <span className="ml-3 " id="checkIn">
              {details.property?.propertyType}
            </span>
          </div>
          <div className="mb-3">
            <label className="lbl" htmlFor="totalGuests">
              Furnished:
            </label>
            <span className="ml-3" id="totalGuests">
              {details.property?.amenities?.furnished ? "Yes" : "No"}
            </span>
          </div>

          <div className="mb-3">
            <label className="lbl" htmlFor="paymentStatus">
              Electricity:
            </label>
            <span className="ml-3" id="paymentStatus">
              {details.property?.amenities?.electricityAvailable ? "Yes" : "No"}
            </span>
          </div>
          <div className="mb-3">
            <label className="lbl" htmlFor="totalPrice">
              Water Supply:
            </label>
            <span className="ml-3" id="paymentStatus">
              {details.property?.amenities?.waterAvailable ? "Yes" : "No"}
            </span>
          </div>
          <div className="mb-3">
            <label className="lbl" htmlFor="totalPrice">
              Parking Space:
            </label>
            <span className="ml-3" id="paymentStatus">
              {details.property?.amenities?.parkingSpace ? "Yes" : "No"}
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

        <div className="col-md-6">
          <div className="mb-3">
            <label className="lbl " htmlFor="checkOut">
              Bedrooms:
            </label>
            <span className="ml-3" id="checkOut">
              {details.property?.amenities?.bedrooms}
            </span>
          </div>

          <div className="mb-3">
            <label className="lbl" htmlFor="price">
              Bathrooms:
            </label>
            <span className="ml-3" id="price">
              {details.property?.amenities?.bathrooms}
            </span>
          </div>
          <div className="mb-3">
            <label className="lbl" htmlFor="price">
              Heating:
            </label>
            <span className="ml-3" id="price">
              {details.property?.amenities?.heating}
            </span>
          </div>
          <div className="mb-3">
            <label className="lbl" htmlFor="price">
              Cooling:
            </label>
            <span className="ml-3" id="price">
              {details.property?.amenities?.cooling}
            </span>
          </div>
          <div className="mb-3">
            <label className="lbl" htmlFor="price">
              Check-In Date:
            </label>
            <span className="ml-3" id="price">
              {details.checkIn}
            </span>
          </div>
          <div className="mb-3">
            <label className="lbl" htmlFor="price">
              Check-Out Date:
            </label>
            <span className="ml-3" id="price">
              {details.checkOut}
            </span>
          </div>
          <div className="mb-3">
            <label className="lbl" htmlFor="price">
              Total Guests:
            </label>
            <span className="ml-3" id="price">
              {details.totalGuests}
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
          <div className="mb-3">
            <label className="lbl" htmlFor="price">
              Total Price:
            </label>
            <span className="ml-3" id="price">
              {details.totalPrice}
            </span>
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
                    <div className="col-md-3">
                      <img
                        style={{ height: "40px", width: "40px" }}
                        src={generateImagePath(item.userId.dpPath)}
                      />
                      {item.userId.fullname}
                    </div>
                    <div className="col-md-9">{item.comment}</div>
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
