import FeatureCarousel from "../components/FeatureCarousel";
import JumboTron from "../components/JumboTron";
import SinglebuyBody from "../components/SinglebuyBody";
import BaseLayout from "../common/BaseLayout";
import BacktoTop from "../components/BacktoTop";
import { useSearchParams } from "react-router-dom";
import useListings from "../web3/hooks/useListings";

function SingleBuy() {
  const {listings} = useListings()
  let [params, ] = useSearchParams()
  let id = params.get("id")
  let index;

  let singleMeter = listings?.find((meter, i)=>{
    index = i
    return meter.tokenId == id
  })
  return (
    <BaseLayout
      navProp={{ style: { paddingBottom: "90px" } }}
      footerProp={{ className: "mt-n10 pt-10 bg-dark" }}
    >
      <SinglebuyBody meter={singleMeter} index={index} />
      <FeatureCarousel />
      <JumboTron />
      <BacktoTop />
    </BaseLayout>
  );
}

export default SingleBuy;
