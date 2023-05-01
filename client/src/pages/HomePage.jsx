import BannerComponent from "../components/Home/BannerComponent";
import BestFeaturesComponent from "../components/Home/BestFeaturesComponent";
import CallToActionComponent from "../components/Home/CallToActionComponent";
import ListingsComponent from "../components/Home/ListingsComponent";
import PropertiesByCitiesComponent from "../components/Home/PropertiesByCitiesComponent";
import ServicesComponent from "../components/Home/ServicesComponent";
const HomePage = () => {
  return (
    <>
      <BannerComponent />
      <ListingsComponent />
      <PropertiesByCitiesComponent />
      <ServicesComponent />
      <BestFeaturesComponent />
      <CallToActionComponent />
    </>
  );
};

export default HomePage;
