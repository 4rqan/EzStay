import BannerComponent from "../components/Home/BannerComponent";
import BestFeaturesComponent from "../components/Home/BestFeaturesComponent";
import CallToActionComponent from "../components/Home/CallToActionComponent";
import ListingsComponent from "../components/Home/ListingsComponent";
const HomePage = () => {
  return (
    <>
      {/* <div id="preloader">
      <div className="jumper">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div> */}

      <BannerComponent />
      <ListingsComponent />
      <BestFeaturesComponent />
      <CallToActionComponent />
    </>
  );
};

export default HomePage;
