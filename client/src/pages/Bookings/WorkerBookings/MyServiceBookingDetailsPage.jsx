import React, { useCallback, useEffect, useState } from "react";

import "./style.css";
import {
  addCommentToServiceBooking,
  approveAttendance,
  cancelServiceRequest,
  completeWorkerBooking,
  getServiceBookingForUserById,
  rejectAttendance,
} from "../../../services/worker-bookings.service";
import useRazorpay from "react-razorpay";
import { useParams } from "react-router-dom";
import { generateImagePath } from "../../../utils/utils";
import {
  captureServicePayment,
  createServiceOrder,
} from "../../../services/payment.service";
import Moment from "react-moment";
import {
  Button,
  ButtonGroup,
  Container,
  Dropdown,
  Form,
  Modal,
  Tab,
  Tabs,
} from "react-bootstrap";
import { getPaymentAccountByProfileId } from "../../../services/payment-account.service";
import { IconButton, Tooltip } from "@mui/material";
import { Comment } from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";
const MyServiceBookingDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [paymentAccount, setPaymentAccount] = useState(null);

  const { getDpAndFullName } = useAuth();

  const [showPayNowModal, setShowPayNowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [rejectData, setRejectData] = useState({
    bookingId: id,
    userComment: "",
    attendanceId: "",
  });

  const [key, setKey] = useState("booking");
  const handleClose = () => {
    setShowPayNowModal(false);
  };

  useEffect(() => {
    getBooking();
  }, [id]);

  const getBooking = () => {
    getServiceBookingForUserById(id, setData);
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
      <Container className="mt-3">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="booking" title="Booking">
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

                {data.status === "completed" &&
                  data.paymentStatus == "pay later" && (
                    <div className="col-md-2">
                      <button
                        className="btn btn-primary"
                        onClick={handlePayment}
                      >
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
              <div className="booking-details-header mt-2">
                <img
                  src={generateImagePath(data.worker?.imagePath)}
                  alt="Worker"
                />
                <div className="booking-details-header-info">
                  <h1>{data.worker?.profileId?.fullname}</h1>
                  <p>BookingId: {data.bookingId}</p>
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
                        <Moment format="DD-MMM-yyyy">{data.startDate}</Moment>
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
                  {!(
                    data.status == "cancelled" || data.status == "rejected"
                  ) && (
                    <div className="comment-add-section">
                      <div className="">
                        <img
                          src={generateImagePath(getDpAndFullName().dpPath)}
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

              <Modal
                show={showRejectModal}
                onHide={() => {
                  setShowRejectModal(false);
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Reject Attendance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div className="p-2">
                      <textarea
                        value={rejectData.userComment}
                        className="form-control"
                        onChange={(e) => {
                          setRejectData({
                            ...rejectData,
                            userComment: e.target.value,
                          });
                        }}
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      rejectAttendance(rejectData, (d) => {
                        setData({
                          ...data,
                          attendance: d.attendance,
                        });

                        setRejectData({ bookingId: id });
                        setShowRejectModal(false);
                      });
                    }}
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => {
                      setShowRejectModal(false);
                    }}
                  >
                    Close
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </Tab>
          <Tab eventKey="attendance" title="Attendance">
            {data?.status == "completed" ? (
              <table className="table">
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>No Of Hours</td>
                    <td>Last Modified</td>
                    <td>Status</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {data?.attendance.map((item) => {
                    return (
                      <tr>
                        <td>
                          <Moment format="DD-MMM-yyyy">{item.date}</Moment>
                        </td>
                        <td>{item.workingHours}</td>
                        <td>
                          <Moment format="DD-MMM-yyyy hh:mm:ss A">
                            {item.modifiedDate}
                          </Moment>
                        </td>
                        <td>
                          {item.approvalStatus}{" "}
                          {item.userComment && (
                            <Tooltip title={item.userComment}>
                              <IconButton>
                                <Comment />
                              </IconButton>
                            </Tooltip>
                          )}
                        </td>
                        <td>
                          <Dropdown as={ButtonGroup}>
                            <Button variant="success">Action</Button>

                            <Dropdown.Toggle
                              split
                              variant="success"
                              id="dropdown-split-basic"
                            />

                            <Dropdown.Menu>
                              {item.approvalStatus != "rejected" && (
                                <Dropdown.Item
                                  onClick={() => {
                                    setShowRejectModal(true);
                                    setRejectData({
                                      bookingId: id,
                                      attendanceId: item._id,
                                    });
                                  }}
                                >
                                  Reject
                                </Dropdown.Item>
                              )}
                              {item.approvalStatus != "approved" && (
                                <Dropdown.Item
                                  onClick={() => {
                                    approveAttendance(
                                      {
                                        bookingId: id,
                                        attendanceId: item._id,
                                      },
                                      (d) => {
                                        setData({
                                          ...data,
                                          attendance: d.attendance,
                                        });
                                      }
                                    );
                                  }}
                                >
                                  Approve
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="row justify-content-center align-items-center">
                <p>This Feature is disabled</p>
                <p>Please complete the Booking</p>
              </div>
            )}
          </Tab>
        </Tabs>
        <div>
          <p className="text-primary row justify-content-center align-items-center">
            NOTE: The remuneration offered may vary depending on the nature and
            duration of the work.
          </p>
        </div>
      </Container>
    )
  );
};

export default MyServiceBookingDetailsPage;
