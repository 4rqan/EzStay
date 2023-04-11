import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  addImage,
  deleteImage,
  getRentalDetails,
  updateListing,
} from "../../services/listings.service";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { generateImagePath } from "../../utils/utils";
import { getCities, getStates } from "../../services/listings.service";

const RentalDetailsPage = () => {
  let { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const inputRef = useRef();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const stateValue = watch("address.state");

  useEffect(() => {
    if (stateValue) getCities(stateValue, setCities);
    else {
      setCities([]);
    }
  }, [stateValue]);
  const [details, setDetails] = useState({
    imageUrls: [],
  });
  useEffect(() => {
    getStates(setStates);
    getData();
  }, []);

  const [key, setKey] = useState("details");

  const getData = () => {
    getRentalDetails(id, setDetails, setDefaultValues);
  };

  const setDefaultValues = (data, prefix = "") => {
    for (let key in data) {
      setValue(key, data[key]);
    }
    setValue("amenities.furnished", data.amenities.furnished.toString());
    setValue(
      "amenities.electricityAvailable",
      data.amenities.electricityAvailable.toString()
    );
    setValue(
      "amenities.waterAvailable",
      data.amenities.waterAvailable.toString()
    );
    setValue("amenities.parkingSpace", data.amenities.parkingSpace.toString());
  };

  const submit = (data) => {
    data.availableDate = details.availableDate;
    updateListing(data, getData);
  };

  return (
    <Container className="mt-3">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="details" title="Details">
          <h3 className="mt-3 mb-2 text-center">{details.title}</h3>
          <Form onSubmit={handleSubmit(submit)}>
            <div className="row">
              <Form.Group className="mb-3 col-md-6" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-danger">Title is required</span>
                )}
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label htmlFor="disabledSelect">Property Type</Form.Label>
                <Form.Select {...register("propertyType", { required: true })}>
                  <option>AirBnb</option>
                  <option>Apartment</option>
                  <option value="House">House</option>
                  <option>Building</option>
                </Form.Select>
                {errors.propertyType && (
                  <span className="text-danger">property Type is required</span>
                )}
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="mb-3 col-md-2" controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    console.log(e);
                  }}
                  {...register("address.state", { required: true })}
                >
                  <option value="">Select State</option>
                  {states.map((item) => {
                    return (
                      <option key={item._id} value={item.isoCode}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>

                {errors.address?.state && (
                  <span className="text-danger">State is required</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 col-md-2" controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    console.log(e);
                  }}
                  {...register("address.city", { required: true })}
                >
                  <option value="">Select Cities</option>
                  {cities.map((item) => {
                    return (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>
                {errors.address?.city && (
                  <span className="text-danger">City is required</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 col-md-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address1"
                  {...register("address.address1", { required: true })}
                />
                {errors.address?.address1 && (
                  <span className="text-danger">Address is required</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 col-md-2" controlId="formHouseNo">
                <Form.Label>House No.</Form.Label>
                <Form.Control
                  type="text"
                  name="houseNo"
                  {...register("address.houseNo", { required: true })}
                />
                {errors.address?.houseNo && (
                  <span className="text-danger">House No is required</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 col-md-2" controlId="formPincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  name="pincode"
                  {...register("address.pincode", { required: true })}
                />
                {errors.address?.pincode && (
                  <span className="text-danger">Pincode is required</span>
                )}
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="col-md-6 mb-3" controlId="formFurnished">
                <Form.Label>Furnished</Form.Label>
                {"  "}
                <Form.Check
                  inline
                  label="Yes"
                  value="true"
                  type="radio"
                  {...register("amenities.furnished", { required: true })}
                />
                <Form.Check
                  inline
                  label="No"
                  value={false}
                  type="radio"
                  {...register("amenities.furnished", { required: true })}
                />
                {errors.amenities?.furnished && (
                  <span className="text-danger">Furnished is required</span>
                )}
              </Form.Group>

              <Form.Group
                className="col-md-6 mb-3"
                controlId="formElectricityAvailable"
              >
                <Form.Label>Electricity Availability</Form.Label>
                {"  "}
                <Form.Check
                  inline
                  label="Yes"
                  value={true}
                  type="radio"
                  {...register("amenities.electricityAvailable", {
                    required: true,
                  })}
                />
                <Form.Check
                  inline
                  label="No"
                  value={false}
                  type="radio"
                  {...register("amenities.electricityAvailable", {
                    required: true,
                  })}
                />

                {errors.amenities?.electricityAvailable && (
                  <span className="text-danger">
                    Electricity Availability is required
                  </span>
                )}
              </Form.Group>

              <Form.Group
                className="col-md-6 mb-3"
                controlId="formWaterAvailability"
              >
                <Form.Label>Water Availabiity</Form.Label>
                {"   "}
                <Form.Check
                  inline
                  label="Yes"
                  value={true}
                  type="radio"
                  {...register("amenities.waterAvailable", {
                    required: true,
                  })}
                />
                <Form.Check
                  inline
                  label="No"
                  value={false}
                  type="radio"
                  {...register("amenities.waterAvailable", {
                    required: true,
                  })}
                />
                {errors.amenities?.waterAvailable && (
                  <span className="text-danger">
                    Water Availability is required
                  </span>
                )}
              </Form.Group>

              <Form.Group
                className="col-md-6 mb-3"
                controlId="formParkingSpace"
              >
                <Form.Label>Parking Space</Form.Label>
                {"   "}
                <Form.Check
                  inline
                  label="yes"
                  value={true}
                  type="radio"
                  {...register("amenities.parkingSpace", {
                    required: true,
                  })}
                />
                <Form.Check
                  inline
                  label="No"
                  value={false}
                  type="radio"
                  {...register("amenities.parkingSpace", {
                    required: true,
                  })}
                />
                {errors.amenities?.parkingSpace && (
                  <span className="text-danger">Parking Space is required</span>
                )}
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="mb-3 col-md-3">
                <Form.Label htmlFor="disabledSelect">Heating</Form.Label>
                <Form.Select
                  {...register("amenities.heating", { required: true })}
                >
                  <option>Central Heating</option>
                  <option>Perimeter Heating</option>
                  <option>Direct Heating</option>
                </Form.Select>
                {errors.amenities?.heating && (
                  <span className="text-danger">Heating Sytem is required</span>
                )}
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label htmlFor="disabledSelect">Cooling</Form.Label>
                <Form.Select
                  {...register("amenities.cooling", { required: true })}
                >
                  <option>Central Air Conditioner</option>
                  <option>Evaporative Air Conditioners</option>
                  <option>fans</option>
                </Form.Select>
                {errors.amenities?.cooling && (
                  <span className="text-danger">
                    Cooling System is required
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 col-md-3" controlId="formBedrooms">
                <Form.Label>Bedrooms</Form.Label>
                <Form.Control
                  type="text"
                  name="bedrooms"
                  {...register("amenities.bedrooms", { required: true })}
                />
                {errors.amenities?.bedrooms && (
                  <span className="text-danger">Bedrooms is required</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 col-md-3" controlId="bathrooms">
                <Form.Label>Bathrooms</Form.Label>
                <Form.Control
                  type="text"
                  name="bathrooms"
                  {...register("amenities.bathrooms", { required: true })}
                />
                {errors.amenities?.bathrooms && (
                  <span className="text-danger">Bathrooms is required</span>
                )}
              </Form.Group>
            </div>
            <div className="row"></div>
            <div className="row">
              <Form.Group className="mb-3 col-md-6" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-danger">Price is required</span>
                )}
              </Form.Group>

              <Form.Group
                className="mb-3 col-md-6"
                controlId="formAvailableDate"
              >
                <Form.Label>Available Date</Form.Label>
                <DatePicker
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  // selected={details.availableDate}
                  onChange={(date) =>
                    setDetails({ ...details, availableDate: date })
                  }
                />
                {errors.availableDate && (
                  <span className="text-danger">
                    Available Date is required
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  {...register("contact.name", { required: true })}
                />
                {errors.contact?.name && (
                  <span className="text-danger">Name is required</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  {...register("contact.email", { required: true })}
                />
                {errors.contact?.email && (
                  <span className="text-danger">Email is required</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 col-md-4" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  name="phone"
                  {...register("contact.phone", { required: true })}
                />
                {errors.contact?.phone && (
                  <span className="text-danger">Phone is required</span>
                )}
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="mb-3 col-md-6" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span className="text-danger">Description is required</span>
                )}
              </Form.Group>
            </div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="Images" title="Images">
          <div className="row">
            {details.imageUrls.map((item) => {
              return (
                <div className="col-md-3" key={item._id}>
                  <img
                    style={{ width: "100%", height: "300px" }}
                    src={generateImagePath(item.imagePath)}
                  />
                  <FontAwesomeIcon
                    onClick={() => {
                      deleteImage(id, item._id, getData);
                    }}
                    style={{
                      color: "red",
                      position: "absolute",
                      right: "20px",
                      top: "5px",
                      fontSize: "20px",
                    }}
                    icon={faTrash}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                addImage(id, file, getData);
              }}
            />
            <Button onClick={() => inputRef.current.click()}>
              Upload Image
            </Button>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default RentalDetailsPage;
