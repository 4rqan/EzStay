import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { bookWorker } from "../services/worker-bookings.service";
import { useNavigate } from "react-router-dom";

const WorkerBookNowComponent = ({ show, onClose, workerId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    data.worker = workerId;
    bookWorker(data, navigate);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Now</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group>
            <Form.Label>Work Type</Form.Label>
            <Form.Control
              {...register("workType", { required: true })}
              type="text"
              placeholder="Enter Work type"
            />
            {errors.worktype && (
              <span className="text-danger">Work type is required</span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              {...register("location", { required: true })}
              type="text"
              placeholder="Enter Location"
            />
            {errors.location && (
              <span className="text-danger">Location is required</span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>No of Days</Form.Label>
            <Form.Control
              {...register("noOfDays", { required: true })}
              type="number"
              placeholder="Enter No of Days"
            />
            {errors.noOfDays && (
              <span className="text-danger">No of Days is required</span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              {...register("startDate", { required: true })}
              type="date"
              placeholder="Enter Start Date"
            />
            {errors.startDate && (
              <span className="text-danger">No of Days is required</span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <textarea class="form-control" {...register("comment")}></textarea>
          </Form.Group>
          <Form.Group>
            <button className="btn btn-primary mt-2">Book</button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default WorkerBookNowComponent;
