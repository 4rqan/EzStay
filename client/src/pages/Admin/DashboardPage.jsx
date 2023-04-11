import { Container } from "react-bootstrap";
import UsersByCitiesChart from "../../components/Dashboard/UsersByCitiesChart";

const Dashboardpage = () => {
  return (
    <Container>
      <h3 className="text-center">Dashboard</h3>
      <UsersByCitiesChart />
    </Container>
  );
};

export default Dashboardpage;
