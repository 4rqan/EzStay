import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addAttendance,
  addCommentToServiceBooking,
  getServiceBookingForWorkerById,
  processServiceRequest,
} from "../../services/worker-bookings.service";
import { generateImagePath } from "../../utils/utils";
import Moment from "react-moment";
import Form from "react-bootstrap/Form";
import "./style.css";
import Swal from "sweetalert2";
import { Button, Container, Modal, Tab, Tabs } from "react-bootstrap";
import { Comment } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

const WorkerBookingDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    getServiceBookingForWorkerById(id, setData);
  }, [id]);

  const [comment, setComment] = useState("");
  const { getDpAndFullName } = useAuth();
  const addNewComment = () => {
    addCommentToServiceBooking(id, comment, (data) => {
      setComment("");
      setData(data);
    });
  };
  const [model, setModel] = useState({
    status: "",
    price: 0,
    comment: "",
    id,
  });

  const [attendanceModel, setAttendance] = useState({
    date: "",
    workingHours: 8,
    id,
  });

  const [key, setKey] = useState("booking");

  useEffect(() => {
    const price = data?.totalPrice || data?.noOfDays * data?.worker?.dailyRate;
    setModel({ ...model, price });
  }, [data]);

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

    processServiceRequest(model, (data) => {
      handleClose();
      setData(data);
      setModel({ status: "", price: 0, comment: "", id });
    });
  };

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
                {["pending", "confirmed"].includes(data.status) && (
                  <div className="col-md-2">
                    <button className="btn btn-primary" onClick={handleShow}>
                      Process
                    </button>
                  </div>
                )}

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
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={process}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="booking-details-header mt-2">
                <img
                  src={generateImagePath(data.worker?.imagePath)}
                  alt="Worker"
                />
                <div className="booking-details-header-info">
                  <h1>{data.worker?.profileId?.fullname}</h1>
                  <p>BookingId: {data.bookingId}</p>
                  <p>Booked By: {data.bookedBy?.fullname} </p>
                  <p>Location: {data.location} </p>
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
                  {!(
                    data.status == "cancelled" || data.status == "rejected"
                  ) && (
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="date"
                        value={attendanceModel.date}
                        className="form-control"
                        onChange={(e) => {
                          setAttendance({
                            ...attendanceModel,
                            date: e.target.value,
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={attendanceModel.workingHours}
                        className="form-control"
                        onChange={(e) => {
                          setAttendance({
                            ...attendanceModel,
                            workingHours: e.target.value,
                          });
                        }}
                      />
                    </td>
                    <td></td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          addAttendance(attendanceModel, (d) => {
                            setData({ ...data, attendance: d.attendance });
                            setAttendance({
                              date: "",
                              workingHours: 8,
                              id,
                            });
                          });
                        }}
                      >
                        Add
                      </button>
                    </td>
                  </tr>

                  {data?.attendance.map((item) => {
                    return (
                      <tr>
                        <td>
                          {" "}
                          <Moment format="d-MMM-yyyy">{item.date}</Moment>
                        </td>
                        <td>{item.workingHours}</td>
                        <td>
                          <Moment format="d-MMM-yyyy hh:mm:ss A">
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div>
                <p>This Feature is disabled</p>
                <p>Please complete the Booking</p>
              </div>
            )}
          </Tab>
        </Tabs>
      </Container>
    )
  );
};

export default WorkerBookingDetailsPage;
