import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { signup } from "../../services/auth.service";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const auth = useAuth();
  if (auth.isAuthenticated()) return <Navigate to="/" />;

  const submit = (data) => {
    signup(data, auth.login);
  };

  return (
    <Container>
      <h3 className="mt-3 mb-2 text-center">Sign up</h3>
      <Form className="mt-4" onSubmit={handleSubmit(submit)}>
        <div className="row">
          <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-danger">Email is required</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-danger">Username is required</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter fullname"
              {...register("fullname", { required: true })}
            />
            {errors.fullname && (
              <span className="text-danger">Fullname is required</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
            <Form.Label>ContactNo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ContactNo"
              {...register("contactNo", { required: true })}
            />
            {errors.contactNo && (
              <span className="text-danger">ContactNo is required</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6">
            <Form.Label htmlFor="disabledSelect">Role </Form.Label>
            <Form.Select {...register("role", { required: true })}>
              <option>Landlord</option>
              <option>Tenant</option>
              <option>Worker</option>
            </Form.Select>
            {errors.role && (
              <span className="text-danger">Role is required</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-danger">Password is required</span>
            )}
          </Form.Group>
        </div>
        <div className="row justify-content-center">
          <Button className="col-md-3" variant="primary" type="submit">
            Signup
          </Button>
          <Link to="/login">Already have account Click here to login</Link>
        </div>
      </Form>
    </Container>
  );
};
export default SignupPage;
