import { Container } from "react-bootstrap";
import UsersByCitiesChart from "../../components/Dashboard/UsersByCitiesChart";
import PropertiesByCitiesChart from "../../components/Dashboard/PropertiesByCitiesChart";

const Dashboardpage = () => {
  return (
    <Container>
      <h3 className="text-center">Dashboard</h3>
      <UsersByCitiesChart />
      <PropertiesByCitiesChart />
    </Container>
  );
};

export default Dashboardpage;
