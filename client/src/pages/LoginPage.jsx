import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../services/auth.service";

const LoginPage = () => {
  const auth = useAuth();

  const [model, setModel] = useState({
    username: "",
    password: "",
  });

  if (auth.isAuthenticated()) return <Navigate to="/" />;

  const submit = (e) => {
    e.preventDefault();
    login(model, auth.login);
  };

  return (
    <Form
      className="row justify-content-center align-items-center"
      onSubmit={submit}
    >
      <div className="col-md-6 card p-5">
        <h2 className=" text-center">Login</h2>

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
          Login
        </Button>
      </div>
    </Form>
  );
};

export default LoginPage;
