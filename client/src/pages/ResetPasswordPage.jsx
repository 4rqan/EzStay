import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { resetPassword } from "../services/auth.service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const resetLink = searchParams.get("resetLink");
  const email = searchParams.get("email");

  const submit = (data) => {
    data.email = email;
    data.resetLink = resetLink;
    resetPassword(data, navigate);
  };

  return (
    <Form
      className="row mt-3 justify-content-center align-items-center"
      onSubmit={handleSubmit(submit)}
    >
      <div className="col-md-6 card p-5">
        <h2 className=" text-center">Reset Password</h2>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            {...register("newPassword", {
              required: true,
              minLength: 8,
              maxLength: 20,
            })}
            type="password"
            placeholder="Password"
          />
          {errors.newPassword &&
            (errors.newPassword.type === "required" ? (
              <span className="text-danger">Password is required</span>
            ) : errors.newPassword.type === "minLength" ? (
              <span className="text-danger">
                Password must be at least 8 characters
              </span>
            ) : (
              errors.newPassword.type === "maxLength" && (
                <span className="text-danger">
                  Password must be at most 20 characters
                </span>
              )
            ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === watch("newPassword"),
            })}
            type="password"
            placeholder="Password"
          />
          {errors.confirmPassword &&
            (errors.confirmPassword.type === "required" ? (
              <span className="text-danger">Confirm Password is required</span>
            ) : (
              errors.confirmPassword.type === "validate" && (
                <span className="text-danger">Passwords do not match</span>
              )
            ))}
        </Form.Group>
        <Button variant="primary" type="submit">
          Reset Password
        </Button>
      </div>
    </Form>
  );
};

export default ResetPasswordPage;
