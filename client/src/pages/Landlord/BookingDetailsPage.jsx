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

const BookingDetailsPage = () => {
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
            <label className="lbl" htmlFor="bookedBy">
              Booked By:
            </label>
            <span className="ml-3" id="bookedBy">
              {details.bookedBy?.fullname}
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
          <div className="mb-3">
            <label className="lbl" htmlFor="totalPrice">
              Total Price:
            </label>
            <span className="ml-3" id="paymentStatus">
              {details.totalPrice}
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
            <label className="lbl" htmlFor="status">
              Status:
            </label>
            <span className="ml-3" id="status">
              {details.status}
            </span>
          </div>

          <div className="mb-3">
            <span className="ml-3" id="pbutton">
              {["pending", "confirmed"].includes(details.status) && (
                <Button
                  onClick={handleShow}
                  className="btn btn-primary"
                  role="button"
                >
                  Process
                </Button>
              )}
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
          {!["cancelled", "rejected"].includes(details.status) && (
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
          )}
        </Card.Body>
      </Card>

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
    </Container>
  );
};

export default BookingDetailsPage;
