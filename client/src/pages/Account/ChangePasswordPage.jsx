import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { changePassword } from "../../services/auth.service";
import { useForm } from "react-hook-form";

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    changePassword(data);
  };

  return (
    <Form
      className="row mt-3 justify-content-center align-items-center"
      onSubmit={handleSubmit(submit)}
    >
      <div className="col-md-6 card p-5">
        <h2 className=" text-center">Change Password</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            {...register("oldPassword", { required: true })}
            type="password"
            placeholder="Enter old password"
          />
          {errors.oldPassword && (
            <span className="text-danger">Old Password is required</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            {...register("newPassword", {
              required: true,
              minLength: 8,
              maxLength: 20,
              validate: (value) => value !== watch("oldPassword"),
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
            ) : errors.newPassword.type === "maxLength" ? (
              <span className="text-danger">
                Password must be at most 20 characters
              </span>
            ) : (
              errors.newPassword.type === "validate" && (
                <span className="text-danger">
                  New password cannnot be same as old password
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
          Change Password
        </Button>
      </div>
    </Form>
  );
};

export default ChangePasswordPage;
