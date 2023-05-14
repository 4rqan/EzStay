import { useEffect, useState } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import Moment from "react-moment";
import { getAllFeedbacks } from "../../services/feedback.service";

const FeedbackListPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [params, setParams] = useState({
    pageNo: 1,
    limit: 10,
    sortBy: "createdDate",
    sortOrder: "desc",
  });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      getAllFeedbacks(setData, params);
    };
    fetchFeedbacks();
  }, [params]);

  const setData = (data) => {
    setFeedbacks(data.feedbacks);
    setTotalItems(data.count);
    setLoading(false);
  };

  const handleChangePage = (_, newPage) => {
    setParams({ ...params, pageNo: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    setParams({
      ...params,
      pageNo: 1,
      limit: parseInt(event.target.value, 10),
    });
  };

  const handleSortByDate = async (e) => {
    setParams({
      ...params,
      pageNo: 1,
      sortBy: e.target.getAttribute("prop"),
      sortOrder: params.sortOrder == "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="container">
      <h2 className="my-3">Feedback</h2>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 15]}
        component="div"
        count={totalItems}
        rowsPerPage={params.limit}
        page={params.pageNo - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {loading && (
        <div className="d-flex justify-content-center my-3">
          <CircularProgress />
        </div>
      )}

      {feedbacks.length === 0 && !loading && (
        <div className="text-center my-3">
          <p>No feedbacks found.</p>
        </div>
      )}

      {feedbacks.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {" "}
                <TableSortLabel
                  prop="_id"
                  active={params.sortBy === "_id"}
                  direction={params.sortOrder}
                  onClick={handleSortByDate}
                  hideSortIcon={params.sortBy !== "_id"}
                >
                  Feedback ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                {" "}
                <TableSortLabel
                  prop="name"
                  active={params.sortBy === "name"}
                  direction={params.sortOrder}
                  onClick={handleSortByDate}
                  hideSortIcon={params.sortBy !== "name"}
                >
                  User Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  prop="email"
                  active={params.sortBy === "email"}
                  direction={params.sortOrder}
                  onClick={handleSortByDate}
                  hideSortIcon={params.sortBy !== "email"}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                {" "}
                <TableSortLabel
                  prop="phone"
                  active={params.sortBy === "phone"}
                  direction={params.sortOrder}
                  onClick={handleSortByDate}
                  hideSortIcon={params.sortBy !== "phone"}
                >
                  Phone
                </TableSortLabel>
              </TableCell>
              <TableCell>
                {" "}
                <TableSortLabel
                  prop="message"
                  active={params.sortBy === "message"}
                  direction={params.sortOrder}
                  onClick={handleSortByDate}
                  hideSortIcon={params.sortBy !== "message"}
                >
                  Message
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  prop="createdDate"
                  active={params.sortBy === "createdDate"}
                  direction={params.sortOrder}
                  onClick={handleSortByDate}
                  hideSortIcon={params.sortBy !== "createdDate"}
                >
                  Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback._id}>
                <TableCell>{feedback._id}</TableCell>
                <TableCell>{feedback.name}</TableCell>
                <TableCell>{feedback.email}</TableCell>
                <TableCell>{feedback.phone}</TableCell>
                <TableCell>{feedback.message}</TableCell>
                <TableCell>
                  <Moment format="MMMM DD, YYYY hh:mm A">
                    {feedback.createdAt}
                  </Moment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default FeedbackListPage;
