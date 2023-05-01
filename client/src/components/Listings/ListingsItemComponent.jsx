import { Link } from "react-router-dom";
import { generateImagePath } from "../../utils/utils";
import StarRatings from "react-star-ratings";
import "./styles.css";

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
            <div className="col-md-12">
              <div className="product-info">
                {item.totalRatings > 0 && (
                  <div className="product-rating">
                    <ul className="stars">
                      <StarRatings
                        rating={item.averageRating}
                        starRatedColor="#f33f3f"
                        starEmptyColor="#EAEAEA"
                        starDimension="20px"
                        starSpacing="2px"
                        numberOfStars={5}
                        disabled
                      />
                    </ul>
                    <div className="reviews">Reviews ({item.totalRatings})</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsItemComponent;
