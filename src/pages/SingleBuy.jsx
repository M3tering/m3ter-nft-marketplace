import FeatureCarousel from "../components/FeatureCarousel";
import JumboTron from "../components/JumboTron";
import SinglebuyBody from "../components/SinglebuyBody";
import BaseLayout from "../common/BaseLayout";
import BacktoTop from "../components/BacktoTop";

function SingleBuy() {
  return (
    <BaseLayout
      navProp={{ style: { paddingBottom: "90px" } }}
      footerProp={{ className: "mt-n10 pt-10 bg-dark" }}
    >
      <SinglebuyBody />
      <FeatureCarousel />
      <JumboTron />
      <BacktoTop />
    </BaseLayout>
  );
}

export default SingleBuy;
