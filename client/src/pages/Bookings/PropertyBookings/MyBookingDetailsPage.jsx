import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
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
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faRupee,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../contexts/AuthContext";

const MyBookingDetailsPage = () => {
  let { id } = useParams();
  const { getDpAndFullName } = useAuth();

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
    <div className="booking-details-container">
      <div className="row mt-3 justify-content-end">
        {details.status === "confirmed" && (
          <div className="col-md-2">
            <button
              className="btn btn-primary"
              onClick={() => setShowPayNowModal(true)}
            >
              Complete the Booking
            </button>
          </div>
        )}
        {(details.status === "pending" || details.status === "confirmed") && (
          <div className="col-md-2">
            <button onClick={cancelBooking} className="btn btn-outline-danger">
              Cancel
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
          <p>
            Rate: <FontAwesomeIcon icon={faIndianRupeeSign} />
            {details.property?.price}
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
    </div>
  );
};

export default MyBookingDetailsPage;
