import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkerDetailsById } from "../../services/worker.service";
import { generateImagePath } from "../../utils/utils";
import "../../css/worker-style.css";
import LoginModal from "../../components/LoginModal";
import WorkerBookNowComponet from "../../components/WorkerBookNowComponet";
import { useAuth } from "../../contexts/AuthContext";

const WorkerDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [showBookNowModal, setShowBookNowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { isAuthenticated } = useAuth();

  const handleBookNowClick = () => {
    if (isAuthenticated()) {
      setShowBookNowModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    getWorkerDetailsById(id, setData);
  }, [id]);

  return (
    <div className="worker-details-page">
      <div className="worker-img">
        <img
          src={generateImagePath(data.imagePath)}
          alt={data.profileId?.fullname}
        />
      </div>
      <div className="worker-details">
        <h3>Details</h3>
        <div>
          <span>Name:</span> <span>{data.profileId?.fullname}</span>
        </div>
        <div>
          <span>Daily Rate:</span> <span>{data.dailyRate}</span>
        </div>
        <div>
          <span>Availability:</span> <span>{data.availability}</span>
        </div>
      </div>
      <div className="worker-skills">
        <h3>Skills</h3>
        <ul>
          {data.skills?.map((skill) => {
            return <li key={skill}>{skill}</li>;
          })}
        </ul>
      </div>
      <div className="worker-address">
        <h3>Address</h3>
        <div>
          <span>Address:</span>{" "}
          <span>
            {data.profileId?.address?.address1},{" "}
            {data.profileId?.address?.address2}
          </span>
        </div>
        <div>
          <span>State:</span> <span>{data.profileId?.address?.state}</span>
        </div>
        <div>
          <span>City:</span> <span>{data.profileId?.address?.city}</span>
        </div>
        <div>
          <span>Landmark:</span>{" "}
          <span>{data.profileId?.address?.landmark}</span>
        </div>
        <div>
          <span>Pincode:</span> <span>{data.profileId?.address?.pincode}</span>
        </div>
      </div>
      <div className="worker-book-now">
        <button onClick={handleBookNowClick}>Book Now</button>
        <LoginModal
          show={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={() => {
            setShowLoginModal(false);
            setShowBookNowModal(true);
          }}
        />
        <WorkerBookNowComponet
          workerId={id}
          show={showBookNowModal}
          onClose={() => setShowBookNowModal(false)}
        />
      </div>
    </div>
  );
};

export default WorkerDetailsPage;
