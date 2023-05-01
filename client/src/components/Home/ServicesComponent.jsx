import { useEffect, useState } from "react";
import { getServices } from "../../services/worker.service";
import "../../css/services-style.css";
import { Link } from "react-router-dom";
const ServicesComponent = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    getServices(setServices);
  }, []);
  return (
    <div className="sservice-main">
      <h4 className="sservice-heading">Services</h4>
      <div className="row sservices">
        {services.map((item) => {
          return (
            <div key={item.service} className="col-md-3">
              <Link to={"/services/" + item.service}>
                <img
                  className="sservice-image"
                  src={"/images/" + item.service + ".jpg"}
                />
              </Link>
              <div className="sservice-title">{item.service}</div>
              <div className="sservice-price row">
                <div className="col"> Avg Price {item.price}</div>
                <div className="col"> Count {item.count}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesComponent;
