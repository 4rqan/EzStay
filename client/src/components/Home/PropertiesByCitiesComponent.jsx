import { useEffect, useState } from "react";
import "../../css/services-style.css";
import { Link } from "react-router-dom";
import { getPropertiesByCities } from "../../services/listings.service";

const PropertiesByCitiesComponent = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getPropertiesByCities(setList);
  }, []);
  return (
    <div className="sservice-main ">
      <h4 className="sservice-heading">Properties By Cities</h4>
      <div className="row sservices">
        {list.map((item) => {
          return (
            <div key={item.cityName} className="col-md-2">
              <Link to="/allproperties" state={{ cityName: item.cityName }}>
                <img
                  className="sservice-image"
                  src={"/images/" + item.cityName + ".jpg"}
                />
              </Link>
              <div className="sservice-title">{item.cityName}</div>
              <div className="sservice-price row">
                <div className="col"> Count {item.count}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertiesByCitiesComponent;
