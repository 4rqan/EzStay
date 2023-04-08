import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import ListingsItemComponent from "../components/Listings/ListingsItemComponent";
import { getAllListings } from "../services/listings.service";

const AllPropertiesPage = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, _] = useState(6);

  useEffect(() => {
    getAllListings(setData, pageNo, pageSize);
  }, [pageNo, pageSize]);

  const renderPaginationButtons = () => {
    if (pageSize >= data.totalCount) return null;
    const buttons = [];
    const pageCount = Math.ceil(data.totalCount / pageSize);

    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <Pagination.Item
          className={
            "btn ml-2 pl-2 pr-3 btn-" + (i === pageNo ? "danger" : "primary")
          }
          style={{ width: "20px", height: "20px;" }}
          key={i}
          onClick={() => setPageNo(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return buttons;
  };
  return (
    <>
      <div className="latest-products">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>Latest Properties</h2>
              </div>
            </div>
            {data.RentalListings?.map((item) => {
              return <ListingsItemComponent key={item._id} item={item} />;
            })}
          </div>
        </div>
      </div>

      <div className="m-2 row justify-content-center">
        {renderPaginationButtons()}
      </div>
    </>
  );
};

export default AllPropertiesPage;
