import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { search } from "../services/home.service";
import { generateImagePath } from "../utils/utils";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const searchText = searchParams.get("searchText");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    search(searchText, setSearchResults);
  }, [searchParams]);

  return (
    <Box m={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Page
      </Typography>
      {searchResults.rentalListings?.length > 0 && (
        <>
          <Typography variant="h5" component="h2" mt={4} mb={2}>
            Properties
          </Typography>
          <Grid container spacing={2}>
            {searchResults.rentalListings &&
              searchResults.rentalListings.map((listing) => (
                <Grid item key={listing._id} xs={12} sm={6} md={3}>
                  <Card
                    sx={{ height: "100%" }}
                    component={Link}
                    to={"/propertyDetails/" + listing._id}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={generateImagePath(listing.imageUrls[0].imagePath)}
                      alt={listing.title}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" component="div">
                        Title: {listing.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        noWrap
                        sx={{ height: 32, overflow: "hidden" }}
                      >
                        Description: {listing.description}
                      </Typography>
                      <Typography variant="body2" component="div">
                        Price: ₹{listing.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </>
      )}
      {searchResults?.workers?.length > 0 && (
        <>
          <Typography variant="h5" component="h2" mt={4} mb={2}>
            Workers
          </Typography>
          <Grid container spacing={2}>
            {searchResults.workers &&
              searchResults.workers.map((worker) => (
                <Grid item key={worker._id} xs={12} sm={6} md={3}>
                  <Card
                    sx={{ height: "100%" }}
                    component={Link}
                    to={"/worker/" + worker._id}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={generateImagePath(worker.imagePath)}
                      alt={worker.profileId.fullname}
                    />
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        noWrap
                        title={worker.skills.join(", ")}
                        sx={{ height: 32, overflow: "hidden" }}
                      >
                        Skills: {worker.skills.join(", ")}
                      </Typography>
                      <Typography variant="body2" component="div">
                        Daily Rate: {worker.dailyRate}
                      </Typography>
                      <Typography variant="body2" component="div">
                        Fullname: {worker.profileId.fullname}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default SearchPage;
