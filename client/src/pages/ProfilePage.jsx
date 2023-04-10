import { useEffect, useRef, useState } from "react";
import {
  getProfile,
  updateProfile,
  uploadDp,
} from "../services/profile.service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { generateImagePath } from "../utils/utils";
import "../css/profile-style.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCities, getStates } from "../services/listings.service";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    user: {
      email: "",
      username: "",
    },
    fullname: "",
    gender: "",
    contactNo: "",
    dob: "",
    address: {
      city: "",
      country: "",
      state: "",
      pincode: "",
      landmark: "",
      address1: "",
      address2: "",
    },
  });

  useEffect(() => {
    getProfile(setProfile);
  }, []);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getStates(setStates);
  }, []);

  useEffect(() => {
    if (profile?.address?.state) getCities(profile?.address?.state, setCities);
    else setCities([]);
  }, [profile?.address?.state]);

  const inputRef = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    updateProfile(profile);
  };

  return (
    <div className="container">
      <Card className="mt-3">
        <Card.Header>
          <h3 className="mt-3 mb-2 text-center">Profile</h3>
        </Card.Header>
        <Card.Body>
          <div className="mb-5 row align-items-center justify-content-start">
            <div className="col-md-2">
              <Image
                className="img"
                roundedCircle={true}
                src={generateImagePath(profile.dpPath)}
              />
            </div>
            <div className="col-md-3">
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  uploadDp(file, (path) => {
                    setProfile({ ...profile, dpPath: path });
                  });
                }}
              />
              <Link className="mt-2" onClick={() => inputRef.current.click()}>
                Change Profile picture
              </Link>
            </div>
          </div>
          <Form onSubmit={submit}>
            <div className="row">
              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control id="email" disabled value={profile.user.email} />
              </Form.Group>
              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  id="username"
                  disabled
                  value={profile.user.username}
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="fullname">Fullname</Form.Label>
                <Form.Control
                  id="fullname"
                  value={profile.fullname}
                  onChange={(e) => {
                    setProfile({ ...profile, fullname: e.target.value });
                  }}
                  placeholder="Enter Fullname"
                />
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="disabledSelect">Gender</Form.Label>
                <Form.Select
                  value={profile.gender}
                  onChange={(e) => {
                    setProfile({ ...profile, gender: e.target.value });
                  }}
                >
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="disabledTextInput">ContactNo</Form.Label>
                <Form.Control
                  value={profile.contactNo}
                  onChange={(e) => {
                    setProfile({ ...profile, contactNo: e.target.value });
                  }}
                  placeholder="Enter Contact No"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="disabledTextInput">DOB</Form.Label>
                <Form.Control
                  type="date"
                  value={profile.dob}
                  onChange={(e) => {
                    setProfile({ ...profile, dob: e.target.value });
                  }}
                  placeholder="Enter DOB"
                />
              </Form.Group>
            </div>
            <div className="row">
              <hr></hr>
              <h4> Address</h4>
              <hr></hr>
            </div>
            <div className="row">
              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="disabledTextInput">
                  Address Line 1
                </Form.Label>
                <Form.Control
                  value={profile.address.address1}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      address: { ...profile.address, address1: e.target.value },
                    });
                  }}
                  placeholder="Enter Address Line 2"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="disabledTextInput">
                  Address Line 2
                </Form.Label>
                <Form.Control
                  value={profile.address.address2}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      address: { ...profile.address, address2: e.target.value },
                    });
                  }}
                  placeholder="Enter Address Line 2"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="disabledTextInput">State</Form.Label>
                <Form.Select
                  value={profile?.address?.state}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      address: { ...profile.address, state: e.target.value },
                    });
                  }}
                >
                  <option value="">Select State</option>
                  {states.map((item) => {
                    return (
                      <option key={item._id} value={item.isoCode}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="disabledTextInput">City</Form.Label>
                <Form.Select
                  value={profile?.address?.city}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      address: { ...profile.address, city: e.target.value },
                    });
                  }}
                >
                  <option value="">Select City</option>
                  {cities.map((item) => {
                    return (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="disabledTextInput">Pincode</Form.Label>
                <Form.Control
                  value={profile.address.pincode}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      address: { ...profile.address, pincode: e.target.value },
                    });
                  }}
                  placeholder="Enter Pincode"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-4">
                <Form.Label htmlFor="disabledTextInput">Landmark</Form.Label>
                <Form.Control
                  value={profile.address.landmark}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      address: { ...profile.address, landmark: e.target.value },
                    });
                  }}
                  placeholder="Enter Landmark"
                />
              </Form.Group>
            </div>
            <Button type="submit">Save Info</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
