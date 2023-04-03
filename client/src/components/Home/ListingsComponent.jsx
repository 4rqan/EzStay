import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllListings } from "../../services/listings.service";
import { generateImagePath } from "../../utils/utils";

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
            return (
              <div key={item._id} className="col-md-4">
                <div className="product-item">
                  <Link to={"/propertydetails/" + item._id}>
                    {item.imageUrls?.length > 0 && (
                      <img
                        src={generateImagePath(item.imageUrls[0].imagePath)}
                        alt=""
                      />
                    )}
                  </Link>
                  <div className="down-content">
                    <div className="row">
                      <div className="col-md-9">
                        <Link to={"/propertydetails/" + item._id}>
                          <h4>{item.title}</h4>
                        </Link>
                      </div>
                      <div className="col-md-3">
                        <h6>₹{item.price}</h6>
                      </div>
                    </div>

                    <p>{item.description}</p>
                    <div className="row">
                      <ul className="stars col-md-7">
                        <li>
                          <i className="fa fa-star"></i>
                        </li>
                        <li>
                          <i className="fa fa-star"></i>
                        </li>
                        <li>
                          <i className="fa fa-star"></i>
                        </li>
                        <li>
                          <i className="fa fa-star"></i>
                        </li>
                        <li>
                          <i className="fa fa-star"></i>
                        </li>
                      </ul>
                      <div className="col-md-5 reviews">Reviews (24)</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    // <div className="row">
    //   {list.RentalListings?.map((item) => {
    //     return (
    //       <div className="col-md-4 mb-5" key={item._id}>
    //         <img
    //           src={generateImagePath(
    //             "rentalimages/" + item.imageUrls[0].imagePath
    //           )}
    //           style={{ width: "100%", height: "400px" }}
    //         />
    //         <div>{item.title}</div>
    //         <div className="text-nowrap text-truncate">{item.description}</div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default ListingsComponent;
