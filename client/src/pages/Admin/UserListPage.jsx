import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users.service";

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="text-center">Users</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>D.O.B</th>
            <th>Address</th>
            <th>State</th>
            <th>ContactNo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr>
                <td>{item.fullname}</td>
                <td>
                  {item.user.email}, {item.user.username}
                </td>
                <td>{item.gender}</td>
                <td>{item.dob}</td>
                <td>
                  <div>
                    {item.address?.address1}, {item.address?.address2}
                  </div>
                  <div>
                    {item.address?.city}, {item.address?.pincode}
                  </div>

                  <div>{item.address?.landmark}</div>
                </td>
                <td>
                  <div>
                    {item.address?.state}, {item.address?.country}
                  </div>
                </td>

                <td>{item.contactNo}</td>
                <td>
                  <a>Delete</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserListPage;
