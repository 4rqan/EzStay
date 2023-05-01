import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  addCommentToPropertyBooking,
  cancelPropertyRequest,
  completePropertyBooking,
  getPropertyBookingDetails,
} from "../../../services/property-booking.service";
import { generateImagePath } from "../../../utils/utils";
import { getPaymentAccountByProfileId } from "../../../services/payment-account.service";
import {
  capturePropertyPayment,
  createPropertyOrder,
} from "../../../services/payment.service";
import useRazorpay from "react-razorpay";
const MyBookingDetailsPage = () => {
  let { id } = useParams();

  const [comment, setComment] = useState("");
  const [details, setDetails] = useState({});

  const [paymentAccount, setPaymentAccount] = useState(null);

  const [showPayNowModal, setShowPayNowModal] = useState(false);
  const RazorPay = useRazorpay();
  const [payMethod, setPayMethod] = useState("later");
  const handleClose = () => {
    setShowPayNowModal(false);
  };

  const addNewComment = () => {
    addCommentToPropertyBooking(id, comment, (data) => {
      setComment("");
      setDetails(data);
    });
  };

  useEffect(() => {
    if (details?.property?.owner)
      getPaymentAccountByProfileId(details?.property?.owner, setPaymentAccount);
  }, [details?.property?.owner]);

  const cancelBooking = () => {
    cancelPropertyRequest(id, setDetails);
  };

  useEffect(() => {
    getBooking();
  }, [id]);

  const getBooking = () => {
    getPropertyBookingDetails(id, setDetails);
  };

  const complete = () => {
    if (payMethod == "later") {
      completePropertyBooking(id, () => {
        getBooking();
        handleClose();
      });
    } else {
      handlePayment();
    }
  };

  const handlePayment = useCallback(async () => {
    if (paymentAccount) {
      const { data: order } = await createPropertyOrder({ bookingId: id });
      const options = {
        key: paymentAccount.keyId,
        amount: order.amount,
        currency: order.currency,
        name: details.property?.title,
        description: "Booked the property " + details.property?.title,
        image: generateImagePath(details.property?.imageUrls[0].imagePath),
        order_id: order.id,
        handler: async (response) => {
          await capturePropertyPayment({
            paymentId: response.razorpay_payment_id,
            orderId: order.id,
            bookingId: id,
          });

          getBooking();
          handleClose();
        },
        prefill: {
          name: details.bookedBy?.fullname,
          email: details.bookedBy?.email,
          contact: details.bookedBy?.contactNo,
        },
        notes: {
          address: details.bookedBy?.address?.address1,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new RazorPay(options);
      rzpay.on("payment.failed", async (response) => {
        //write failure Logic
      });
      rzpay.open();
    }
  }, [RazorPay, paymentAccount]);

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
            {(details.status === "pending" ||
              details.status === "confirmed") && (
              <button className="btn btn-primary" onClick={cancelBooking}>
                Cancel Booking
              </button>
            )}
            {details.status === "confirmed" && (
              <button
                className="btn btn-primary"
                onClick={() => setShowPayNowModal(true)}
              >
                Complete the Booking
              </button>
            )}
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

      <Modal show={showPayNowModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Complete Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="ml-3">
              <input
                type="radio"
                className="form-check-input"
                name="payWhen"
                id="payLater"
                value={payMethod}
                onChange={() => {
                  setPayMethod("later");
                }}
              />
              <label className="form-check-label" htmlFor="payLater">
                Pay Later
              </label>
            </div>
            {paymentAccount && (
              <div className="ml-3">
                <input
                  type="radio"
                  className="form-check-input"
                  name="payWhen"
                  id="payNow"
                  value={payMethod}
                  onChange={() => {
                    setPayMethod("now");
                  }}
                />
                <label className="form-check-label" htmlFor="payNow">
                  Pay Now
                </label>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={complete}>
            Complete Booking
          </button>
          <button type="button" class="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

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
          {!(details.status == "cancelled" || details.status == "rejected") && (
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
    </Container>
  );
};

export default MyBookingDetailsPage;
