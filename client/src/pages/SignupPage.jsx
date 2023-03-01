import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signup } from "../services/auth.service";

const SignupPage = () => {
  const [model, setModel] = useState({
    email: "",
    username: "",
    password: "",
  });

  const auth = useAuth();
  if (auth.isAuthenticated()) return <Navigate to="/" />;

  const submit = (e) => {
    e.preventDefault();
    signup(model, auth.login);
  };

  return (
    <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
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

      <Form.Group className="mb-3" controlId="formBasicEmail">
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

      <Form.Group className="mb-3" controlId="formBasicPassword">
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

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Signup
      </Button>
    </Form>
  );
};
export default SignupPage;
