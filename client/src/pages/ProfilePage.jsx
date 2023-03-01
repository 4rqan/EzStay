import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profile.service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

  const submit = (e) => {
    e.preventDefault();
    updateProfile(profile);
  };

  return (
    <div>
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
            <Form.Label htmlFor="disabledTextInput">Address Line 1</Form.Label>
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
            <Form.Label htmlFor="disabledTextInput">Address Line 2</Form.Label>
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
            <Form.Label htmlFor="disabledTextInput">City</Form.Label>
            <Form.Control
              value={profile.address.city}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  address: { ...profile.address, city: e.target.value },
                });
              }}
              placeholder="Enter City"
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-4">
            <Form.Label htmlFor="disabledTextInput">Country</Form.Label>
            <Form.Control
              value={profile.address.country}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  address: { ...profile.address, country: e.target.value },
                });
              }}
              placeholder="Enter Country"
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-4">
            <Form.Label htmlFor="disabledTextInput">State</Form.Label>
            <Form.Control
              value={profile.address.state}
              onChange={(e) => {
                setProfile({
                  ...profile,
                  address: { ...profile.address, state: e.target.value },
                });
              }}
              placeholder="Enter State"
            />
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
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default ProfilePage;
