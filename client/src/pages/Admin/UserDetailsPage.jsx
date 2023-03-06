import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../services/users.service";

const UserDetailsPage = () => {
  let { id } = useParams();

  const [user, setUser] = useState({});
  useEffect(() => {
    getUserDetails(id, setUser);
  }, [id]);

  return <div>{user.fullname}</div>;
};

export default UserDetailsPage;
