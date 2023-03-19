import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const ContactPage = () => {
  return (
    <div>
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

      <footer className="bg-dark text-white py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">&copy; 2023 EzStay. All rights reserved.</p>
            </div>
            <div className="col-md-6">
              <p className="text-right mb-0">
                Designed by: <a href="#">4qanz</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
