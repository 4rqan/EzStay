import { useEffect, useState } from "react";
import { getBookingsForUser } from "../../../services/worker-bookings.service";
import { generateImagePath } from "../../../utils/utils";
import { Link } from "react-router-dom";
import "../../../css/myservices-style.css";
import Moment from "react-moment";

const MyServiceBookingsPage = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getBookingsForUser(setList);
  }, []);
  return (
    <div>
      <h2 className="text-center">Service Bookings</h2>
      {list.map((item) => {
        return (
          <div className="row booking-item mt-5" key={item._id}>
            <div className="col-md-3 px-5">
              <img
                className="booking-image"
                src={generateImagePath(item.worker?.imagePath)}
              />
            </div>
            <div className="col-md-3">
              <div className="booking-label">
                {item.worker?.profileId?.fullname}
              </div>
              <div>
                <span className="booking-label">Daily Rate</span>{" "}
                {item.worker?.dailyRate}
              </div>
              <div>
                <span className="booking-label">Avaliability</span>{" "}
                {item.worker?.availability}
              </div>
              <div
                className="text-truncate"
                title={item.worker?.skills.join(",")}
              >
                <span className="booking-label">Skills</span>{" "}
                {item.worker?.skills.join(",")}
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <span className="booking-label">Start Date</span>{" "}
                <Moment format="d-MMM-yyyy">{item.startDate}</Moment>
              </div>
              <div>
                <span className="booking-label">No of days</span>{" "}
                {item.noOfDays}
              </div>
              <div>
                <span className="booking-label">Work Type</span> {item.workType}
              </div>
              <div>
                <span className="booking-label">Location</span> {item.location}
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <span className="booking-label">Status</span> {item.status}
              </div>
              <div>
                <span className="booking-label">Payment Status</span>{" "}
                {item.paymentStatus}
              </div>
              <Link to={"/myservicebookings/" + item._id} className="p-2">
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyServiceBookingsPage;
