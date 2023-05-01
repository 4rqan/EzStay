import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { forgotPassword } from "../../services/auth.service";

const ForgotPasswordPage = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (auth.isAuthenticated()) return <Navigate to="/" />;

  const submit = (data) => {
    forgotPassword(data);
  };

  return (
    <div>
      <Form
        className="row justify-content-center align-items-center"
        onSubmit={handleSubmit(submit)}
      >
        <div className="col-md-6 card p-5">
          <h2 className=" text-center">Forgot Passwords</h2>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter email"
            />
            {errors.email && (
              <span className="text-danger">Email is required</span>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Get Reset Link
          </Button>
          <Link to="/Login">Click here to login</Link>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
