import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../services/users.service";
import Image from "react-bootstrap/esm/Image";
import Moment from "react-moment";
import { generateImagePath } from "../../utils/utils";
import "../../css/profile-style.css";

const UserDetailsPage = () => {
  let { id } = useParams();

  const [profile, setUser] = useState({});
  useEffect(() => {
    getUserDetails(id, setUser);
  }, [id]);

  return (
    <Container>
      <div className="row justify-content-center">
        <Image
          className="img"
          roundedCircle={true}
          src={generateImagePath(profile.dpPath)}
        />
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="" class="lbl">
              Email:
            </label>
            {profile.user?.email}
          </div>
          <div className="mb-3">
            <label htmlFor="" class="lbl">
              Fullname:
            </label>
            {profile.fullname}
          </div>
          <div className="mb-3">
            <label htmlFor="" class="lbl">
              Username:
            </label>
            {profile.user?.username}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="" class="lbl">
              Gender:
            </label>
            {profile.gender}
          </div>
          <label htmlFor="" class="lbl">
            D.O.B:
          </label>
          <Moment className="mb-3" format="d-MMM-yyyy">
            <div>{profile.dob}</div>
          </Moment>
          <div className="mb-3">
            <label htmlFor="" class="lbl">
              ContactNo:
            </label>
            {profile.contactNo}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="" class="lbl">
              Address1:
            </label>
            {profile.address?.address1}
          </div>

          <div className="mb-3">
            <label htmlFor="" class="lbl">
              Address2:
            </label>
            {profile.address?.address2}
          </div>

          <div className="mb-3">
            <label htmlFor="" class="lbl">
              City:
            </label>
            {profile.address?.city}
          </div>
          <div className="mb-3">
            <label htmlFor="" className="lbl">
              State:
            </label>
            {profile.address?.state}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="" class="lbl">
              Country:
            </label>
            {profile.address?.country}
          </div>
          <div className="mb-3">
            <label htmlFor="" class="lbl">
              Landmark:
            </label>
            {profile.address?.landmark}
          </div>
          <div className="mb-3">
            <label htmlFor="" class="lbl">
              Pincode:
            </label>
            {profile.address?.pincode}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserDetailsPage;
