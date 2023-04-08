import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllListings } from "../../services/listings.service";
import ListingsItemComponent from "../Listings/ListingsItemComponent";

const ListingsComponent = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getAllListings(setList);
  }, []);
  return (
    <div className="latest-products">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Latest Properties</h2>
              <Link to="/allproperties">
                view all properties <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
          {list.RentalListings?.map((item) => {
            return <ListingsItemComponent key={item._id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ListingsComponent;
