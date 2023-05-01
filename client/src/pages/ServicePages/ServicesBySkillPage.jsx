import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getServicesBySkill } from "../../services/worker.service";
import { generateImagePath } from "../../utils/utils";
import "../../css/services-page.css";

const ServicesBySkillPage = () => {
  const { skill } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getServicesBySkill(skill, setData);
  }, [skill]);
  return (
    <div className="skill-container">
      <h3 className="skill-title text-center">{skill}</h3>
      <div className="skill-row">
        {data.map((item) => {
          return (
            <div className="skill-col">
              <div className="image-container">
                <Link to={"/worker/" + item._id}>
                  <img
                    className="skill-image"
                    src={generateImagePath(item.imagePath)}
                  />
                </Link>
              </div>
              <Link to={"/worker/" + item._id} className="skill-name">
                {item.profileId.fullname}
              </Link>
              <div className="skill-rate">Daily Rate {item.dailyRate}</div>
              <div className="skill-details">{item.skills.join(",")}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesBySkillPage;
