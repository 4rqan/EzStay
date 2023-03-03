import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signup } from "../services/auth.service";

const SignupPage = () => {
  const [model, setModel] = useState({
    email: "",
    username: "",
    password: "",
    contactNo: "",
    role: "Landlord",
    fullname: "",
  });

  const auth = useAuth();
  if (auth.isAuthenticated()) return <Navigate to="/" />;

  const submit = (e) => {
    e.preventDefault();
    signup(model, auth.login);
  };

  return (
    <Container>
      <Form className="mt-4" onSubmit={submit}>
        <div className="row">
          <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={model.email}
              onChange={(e) => {
                setModel({ ...model, email: e.target.value });
              }}
              type="email"
              placeholder="Enter Email"
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={model.username}
              onChange={(e) => {
                setModel({ ...model, username: e.target.value });
              }}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              value={model.fullname}
              onChange={(e) => {
                setModel({ ...model, fullname: e.target.value });
              }}
              type="text"
              placeholder="Enter fullname"
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
            <Form.Label>ContactNo</Form.Label>
            <Form.Control
              value={model.contactNo}
              onChange={(e) => {
                setModel({ ...model, contactNo: e.target.value });
              }}
              type="text"
              placeholder="Enter ContactNo"
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-6">
            <Form.Label htmlFor="disabledSelect">Role </Form.Label>
            <Form.Select
              value={model.role}
              onChange={(e) => {
                setModel({ ...model, role: e.target.value });
              }}
            >
              <option>Landlord</option>
              <option>Tenant</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={model.password}
              onChange={(e) => {
                setModel({ ...model, password: e.target.value });
              }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </div>
        <div className="row justify-content-center">
          <Button className="col-md-3" variant="primary" type="submit">
            Signup
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default SignupPage;
