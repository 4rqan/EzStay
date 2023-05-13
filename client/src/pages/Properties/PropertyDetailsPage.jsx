import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";
import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faFan,
  faParking,
  faTint,
  faFireAlt,
  faMapMarkerAlt,
  faEnvelope,
  faUser,
  faPhone,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { generateImagePath } from "../../utils/utils";
import { getRentalDetails, hasBooked } from "../../services/listings.service";
import { Link, useParams } from "react-router-dom";
import {
  addPropertyratings,
  getAllPropertyRatings,
  getMyPropertyRatings,
} from "../../services/property-ratings.service";
import { useAuth } from "../../contexts/AuthContext";
import LoginModal from "../../components/LoginModal";
import PropertyBookNowComponent from "../../components/PropertyBookNowComponent";

const Title = styled(Typography)({
  fontSize: 30,
  fontWeight: "bold",
  marginBottom: 20,
});

const Description = styled(Typography)({
  fontSize: 16,
  marginBottom: 20,
});

const Feature = styled(Typography)({
  fontSize: 14,
  marginBottom: 5,
  display: "flex",
  alignItems: "center",
});

const FeatureIcon = styled(FontAwesomeIcon)({
  marginRight: 5,
});

const CarouselContainer = styled(Box)({
  width: "100%",
  height: "400px",
  position: "relative",
  overflow: "hidden",
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
});

const Image = styled(Box)({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const BackButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  left: "15px",
  transform: "translateY(-50%)",
  zIndex: 1,
});

const NextButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  right: "15px",
  transform: "translateY(-50%)",
  zIndex: 1,
});

const PropertyDetailsPage = () => {
  const { id } = useParams();

  const [details, setData] = useState();

  const [showBookNowModal, setShowBookNowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { isAuthenticated, getUserId } = useAuth();

  const handleBookNowClick = () => {
    if (isAuthenticated()) {
      setShowBookNowModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    getRentalDetails(id, setData);
  }, [id]);

  return (
    <Container maxWidth="lg" className="mt-3">
      {details && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: 500 }}>
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                totalSlides={details.imageUrls?.length}
                isPlaying={true}
                interval={3000}
              >
                <CarouselContainer>
                  <Slider>
                    {details.imageUrls?.map((item, i) => {
                      return (
                        <Slide index={i} key={item.imagePath}>
                          <Image
                            component="img"
                            src={generateImagePath(item.imagePath)}
                            alt="Property"
                          />
                        </Slide>
                      );
                    })}
                  </Slider>
                  <BackButton>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </BackButton>
                  <NextButton>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </NextButton>
                </CarouselContainer>
              </CarouselProvider>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Title variant="h4" gutterBottom>
              {details.title}
            </Title>
            <Description variant="body1" gutterBottom>
              {details.description}
            </Description>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Feature variant="body2" gutterBottom>
                  <FeatureIcon icon={faBed} /> {details.amenities?.bedrooms}
                  Bedrooms
                </Feature>
                <Feature variant="body2" gutterBottom>
                  <FeatureIcon icon={faBath} /> {details.amenities?.bathrooms}
                  Bathrooms
                </Feature>
                <Feature variant="body2" gutterBottom>
                  <FeatureIcon icon={faFan} />
                  {details.amenities?.cooling}
                </Feature>
                <Feature variant="body2" gutterBottom>
                  <FeatureIcon icon={faParking} />
                  Parking Space :{" "}
                  {details.ameniies?.parkingSpace ? "Yes" : "No"}
                </Feature>
                <Feature variant="body2" gutterBottom>
                  <FeatureIcon icon={faTint} />
                  Water Supply :{" "}
                  {details.amenities?.waterAvailable ? "Yes" : "No"}
                </Feature>
                <Feature variant="body2" gutterBottom>
                  <FeatureIcon icon={faFireAlt} />
                  {details.amenities?.heating}
                </Feature>
                {getUserId() != details.owner && (
                  <>
                    <Button
                      onClick={handleBookNowClick}
                      variant="contained"
                      sx={{ marginTop: 5 }}
                    >
                      Book Now
                    </Button>
                    <LoginModal
                      show={showLoginModal}
                      onClose={() => setShowLoginModal(false)}
                      onLogin={() => {
                        setShowLoginModal(false);
                        setShowBookNowModal(true);
                      }}
                    />
                    <PropertyBookNowComponent
                      property={details}
                      show={showBookNowModal}
                      onClose={() => setShowBookNowModal(false)}
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <FeatureIcon icon={faMapMarkerAlt} />
                  <Typography variant="body2">
                    {details.address?.state}, {details.address?.city},
                    {details.address?.landmark}, {details.address?.pincode}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <FeatureIcon icon={faUser} />
                  <Typography variant="body2">
                    Name: {details.contact?.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <FeatureIcon icon={faEnvelope} />
                  <Typography variant="body2">
                    Email: {details.contact?.email}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FeatureIcon icon={faPhone} />
                  <Typography variant="body2">
                    Phone: {details.contact?.phone}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <div style={{ marginTop: "100px" }}>
        <Ratings className="mt-5" property={id} />
      </div>
    </Container>
  );
};

const Ratings = ({ property }) => {
  const { isAuthenticated } = useAuth();
  const [model, setModel] = useState({ property, rating: 0, feedback: "" });

  const [booked, setBooked] = useState({ hasBooked: false });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (isAuthenticated()) hasBooked(property, setBooked);

    getAllPropertyRatings(property, setReviews);
  }, [property]);

  useEffect(() => {
    if (booked.hasBooked) getMyPropertyRatings(property, setModel);
  }, [property, booked.hasBooked]);

  return (
    <>
      {booked.hasBooked ? (
        <div>
          <h4>Ratings</h4>
          <Rating
            name="simple-controlled"
            value={model.rating}
            onChange={(_, newValue) => {
              setModel({ ...model, rating: newValue });
            }}
          />

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="feedback">Feedback</label>
              <textarea
                value={model.feedback}
                name="feedback"
                id="feedback"
                rows="2"
                className="form-control"
                onChange={(e) => {
                  setModel({ ...model, feedback: e.target.value });
                }}
              ></textarea>
            </div>
            <div className="form-group col-md-6 mt-5">
              <button
                className="btn btn-primary"
                onClick={() => {
                  addPropertyratings(model, (data) => {
                    setModel(data);
                    getAllPropertyRatings(property, setReviews);
                  });
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        {reviews.map((item) => {
          return (
            <div className="row" key={item._id}>
              <div className="col-md-3">
                <div>
                  <img
                    src={generateImagePath(item.profile.dpPath)}
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div>{item.profile.fullname}</div>
              </div>
              <div className="col-md-9">
                <div>
                  <Rating name="read-only" value={item.rating} readOnly />
                </div>
                <div>{item.feedback}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PropertyDetailsPage;
