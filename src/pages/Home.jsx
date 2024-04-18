import BaseLayout from "../common/BaseLayout";
import Banner from "../components/Banner";
import FeatureCarousel from "../components/FeatureCarousel";
import Hero from "../components/Hero";
import ProductCarousel from "../components/ProductCarousel";
import RecentDrops from "../components/RecentDrops";
import TopCreators from "../components/TopCreators";
import Blog from "../components/Blog"
import JumboTron from "../components/JumboTron"
import HandheldToolbar from "../components/HandheldToolbar"
import BacktoTop from "../components/BacktoTop"

function Home() {
    return (
      <div className="page">
        <BaseLayout
          navProp={{ className: "active" }}
          footerProp={{ className: "mt-n10 pt-10 bg-dark" }}
        >
          {/* <!-- Hero--> */}
          <Hero />
          {/* <!-- Product carousel (Recent Drops)--> */}
          <RecentDrops />
          {/* <!-- Product carousel (Trending in)--> */}
          <ProductCarousel />
          {/* <!-- Top Creators--> */}
          <TopCreators />
          {/* <!-- Mobile app--> */}
          <Banner />
          {/* <!-- Features--> */}
          <FeatureCarousel />
          {/* <!-- Bg shape--> */}
          <Blog className="mb-n10 pb-10 bg-secondary" />
          <JumboTron />
          {/* <!-- Toolbar for handheld devices (NFT Marketplace)--> */}
          <HandheldToolbar />
          {/* <!-- Back To Top Button--> */}
          <BacktoTop />
        </BaseLayout>
      </div>
    );
  }
  
  export default Home;