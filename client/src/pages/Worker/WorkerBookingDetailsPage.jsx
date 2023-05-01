import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addCommentToServiceBooking,
  getServiceBookingById,
  processServiceRequest,
} from "../../services/worker-bookings.service";
import { generateImagePath } from "../../utils/utils";
import Moment from "react-moment";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { Button, Card, ListGroup, ListGroupItem, Modal } from "react-bootstrap";

const WorkerBookingDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    getServiceBookingById(id, setData);
  }, [id]);

  const [comment, setComment] = useState("");
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
    <>
      <div className="row booking-item mt-5">
        <div className="col-md-3 px-5">
          <img
            className="booking-image"
            src={generateImagePath(data.worker?.imagePath)}
          />
        </div>
        <div className="col-md-3">
          <span className="booking-label">Booked By</span>{" "}
          <div className="booking-label">{data.bookedBy?.fullname}</div>
          <div>
            <span className="booking-label">Daily Rate</span>{" "}
            {data.worker?.dailyRate}
          </div>
          <div>
            <span className="booking-label">Avaliability</span>{" "}
            {data.worker?.availability}
          </div>
          <div className="text-truncate" title={data.worker?.skills.join(",")}>
            <span className="booking-label">Skills</span>{" "}
            {data.worker?.skills.join(",")}
          </div>
        </div>
        <div className="col-md-3">
          <div>
            <span className="booking-label">Start Date</span>{" "}
            <Moment format="d-MMM-yyyy">{data.startDate}</Moment>
          </div>
          <div>
            <span className="booking-label">No of days</span> {data.noOfDays}
          </div>
          <div>
            <span className="booking-label">Work Type</span> {data.workType}
          </div>
          <div>
            <span className="booking-label">Location</span> {data.location}
          </div>
        </div>
        <div className="col-md-3">
          <div>
            <span className="booking-label">Status</span> {data.status}
          </div>
          <div>
            <span className="booking-label">Payment Status</span>{" "}
            {data.paymentStatus}
          </div>
        </div>
        <div className="mb-3">
          <span className="ml-3" id="pbutton">
            {["pending", "confirmed"].includes(data.status) && (
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

      <Card>
        <Card.Body>
          <ListGroup>
            {data.comments?.map((item) => {
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
          {!(data.status == "cancelled" || data.status == "rejected") && (
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
    </>
  );
};

export default WorkerBookingDetailsPage;
