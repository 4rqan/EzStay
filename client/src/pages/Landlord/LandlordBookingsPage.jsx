import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { bookingsForLandlord } from "../../services/booking.service";

const LandlordBookingsPage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    bookingsForLandlord(setList);
  }, []);

  return (
    <div>
      <h3 className="text-center">My Bookings</h3>

      <Table striped bordered>
        <thead>
          <tr>
            <td>Booked By</td>
            <td>Property Title</td>
            <td>Check In</td>
            <td>Check Out</td>
            <td>Total Guests</td>
            <td>Payment Status</td>
            <td>View Details</td>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.bookedBy?.fullname}</td>
                <td>{item.property?.title}</td>
                <td>
                  <Moment format="d-MMM-yyyy">{item.checkIn}</Moment>
                </td>
                <td>
                  <Moment format="d-MMM-yyyy">{item.checkOut}</Moment>
                </td>
                <td>{item.totalGuests}</td>
                <td>{item.paymentStatus}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    to={"/landlord/booking/" + item._id}
                    role="button"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default LandlordBookingsPage;
