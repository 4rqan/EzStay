import Swal from "sweetalert2";
import axios from "../utils/axios_client";
import { showError } from "../utils/utils";

export const bookWorker = (model, navigate) => {
  axios
    .post("/api/bookworker", model)
    .then(({ data }) => {
      Swal.fire("Booked successfully");
      navigate("/myservicebookings/" + data._id);
    })
    .catch(({ response }) => {
      Swal.fire({ text: response.data, icon: "error" });
    });
};

export const getServiceBookingForUserById = (id, cb) => {
  axios
    .get("/api/workerbookings/foruser/" + id)
    .then(({ data }) => {
      cb(data);
    })
    .catch(showError);
};

export const getServiceBookingForWorkerById = (id, cb) => {
  axios
    .get("/api/workerbookings/forworker/" + id)
    .then(({ data }) => {
      cb(data);
    })
    .catch(showError);
};

export const getServiceBookingsForUser = (cb) => {
  axios.get("/api/servicebookings").then(({ data }) => {
    cb(data);
  });
};

export const getBookingsForWorker = (cb) => {
  axios.get("/api/workerbookings").then(({ data }) => {
    cb(data);
  });
};

export const addCommentToServiceBooking = (id, comment, cb) => {
  axios
    .post("/api/workerbooking/addComment", { id, comment })
    .then(({ data }) => {
      Swal.fire("Comment added.");
      cb(data);
    });
};

export const cancelServiceRequest = (id, cb) => {
  axios.post("/api/workerbooking/cancel", { id }).then(({ data }) => {
    Swal.fire("Booking Cancelled");
    cb(data);
  });
};

export const processServiceRequest = (model, cb) => {
  axios
    .post("/api/workerbooking/process", model)
    .then(({ data }) => {
      Swal.fire("Status updated.");
      cb(data);
    })
    .catch(showError);
};

export const completeWorkerBooking = (bookingId, cb) => {
  axios
    .post("/api/workerbooking/complete", { bookingId })
    .then(({ data }) => {
      Swal.fire("Booking completed.");
      cb(data);
    })
    .catch(showError);
};

export const addAttendance = (model, cb) => {
  axios
    .post("/api/workerbooking/attendance", model)
    .then(({ data }) => {
      Swal.fire("Attendance Added");
      cb(data);
    })
    .catch(showError);
};

export const approveAttendance = (model, cb) => {
  axios
    .put("/api/workerbooking/attendance/approve", model)
    .then(({ data }) => {
      Swal.fire("Attendance Approved");
      cb(data);
    })
    .catch(showError);
};

export const rejectAttendance = (model, cb) => {
  axios
    .put("/api/workerbooking/attendance/reject", model)
    .then(({ data }) => {
      Swal.fire("Attendance Rejected");
      cb(data);
    })
    .catch(showError);
};
