import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addListings } from "../../services/listings.service";

const AddListingsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    addListings(data, navigate);
  };

  return (
    <Container>
      <h3 className="mt-3 mb-2 text-center">Add Listing</h3>
      <Form onSubmit={handleSubmit(submit)}>
        <div className="row">
          <Form.Group className="mb-3 col-md-6" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-danger">Title is required</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formAvailableDate">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple={true}
              {...register("images", { required: true })}
              accept="image/*"
            />
            {errors.images && (
              <span className="text-danger">Images are required</span>
            )}
          </Form.Group>
        </div>

        <div className="row">
          <Form.Group className="mb-3 col-md-6">
            <Form.Label htmFor="disabledSelect">Property Type</Form.Label>
            <Form.Select {...register("propertyType", { required: true })}>
              <option>AirBnb</option>
              <option>Apartment(Rent)</option>
            </Form.Select>
            {errors.propertyType && (
              <span className="text-danger">property Type is required</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              {...register("location", { required: true })}
            />
            {errors.location && (
              <span className="text-danger">Location is required</span>
            )}
          </Form.Group>
        </div>

        <div className="row">
          <Form.Group className="mb-3 col-md-6" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-danger">Price is required</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formBedrooms">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              type="text"
              name="bedrooms"
              {...register("bedrooms", { required: true })}
            />
            {errors.bedrooms && (
              <span className="text-danger">Bedrooms is required</span>
            )}
          </Form.Group>
        </div>

        <div className="row">
          <Form.Group className="mb-3 col-md-6" controlId="bathrooms">
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control
              type="text"
              name="bathrooms"
              {...register("bathrooms", { required: true })}
            />
            {errors.bathrooms && (
              <span className="text-danger">Bathrooms is required</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formAvailableDate">
            <Form.Label>Available Date</Form.Label>
            <Form.Control
              type="date"
              name="availableDate"
              {...register("availableDate", { required: true })}
            />
            {errors.availableDate && (
              <span className="text-danger">Available Date is required</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-danger">Description is required</span>
            )}
          </Form.Group>
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddListingsPage;
