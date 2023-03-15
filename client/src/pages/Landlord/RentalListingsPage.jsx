import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getListings } from "../../services/listings.service";

const RentalListingsPage = () => {
  const [list, setList] = useState();

  useEffect(() => {
    getListings(setList);
  }, []);

  return <div>RentalListingsPage</div>;
};
export default RentalListingsPage;
