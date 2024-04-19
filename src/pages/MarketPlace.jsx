import ToolBar from "../components/ToolBar"
import FeatureCarousel from "../components/FeatureCarousel";
import JumboTron from "../components/JumboTron";
import BaseLayout from "../common/BaseLayout";
import BacktoTop from "../components/BacktoTop";

function MarketPlace() {
  return (
    <div className="market">
      <BaseLayout
        navProp={{ activeid: "active" }}
        footerProp={{ className: "mt-n10 pt-10 bg-dark" }}
      >
        <ToolBar />
        <FeatureCarousel />
        <JumboTron />
        <BacktoTop />
      </BaseLayout>
    </div>
  );
}

export default MarketPlace;
