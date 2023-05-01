import React, { useCallback, useEffect, useState } from "react";

import "./style.css";
import {
  addCommentToServiceBooking,
  cancelServiceRequest,
  completeWorkerBooking,
  getServiceBookingById,
} from "../../../services/worker-bookings.service";
import useRazorpay from "react-razorpay";
import { useParams } from "react-router-dom";
import { generateImagePath } from "../../../utils/utils";
import {
  captureServicePayment,
  createServiceOrder,
} from "../../../services/payment.service";
import Moment from "react-moment";
import { Form, Modal } from "react-bootstrap";
import { getPaymentAccountByProfileId } from "../../../services/payment-account.service";
const MyServiceBookingDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [paymentAccount, setPaymentAccount] = useState(null);

  const [showPayNowModal, setShowPayNowModal] = useState(false);
  const handleClose = () => {
    setShowPayNowModal(false);
  };

  useEffect(() => {
    getBooking();
  }, [id]);

  const getBooking = () => {
    getServiceBookingById(id, setData);
  };

  useEffect(() => {
    if (data?.worker?.profileId?._id)
      getPaymentAccountByProfileId(
        data?.worker?.profileId?._id,
        setPaymentAccount
      );
  }, [data?.worker?.profileId?._id]);

  const RazorPay = useRazorpay();

  const [comment, setComment] = useState("");
  const [payMethod, setPayMethod] = useState("later");
  const addNewComment = () => {
    addCommentToServiceBooking(id, comment, (data) => {
      setComment("");
      setData(data);
    });
  };

  const cancelBooking = () => {
    cancelServiceRequest(id, setData);
  };

  const complete = () => {
    if (payMethod == "later") {
      completeWorkerBooking(id, () => {
        getBooking();
        handleClose();
      });
    } else {
      handlePayment();
    }
  };

  const handlePayment = useCallback(async () => {
    if (paymentAccount) {
      const { data: order } = await createServiceOrder({ bookingId: id });
      const options = {
        key: paymentAccount.keyId,
        amount: order.amount,
        currency: order.currency,
        name: data.worker?.profileId?.fullname,
        description: "Booked the worker " + data.worker?.profileId?.fullname,
        image: generateImagePath(data.worker?.imagePath),
        order_id: order.id,
        handler: async (response) => {
          await captureServicePayment({
            paymentId: response.razorpay_payment_id,
            orderId: order.id,
            bookingId: id,
          });

          getBooking();
          handleClose();
        },
        prefill: {
          name: data.bookedBy?.fullname,
          email: data.bookedBy?.email,
          contact: data.bookedBy?.contactNo,
        },
        notes: {
          address: data.bookedBy?.address?.address1,
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
    data && (
      <div className="booking-details-container">
        <div className="row mt-3 justify-content-end">
          {data.status === "confirmed" && (
            <div className="col-md-2">
              <button
                className="btn btn-primary"
                onClick={() => setShowPayNowModal(true)}
              >
                Complete the Booking
              </button>
            </div>
          )}
          {(data.status === "pending" || data.status === "confirmed") && (
            <div className="col-md-2">
              <button
                onClick={cancelBooking}
                className="btn btn-outline-danger"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="booking-details-header mt-2">
          <img src={generateImagePath(data.worker?.imagePath)} alt="Worker" />
          <div className="booking-details-header-info">
            <h1>{data.worker?.profileId?.fullname}</h1>
            <p>Daily Rate: R {data.worker?.dailyRate} </p>
            <p>Availability: {data.worker?.availability}</p>
            <p>Skills: {data.worker?.skills.join(",")}</p>
          </div>
        </div>
        <div className="row mt-5 p-5">
          <div className="booking-details-content col-md-5">
            <div className="booking-details-info ">
              <div class="form-field">
                <span class="label">Start Date:</span>
                <span class="value">
                  <Moment format="d-MMM-yyyy">{data.startDate}</Moment>
                </span>
              </div>
              <div class="form-field">
                <span class="label">No. of Days:</span>
                <span class="value">{data.noOfDays}</span>
              </div>
              <div class="form-field">
                <span class="label">Work Type:</span>
                <span class="value">{data.workType}</span>
              </div>
              <div class="form-field">
                <span class="label">Location:</span>
                <span class="value">{data.location}</span>
              </div>
              <div class="form-field">
                <span class="label">Booking Status:</span>
                <span class="value">{data.status}</span>
              </div>

              <div class="form-field">
                <span class="label">Payment Status:</span>
                <span class="value">{data.paymentStatus}</span>
              </div>
            </div>
          </div>
          <div className="booking-details-comments col-md-7">
            <h2>Comments</h2>
            <ul>
              {data.comments?.map((item) => {
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
            {!(data.status == "cancelled" || data.status == "rejected") && (
              <div className="comment-add-section">
                <div className="">
                  <img
                    src="/images/electrician.jpg"
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
            <button
              type="button"
              class="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  );
};

export default MyServiceBookingDetailsPage;
