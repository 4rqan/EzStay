import { Link } from "react-router-dom";
import { generateImagePath } from "../../utils/utils";

const ListingsItemComponent = ({ item }) => {
  return (
    <div key={item._id} className="col-md-4">
      <div className="product-item">
        <Link to={"/propertydetails/" + item._id}>
          {item.imageUrls?.length > 0 && (
            <img src={generateImagePath(item.imageUrls[0].imagePath)} alt="" />
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
};

export default ListingsItemComponent;
