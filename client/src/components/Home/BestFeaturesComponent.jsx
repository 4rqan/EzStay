import React from "react";

const BestFeaturesComponent = () => {
  return (
    <div className="mt-3 mx-5">
      <div className="best-features">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>EzStay</h2>
              </div>
            </div>
            <div className="col-md-6">
              <div className="left-content">
                <h4>Find your perfect stay, effortlessly with EzStay.</h4>
                <p>
                  Ezstay is a reliable house renting website that offers a sleek
                  and intuitive user interface for renters to search and filter
                  properties easily. With comprehensive property listings,
                  renters can view detailed information and virtual tours before
                  booking. Ezstay's secure payment processing and 24/7
                  responsive customer support ensure hassle-free transactions.
                  Furthermore, it verifies landlords to protect renters from
                  scams and fraud, providing peace of mind when booking a
                  property.
                </p>
                <ul className="featured-list">
                  <li>
                    <a href="#">User-Friendly Interface</a>
                  </li>
                  <li>
                    <a href="#">Comprehensive Property Listings</a>
                  </li>
                  <li>
                    <a href="#">Secure Payment Processing</a>
                  </li>
                  <li>
                    <a href="#">Responsive Customer Support</a>
                  </li>
                  <li>
                    <a href="#">Trustworthy</a>
                  </li>
                </ul>
                {/* <a href="about.html" className="filled-button">
                  Read More
                </a> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="right-image">
                <img src="/images/feature-image.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestFeaturesComponent;
