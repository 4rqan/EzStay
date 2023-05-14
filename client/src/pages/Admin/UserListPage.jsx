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
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

const UserListPage = () => {
  const [data, setData] = useState({ users: [], total: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  const [sortOn, setSortOn] = useState({});

  const [loading, setLoading] = useState(true);

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setLoading(true);
    getAllUsers(currentPage, sortOn, pageSize, (d) => {
      setData(d);
      setLoading(false);
    });
  }, [currentPage, sortOn, pageSize]);

  const handlePageClick = (_, pageNumber) => {
    setCurrentPage(pageNumber + 1);
  };

  const handleSort = (e) => {
    const field = e.target.getAttribute("prop");
    let order =
      sortOn.field === field && sortOn.order === "asc" ? "desc" : "asc";
    setSortOn({ field, order });
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h2 className="my-3">Users</h2>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 15]}
        component="div"
        count={data.total}
        rowsPerPage={pageSize}
        page={currentPage - 1}
        onPageChange={handlePageClick}
        onRowsPerPageChange={(e) => {
          setPageSize(parseInt(e.target.value, 10));
          setCurrentPage(1);
        }}
      />

      {loading && (
        <div className="d-flex justify-content-center my-3">
          <CircularProgress />
        </div>
      )}

      {data.users.length === 0 && !loading && (
        <div className="text-center my-3">
          <p>No Users found.</p>
        </div>
      )}

      {data.users.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  prop="fullname"
                  active={sortOn.field === "fullname"}
                  direction={sortOn.order}
                  onClick={handleSort}
                  hideSortIcon={sortOn.field !== "fullname"}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  prop="email"
                  active={sortOn.field === "email"}
                  direction={sortOn.order}
                  onClick={handleSort}
                  hideSortIcon={sortOn.field !== "email"}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  prop="contactNo"
                  active={sortOn.field === "contactNo"}
                  direction={sortOn.order}
                  onClick={handleSort}
                  hideSortIcon={sortOn.field !== "contactNo"}
                >
                  Contact No
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  prop="gender"
                  active={sortOn.field === "gender"}
                  direction={sortOn.order}
                  onClick={handleSort}
                  hideSortIcon={sortOn.field !== "gender"}
                >
                  Gender
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  prop="dob"
                  active={sortOn.field === "dob"}
                  direction={sortOn.order}
                  onClick={handleSort}
                  hideSortIcon={sortOn.field !== "dob"}
                >
                  DOB
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  prop="role"
                  active={sortOn.field === "role"}
                  direction={sortOn.order}
                  onClick={handleSort}
                  hideSortIcon={sortOn.field !== "role"}
                >
                  User Role
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  prop="status"
                  active={sortOn.field === "status"}
                  direction={sortOn.order}
                  onClick={handleSort}
                  hideSortIcon={sortOn.field !== "status"}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  prop="approved"
                  active={sortOn.field === "approved"}
                  direction={sortOn.order}
                  onClick={handleSort}
                  hideSortIcon={sortOn.field !== "approved"}
                >
                  approved
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Link to={"/admin/userdetails/" + item.user._id}>
                    {item.fullname}
                  </Link>
                </TableCell>
                <TableCell>
                  {item.user.email}, {item.user.username}
                </TableCell>
                <TableCell>{item.contactNo}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>
                  <Moment format="MMMM DD, YYYY hh:mm A">{item.dob}</Moment>
                </TableCell>
                <TableCell>{item.user.role}</TableCell>
                <TableCell>{item.user.status}</TableCell>
                <TableCell>
                  {item.user.role === "Landlord" &&
                    (item.user.approvedLL ? "Yes" : "No")}
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UserListPage;
