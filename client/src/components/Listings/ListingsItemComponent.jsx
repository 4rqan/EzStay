import { Link } from "react-router-dom";
import { generateImagePath } from "../../utils/utils";
import "./styles.css";
import { Rating } from "@mui/material";

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
            {item.totalRatings > 0 && (
              <div className="product-rating row">
                <div className="col-md-7">
                  <Rating
                    name="read-only"
                    value={item.averageRating}
                    readOnly
                  />
                </div>
                <div className="reviews col-md-5">
                  Reviews ({item.totalRatings})
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsItemComponent;
