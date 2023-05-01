import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import ListingsItemComponent from "../../components/Listings/ListingsItemComponent";
import {
  getAllListings,
  getCities,
  getStates,
} from "../../services/listings.service";
import { useLocation } from "react-router-dom";

const AllPropertiesPage = () => {
  const location = useLocation();

  const [data, setData] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 6,
    stateCode: "JK",
    city: location.state?.cityName || "",
  });

  useEffect(() => {
    getStates(setStates);
  }, []);

  useEffect(() => {
    if (params.stateCode) getCities(params.stateCode, setCities);
    else setCities([]);
  }, [params.stateCode]);

  useEffect(() => {
    getAllListings(
      setData,
      params.pageNo,
      params.pageSize,
      params.stateCode,
      params.city
    );
  }, [params]);

  const renderPaginationButtons = () => {
    if (params.pageSize >= data.totalCount) return null;
    const buttons = [];
    const pageCount = Math.ceil(data.totalCount / params.pageSize);

    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <Pagination.Item
          className={
            "btn ml-2 pl-2 pr-3 btn-" +
            (i === params.pageNo ? "danger" : "primary")
          }
          style={{ width: "20px", height: "20px;" }}
          key={i}
          onClick={() => setParams({ ...params, pageNo: i })}
        >
          {i}
        </Pagination.Item>
      );
    }
    return buttons;
  };
  return (
    <>
      <div className="row m-3 justify-content-center">
        <div className="mb-3 col-md-3" controlId="formState">
          <label>State</label>
          <select
            value={params.stateCode}
            className="form-control"
            onChange={(e) => {
              setParams({
                ...params,
                pageNo: 1,
                city: "",
                stateCode: e.target.value,
              });
            }}
          >
            <option value="">Select State</option>
            {states.map((item) => {
              return (
                <option key={item._id} value={item.isoCode}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-3 col-md-3" controlId="formCity">
          <label>City</label>

          <select
            value={params.city}
            className="form-control"
            onChange={(e) => {
              setParams({
                ...params,
                pageNo: 1,
                city: e.target.value,
              });
            }}
          >
            <option value="">Select Cities</option>
            {cities.map((item) => {
              return (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="latest-products mt-1">
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
