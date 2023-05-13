import { Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { bookProperty } from "../services/property-booking.service";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { InputLabel, MenuItem, Select } from "@mui/material";

const PropertyBookNowComponent = ({ show, onClose, property }) => {
  const [model, setModel] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
    comment: "",
    propertyId: property._id,
    stayPeriod: 1,
    totalGuests: 1,
  });

  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    bookProperty(model, navigate);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Now</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="checkIn">Check In</label>
              <ReactDatePicker
                className="form-control"
                selected={model.checkIn}
                onChange={(date) => setModel({ ...model, checkIn: date })}
              />
            </div>

            {property?.propertyType != "AirBnb" ? (
              <div className="form-group col-md-6">
                <InputLabel id="demo-simple-select-autowidth-label">
                  Stay Period
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={model.stayPeriod}
                  onChange={(e) => {
                    setModel({ ...model, stayPeriod: e.target.value });
                  }}
                  autoWidth
                  label="Stay Period"
                >
                  {periods.map((item) => (
                    <MenuItem value={item}>{item} Month</MenuItem>
                  ))}
                </Select>
              </div>
            ) : (
              <div className="form-group col-md-6">
                <label htmlFor="checkOut">Check Out</label>
                <ReactDatePicker
                  className="form-control"
                  selected={model.checkOut}
                  onChange={(date) => setModel({ ...model, checkOut: date })}
                />
              </div>
            )}
            <div className="form-group col-md-6">
              <label htmlFor="totalGuests">Total Guests</label>
              <input
                type="number"
                className="form-control"
                value={model.totalGuests}
                onChange={(e) =>
                  setModel({ ...model, totalGuests: e.target.value })
                }
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="checkOut">Comment</label>
              <textarea
                maxLength={100}
                className="form-control"
                value={model.comment}
                onChange={(e) =>
                  setModel({ ...model, comment: e.target.value })
                }
              ></textarea>
            </div>
            <div className="form-group col-md-6">
              <button className="btn btn-primary">Place Booking</button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PropertyBookNowComponent;
