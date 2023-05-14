import { styled } from "@mui/system";
import { TextField, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { saveFeedback } from "../services/feedback.service";

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "400px",
  margin: "0 auto",
});

const ContactPage = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform validation
    const errors = {};
    if (!formValues.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Invalid email format";
    }
    if (!formValues.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formValues.phone)) {
      errors.phone = "Invalid phone number format";
    }
    if (!formValues.message.trim()) {
      errors.message = "Message is required";
    }
    setFormErrors(errors);

    // submit the form if there are no errors
    if (Object.keys(errors).length === 0) {
      saveFeedback(
        formValues,
        setFormValues({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      );
    }
  };

  return (
    <div>
      <h4 className="text-center text-capitalize">Contact Us</h4>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          error={!!formErrors.name}
          helperText={formErrors.name}
          required
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          required
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <TextField
          label="Phone"
          type="tel"
          required
          name="phone"
          value={formValues.phone}
          onChange={handleInputChange}
          error={!!formErrors.phone}
          helperText={formErrors.phone}
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          required
          name="message"
          value={formValues.message}
          onChange={handleInputChange}
          error={!!formErrors.message}
          helperText={formErrors.message}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Form>
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-md-4 text-center py-5">
            <FontAwesomeIcon icon={faPhone} size="3x" />
            <h4 className="my-4">Phone</h4>
            <p>
              <a href="tel:+919149874470">+91-9149874470</a>
            </p>
          </div>
          <div className="col-md-4 text-center py-5">
            <FontAwesomeIcon icon={faEnvelope} size="3x" />
            <h4 className="my-4">Email</h4>
            <p>
              <a href="mailto:admin@ezstay.com">admin@ezstay.com</a>
            </p>
          </div>
          <div className="col-md-4 text-center py-5">
            <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />
            <h4 className="my-4">Address</h4>
            <p>Rajbagh, Srinagar-Kashmir, 190008</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
