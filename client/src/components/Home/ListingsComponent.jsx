import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllListings } from "../../services/listings.service";
import ListingsItemComponent from "../Listings/ListingsItemComponent";

const ListingsComponent = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getAllListings(setData);
  }, []);
  return (
    data?.RentalListings?.length > 0 && (
      <div className="latest-products mx-5">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Latest Properties</h2>
              <Link to="/allproperties">
                view all properties <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
          {data.RentalListings?.map((item) => {
            return <ListingsItemComponent key={item._id} item={item} />;
          })}
        </div>
      </div>
    )
  );
};

export default ListingsComponent;
