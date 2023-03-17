import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { getAllListings } from "../../services/listings.service";
import { generateImagePath } from "../../utils/utils";

const ListingsComponent = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getAllListings(setList);
  }, []);
  return (
    <div className="row">
      {list.RentalListings?.map((item) => {
        return (
          <div className="col-md-4 mb-5" key={item._id}>
            <img
              src={generateImagePath(
                "rentalimages/" + item.imageUrls[0].imagePath
              )}
              style={{ width: "100%", height: "400px" }}
            />
            <div>{item.title}</div>
            <div className="text-nowrap text-truncate">{item.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ListingsComponent;
