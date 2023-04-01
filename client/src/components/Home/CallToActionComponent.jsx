import React from "react";
import { Link } from "react-router-dom";

const CallToActionComponent = () => {
  return (
    <div>
      <div className="call-to-action">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner-content">
                <div className="row">
                  <div className="col-md-8">
                    <h4>
                      User-Friendly&amp; Trustworthy <em>Secure &amp;</em>{" "}
                      Hassle-Free
                    </h4>
                    <p>
                      Book your dream home or apartment with ease and confidence
                      on EzStay - the premier house renting website with a vast
                      selection of properties and secure payment options.
                    </p>
                  </div>
                  <div className="col-md-4">
                    <Link to={"/allproperties"} className="filled-button">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionComponent;
