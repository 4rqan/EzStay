import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addListings } from "../../services/listings.service";

const AddListingsPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    availableDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // code to submit form data goes here
    addListings(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row">
        <Form.Group className="mb-3 col-md-4" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>
      </div>

      <div className="row">
        <Form.Group className="mb-3 col-md-4" controlId="formPropertyType">
          <Form.Label>Property Type</Form.Label>
          <Form.Control
            type="text"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4" controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </Form.Group>
      </div>

      <div className="row">
        <Form.Group className="mb-3 col-md-4" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4" controlId="formBedrooms">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Control
            type="text"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleInputChange}
          />
        </Form.Group>
      </div>

      <div className="row">
        <Form.Group className="mb-3 col-md-4" controlId="bathrooms">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Control
            type="text"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4" controlId="formAvailableDate">
          <Form.Label>Available Date</Form.Label>
          <Form.Control
            type="date"
            name="availableDate"
            value={formData.availableDate}
            onChange={handleInputChange}
          />
        </Form.Group>
      </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddListingsPage;
