import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import {
  changeApprovedStatus,
  changeUserStatus,
  getAllUsers,
} from "../../services/users.service";
import Moment from "react-moment";
import Button from "react-bootstrap/Button";

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <Container>
      <h3 className="text-center">Users</h3>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>D.O.B</th>
            <th>User Role</th>
            <th>Status</th>
            <th>Approved</th>
            <th>ContactNo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.fullname}</td>
                <td>
                  {item.user.email}, {item.user.username}
                </td>
                <td>{item.gender}</td>
                <td>
                  <Moment format="d-MMM-yyyy">{item.dob}</Moment>
                </td>
                <td>{item.user.role}</td>
                <td>{item.user.status}</td>
                <td>
                  {item.user.role === "Landlord" &&
                    (item.user.approvedLL ? "Yes" : "No")}
                </td>

                <td>{item.contactNo}</td>
                <td>
                  <Button
                    onClick={() => {
                      changeUserStatus(
                        {
                          userId: item.user._id,
                          status:
                            item.user.status === "Active"
                              ? "Inactive"
                              : "Active",
                        },
                        () => {
                          getAllUsers(setUsers);
                        }
                      );
                    }}
                  >
                    Make {item.user.status === "Active" ? "Inactive" : "Active"}
                  </Button>
                  {item.user.role === "Landlord" && (
                    <Button
                      onClick={() => {
                        changeApprovedStatus(
                          {
                            userId: item.user._id,
                            approvedLL: !item.user.approvedLL,
                          },
                          () => {
                            getAllUsers(setUsers);
                          }
                        );
                      }}
                    >
                      {item.user.approvedLL ? "DisApprove" : "Approve"}
                    </Button>
                  )}
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
