import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import {
  changeApprovedStatus,
  changeUserStatus,
  getAllUsers,
} from "../../services/users.service";
import Moment from "react-moment";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

const UserListPage = () => {
  const [data, setData] = useState({ users: [], total: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  const [sortOn, setSortOn] = useState({});

  useEffect(() => {
    getAllUsers(currentPage, sortOn, setData);
  }, [currentPage, sortOn]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageSize = 3;

  const renderPaginationButtons = () => {
    const buttons = [];
    const pageCount = Math.ceil(data.total / pageSize);

    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return buttons;
  };

  return (
    <Container>
      <h3 className="text-center">Users</h3>
      <Table striped bordered>
        <thead>
          <tr>
            <th>
              Name{" "}
              <FontAwesomeIcon
                onClick={() => {
                  let order =
                    sortOn.field === "fullname" && sortOn.order === "asc"
                      ? "desc"
                      : "asc";
                  setSortOn({ field: "fullname", order });
                }}
                icon={
                  sortOn.field === "fullname"
                    ? sortOn.order === "asc"
                      ? faSortUp
                      : faSortDown
                    : faSort
                }
              />
            </th>
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
          {data.users.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  {" "}
                  <Link to={"/admin/userdetails/" + item.user._id}>
                    {item.fullname}
                  </Link>
                </td>
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
                          getAllUsers(setData);
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
                            getAllUsers(setData);
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

      <Pagination>{renderPaginationButtons()}</Pagination>
    </Container>
  );
};

export default UserListPage;
