import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { getListings } from "../../services/listings.service";
import { Link } from "react-router-dom";

const RentalListingsPage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getListings(setList);
  }, []);

  return (
    <Container>
      <h3 className="text-center">Rental Listings</h3>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Property Type</th>
            <th>Location</th>
            <th>Price</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Available Date</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <Link to={"/landlord/rentalListings/" + item._id}>
                    {item.title}
                  </Link>
                </td>
                <td>{item.description}</td>
                <td>{item.propertyType}</td>
                <td>{item.location}</td>
                <td>{item.price}</td>
                <td>{item.bedrooms}</td>
                <td>{item.bathrooms}</td>
                <td>{item.availableDate}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default RentalListingsPage;
