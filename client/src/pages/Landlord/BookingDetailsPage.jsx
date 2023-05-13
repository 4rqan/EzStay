import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  addCommentToPropertyBooking,
  getPropertyBookingDetails,
  processPropertyRequest,
} from "../../services/property-booking.service";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { generateImagePath } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import { useAuth } from "../../contexts/AuthContext";

const BookingDetailsPage = () => {
  let { id } = useParams();

  const [comment, setComment] = useState("");
  const [details, setDetails] = useState({});
  const { getDpAndFullName } = useAuth();

  const [model, setModel] = useState({
    status: "",
    price: 0,
    comment: "",
    id,
  });
  const addNewComment = () => {
    addCommentToPropertyBooking(id, comment, (data) => {
      setComment("");
      setDetails(data);
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const process = () => {
    if (!model.status) {
      Swal.fire({ title: "Error", text: "Status is required", icon: "error" });
      return;
    }

    if (model.status == "confirmed") {
      if (model.price == 0) {
        Swal.fire({
          title: "Error",
          text: "Price is required",
          icon: "error",
        });
        return;
      }
    } else {
      model.price = 0;
    }

    processPropertyRequest(model, (data) => {
      handleClose();
      setDetails(data);
      setModel({ status: "", price: 0, comment: "", id });
    });
  };

  useEffect(() => {
    getPropertyBookingDetails(id, setDetails);
  }, []);

  return (
    <div className="booking-details-container">
      <div className="row mt-3 justify-content-end">
        {["pending", "confirmed"].includes(details.status) && (
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={handleShow}>
              Process
            </button>
          </div>
        )}
      </div>
      <div className="row m-2">
        <div className="col-md-3">
          <img
            style={{ height: "300px", width: "100%", borderRadius: "5px" }}
            src={generateImagePath(details.property?.imageUrls[0].imagePath)}
            alt="Property"
          />
        </div>

        <div className=" col-md-4 booking-details-header-info">
          <h1>{details.property?.title}</h1>

          <p>BookingId: {details.bookingId}</p>
          <p>
            Rate: <FontAwesomeIcon icon={faIndianRupeeSign} />
            {details.property?.price}
          </p>
          <p>
            Booked By:
            {details.bookedBy?.fullname}, Email: {details.bookedBy?.email}
          </p>
          <p>Property Type: {details.property?.propertyType}</p>
          <p>
            Location:
            {details.property?.address?.city},{details.property?.address?.state}
            ,{details.property?.address?.pincode}
          </p>
        </div>
        <div className="booking-details-content col-md-5">
          <div className="booking-details-info ">
            <div class="form-field">
              <span class="label">Electricity:</span>
              <span class="value">
                {details.property?.amenities?.electricityAvailable
                  ? "Yes"
                  : "No"}
              </span>
            </div>
            <div class="form-field">
              <span class="label">Furnished:</span>
              <span class="value">
                {details.property?.amenities?.furnished ? "Yes" : "No"}
              </span>
            </div>
            <div class="form-field">
              <span class="label">Water Supply:</span>
              <span class="value">
                {details.property?.amenities?.waterAvailable ? "Yes" : "No"}
              </span>
            </div>
            <div class="form-field">
              <span class="label">Parking Space:</span>
              <span class="value">
                {details.property?.amenities?.parkingSpace ? "Yes" : "No"}
              </span>
            </div>

            <div class="form-field">
              <span class="label">Heating:</span>
              <span class="value">{details.property?.amenities?.heating}</span>
            </div>
            <div class="form-field">
              <span class="label">Cooling:</span>
              <span class="value">{details.property?.amenities?.cooling}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5 p-5">
        <div className="booking-details-content col-md-5">
          <div className="booking-details-info ">
            <div class="form-field">
              <span class="label">Check In:</span>
              <span class="value">
                <Moment format="DD-MMM-yyyy">{details.checkIn}</Moment>
              </span>
            </div>
            <div class="form-field">
              <span class="label">Check Out:</span>
              <span class="value">
                <Moment format="DD-MMM-yyyy">{details.checkOut}</Moment>
              </span>
            </div>
            <div class="form-field">
              <span class="label">Total Guests:</span>
              <span class="value">{details.totalGuests}</span>
            </div>
            <div class="form-field">
              <span class="label">Total Price:</span>
              <span class="value">{details.totalPrice}</span>
            </div>

            <div class="form-field">
              <span class="label">Booking Status:</span>
              <span class="value">{details.status}</span>
            </div>

            <div class="form-field">
              <span class="label">Payment Status:</span>
              <span class="value">{details.paymentStatus}</span>
            </div>
          </div>
        </div>
        <div className="booking-details-comments col-md-7">
          <h2>Comments</h2>
          <ul>
            {details.comments?.map((item) => {
              return (
                <li key={item._id}>
                  <div className="comment-header">
                    <div className="comment-avatar-container">
                      <img
                        src={generateImagePath(item.userId.dpPath)}
                        alt="User"
                        className="comment-avatar"
                      />
                    </div>
                    <h3> {item.userId.fullname}</h3>
                  </div>
                  <p>{item.comment}</p>
                </li>
              );
            })}
          </ul>
          {!(details.status == "cancelled" || details.status == "rejected") && (
            <div className="comment-add-section">
              <div className="">
                <img
                  src={generateImagePath(getDpAndFullName()?.dpPath)}
                  alt="User"
                  className="comment-avatar"
                />
              </div>
              <div className="px-3 col-md-9">
                <input
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Add a comment"
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  onClick={addNewComment}
                  className="btn btn-primary"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={model.status}
              onChange={(e) => {
                setModel({ ...model, status: e.target.value });
              }}
            >
              <option value="">Select Status</option>
              <option value="confirmed">Confirm</option>
              <option value="rejected">Reject</option>
            </Form.Select>
          </Form.Group>
          {model.status == "confirmed" && (
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <input
                type="number"
                class="form-control"
                value={model.price}
                onChange={(e) => {
                  setModel({ ...model, price: e.target.value });
                }}
              />
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <textarea
              class="form-control"
              value={model.comment}
              onChange={(e) => {
                setModel({ ...model, comment: e.target.value });
              }}
            ></textarea>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={process}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingDetailsPage;
