import React, { useCallback, useEffect, useState } from "react";

import "./style.css";
import {
  addComment,
  cancelServiceRequest,
  getBookingById,
} from "../services/worker-bookings.service";
import useRazorpay from "react-razorpay";
import { useParams } from "react-router-dom";
import { generateImagePath } from "../utils/utils";
import { capturePayment, createOrder } from "../services/payment.service";
import Moment from "react-moment";
function DemoPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    getBookingById(id, setData);
  }, [id]);

  const RazorPay = useRazorpay();

  const [comment, setComment] = useState("");
  const addNewComment = () => {
    addComment(id, comment, (data) => {
      setComment("");
      setData(data);
    });
  };
  const cancelBooking = () => {
    cancelServiceRequest(id, setData);
  };

  const handlePayment = useCallback(async () => {
    if (data) {
      const { data: order } = await createOrder({ bookingId: id });
      const options = {
        key: "rzp_test_NWRvt7rB4wHiAZ",
        amount: order.amount,
        currency: order.currency,
        name: data.worker?.profileId?.fullname,
        description: "Booked the worker " + data.worker?.profileId?.fullname,
        image: generateImagePath(data.worker?.imagePath),
        order_id: order.id,
        handler: async (response) => {
          await capturePayment({
            paymentId: response.razorpay_payment_id,
            orderId: order.id,
            bookingId: id,
          });

          getBookingById(id, setData);
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
  }, [RazorPay, data]);
  return (
    data && (
      <div className="booking-details-container">
        <div className="row mt-3 justify-content-end">
          {data.status === "confirmed" && (
            <div className="col-md-2">
              <button className="btn btn-primary" onClick={handlePayment}>
                Pay Now
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
        <div className="booking-details-header mt-5">
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
              <p>
                Start Date:{" "}
                <Moment format="d-MMM-yyyy">{data.startDate}</Moment>
              </p>
              <p>No. of Days: {data.noOfDays}</p>
              <p>Work Type: {data.workType}</p>
              <p>Location: {data.location}</p>
              <p>Booking Status: {data.status}</p>
              <p>Payment Status: {data.paymentStatus}</p>
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
      </div>
    )
  );
}

export default DemoPage;
