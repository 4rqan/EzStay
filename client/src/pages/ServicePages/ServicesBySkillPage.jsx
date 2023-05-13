import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getServicesBySkill } from "../../services/worker.service";
import { generateImagePath } from "../../utils/utils";
import "../../css/services-page.css";

const ServicesBySkillPage = () => {
  const { skill } = useParams();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getServicesBySkill(skill, setData);
  }, [skill]);
  return (
    <div className="container">
      <h3 className="skill-title text-center my-3">{skill}</h3>
      <div className="row">
        {data.map((item) => {
          return (
            <div className="col-md-3">
              <div className="skill-col card">
                <div
                  className="image-container"
                  onClick={() => {
                    navigate("/worker/" + item._id);
                  }}
                >
                  <img
                    className="skill-image"
                    src={generateImagePath(item.imagePath)}
                  />
                </div>
                <Link to={"/worker/" + item._id} className="skill-name">
                  {item.profileId.fullname}
                </Link>
                <div className="skill-rate">Daily Rate {item.dailyRate}</div>
                <div className="skill-details">{item.skills.join(",")}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesBySkillPage;
