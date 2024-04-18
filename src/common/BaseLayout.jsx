import PropTypes from "prop-types"
import Footer from "./Footer";
import NavBar from "./NavBar";

function BaseLayout({ children, navProp, footerProp }) {
  return (
    <>
      <NavBar {...navProp} />
      {children}
      <Footer {...footerProp} />
    </>
  );
}

BaseLayout.propTypes = {
    children: PropTypes.any,
    navProp: PropTypes.any,
    footerProp: PropTypes.any
}

export default BaseLayout;
