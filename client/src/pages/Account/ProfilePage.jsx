import { Container, Image, Tab, Tabs } from "react-bootstrap";
import ProfileComponent from "../../components/ProfileComponent";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { generateImagePath } from "../../utils/utils";
import { Link } from "react-router-dom";
import {
  getWorkerDetails,
  saveWorkerDetails,
  uploadCoverPic,
} from "../../services/worker.service";
import {
  getPaymentAccount,
  savePaymentAccount,
} from "../../services/payment-account.service";

const options = ["Worker", "Plumber", "three"];

const ProfilePage = () => {
  const { isInRole } = useAuth();
  const [key, setKey] = useState("profile");

  const defaultValues = {
    skills: [],
    dailyRate: 0,
    availability: "",
  };

  const [model, setModel] = useState(defaultValues);

  useEffect(() => {});
  const skills = [
    { value: "Electrician", label: "Electrician" },
    { value: "Plumber", label: "Plumber" },
    { value: "Carpenter", label: "Carpenter" },
    { value: "Mason", label: "Mason" },
  ];

  useEffect(() => {
    getWorkerDetails(setModelData);
  }, []);

  const setModelData = (data) => {
    data = data || defaultValues;
    data.skills = data.skills.map((x) => {
      return { label: x, value: x };
    });
    setModel(data);
  };
  const inputRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    model.skills = model.skills.map((x) => x.value);
    saveWorkerDetails(model, setModelData);
  };

  return (
    <>
      {isInRole("Worker") ? (
        <Container className="mt-3">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="profile" title="Profile">
              <ProfileComponent />
            </Tab>
            <Tab eventKey="skills" title="Skills">
              <div className="mb-5 row align-items-center justify-content-start">
                <div className="col-md-2">
                  <Image
                    className="img"
                    roundedCircle={true}
                    src={generateImagePath(model.imagePath)}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    style={{ display: "none" }}
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      uploadCoverPic(file, (path) => {
                        setModel({ ...model, imagePath: path });
                      });
                    }}
                  />
                  <Link
                    className="mt-2"
                    onClick={() => inputRef.current.click()}
                  >
                    Change Cover picture
                  </Link>
                </div>
              </div>
              <form className="row" onSubmit={submit}>
                <div className="col-md-6 form-group">
                  <label htmlFor="skills" className="control-label">
                    Skills
                  </label>
                  <Select
                    options={skills}
                    value={model.skills}
                    isMulti
                    onChange={(e) => {
                      setModel({ ...model, skills: e });
                    }}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="rate" className="control-label">
                    Daily Rate
                  </label>
                  <input
                    value={model.dailyRate}
                    type="number"
                    onChange={(e) => {
                      setModel({ ...model, dailyRate: e.target.value });
                    }}
                    id="rate"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="availibility" className="control-label">
                    Availibility
                  </label>
                  <input
                    value={model.availability}
                    type="text"
                    onChange={(e) => {
                      setModel({ ...model, availability: e.target.value });
                    }}
                    id="availibility"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <button className="btn btn-primary mt-4">Save</button>
                </div>
              </form>
            </Tab>
            <Tab eventKey="payment" title="Payment Profile">
              <PaymentProfile />
            </Tab>
          </Tabs>
        </Container>
      ) : (
        <ProfileComponent />
      )}
    </>
  );
};

const PaymentProfile = () => {
  const [showKeys, setShowKeys] = useState(false);
  const [keysModel, setKeysModel] = useState({
    keyId: "",
    keySecret: "",
  });

  useEffect(() => {
    getPaymentAccount(setKeysModel);
  }, []);

  const submit = () => {
    savePaymentAccount(keysModel);
  };
  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="keyId">Key Id</label>
          <input
            value={keysModel.keyId}
            id="keyId"
            onChange={(e) => {
              setKeysModel({ ...keysModel, keyId: e.target.value });
            }}
            type={showKeys ? "text" : "password"}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="keySecret">Key secret</label>
          <input
            value={keysModel.keySecret}
            id="keySecret"
            onChange={(e) => {
              setKeysModel({
                ...keysModel,
                keySecret: e.target.value,
              });
            }}
            type={showKeys ? "text" : "password"}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="showKeys">Show Keys</label>
          <input
            id="showKeys"
            type="checkbox"
            value={true}
            checked={showKeys}
            onClick={(e) => {
              setShowKeys(e.target.checked);
            }}
          />
        </div>
        <div className="form-group">
          <button onClick={submit} className="btn btn-primary btn-block">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
