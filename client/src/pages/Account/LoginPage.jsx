import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { login } from "../../services/auth.service";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (auth.isAuthenticated()) return <Navigate to="/" />;

  const submit = (data) => {
    login(data, auth.login);
  };

  return (
    <Form
      className="row justify-content-center align-items-center"
      onSubmit={handleSubmit(submit)}
    >
      <div className="col-md-6 card p-5">
        <h2 className=" text-center">Login</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register("username", { required: true })}
            type="text"
            placeholder="Enter username"
          />
          {errors.username && (
            <span className="text-danger">Username is required</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-danger">Password is required</span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Link to="/signup">Create a new account</Link>
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>
    </Form>
  );
};

export default LoginPage;
