import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllListings } from "../../services/listings.service";
import { generateImagePath } from "../../utils/utils";

const PropertyListPage = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getAllListings(setData, page, pageSize, null, null, sortField, sortOrder);
  }, [page, pageSize, sortField, sortOrder]);

  const handleBlockUnblock = (propertyId) => {
    console.log(`Block/Unblock property with ID: ${propertyId}`);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  return (
    <div>
      <h3>Properties</h3>
      <Grid container spacing={2}>
        {data.RentalListings &&
          data.RentalListings.map((propertyData) => (
            <Grid item key={propertyData._id} xs={12}>
              <PropertyCard
                property={propertyData}
                onBlockUnblock={handleBlockUnblock}
              />
            </Grid>
          ))}
      </Grid>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        <Button
          disabled={page === 1}
          onClick={(event) => handlePageChange(event, page - 1)}
        >
          Previous
        </Button>
        <Button onClick={(event) => handlePageChange(event, page + 1)}>
          Next
        </Button>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={30}>30 per page</option>
        </select>
      </div>
    </div>
  );
};

const PropertyCard = ({ property, onBlockUnblock }) => {
  const handleBlockUnblock = () => {
    onBlockUnblock(property._id);
  };

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={3}
          style={{ display: "flex", alignItems: "center" }}
        >
          {property.imageUrls && property.imageUrls.length > 0 && (
            <img
              src={generateImagePath(property.imageUrls[0].imagePath)}
              alt="Property"
              style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          <CardContent>
            <Typography variant="h5" component="div">
              {property.title}
            </Typography>
            <Typography
              color="text.secondary"
              noWrap
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {property.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Property Type: {property.propertyType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {property.price} {property.priceType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Available Date: {property.availableDate}
            </Typography>
            <Button onClick={handleBlockUnblock}>
              {property.isBlocked ? "Unblock" : "Block"}
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PropertyListPage;
