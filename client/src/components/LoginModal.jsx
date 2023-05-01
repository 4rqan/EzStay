import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../services/auth.service";

const LoginModal = ({ show, onClose, onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginWithoutRedirecting } = useAuth();

  const submit = (data) => {
    login(data, (token) => {
      loginWithoutRedirecting(token, onLogin);
    });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="row justify-content-center align-items-center"
          onSubmit={handleSubmit(submit)}
        >
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
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
