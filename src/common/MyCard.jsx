import PropTypes from "prop-types"
import { M3terHead } from "m3ters"
import { Link } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import Web3Context from "../contexts/Web3Context";

function MyCard(props) {
  let convertedPrice = Number(props.price) / 10**18
  let {currency} = useContext(Web3Context)
  return (
    <div className={props.className}>
      <article className={props.artClass}>
        <div className="card-img-top position-relative overflow-hidden">
          <Link className="d-block" id="overlay-span" to={`/marketplace/single-buy?id=${props.id}`}>
            {/*<img src={props.img} alt="Product" />*/}
            <M3terHead seed={props.img} size={200} />
          </Link>
          {/* <!-- Wishlist button--> */}
          <Button
            className="btn-wishlist btn-sm position-absolute top-0 end-0"
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Add to Favorites"
            style={{ margin: "12px" }}
          >
            <i className="ci-heart"></i>
          </Button>
        </div>
        <div className="card-body">
          <h3 className="product-title mb-2 fs-base">
            <Link
              className="d-block text-truncate"
              to={`/marketplace/single-buy?id=${props.id}`}
            >
              {`M3TER ${props.id}`}
            </Link>
          </h3>
          <span className="fs-sm text-muted">Reserve price:</span>
          <div className="d-flex align-items-center flex-wrap">
            <h4 className="mt-1 mb-0 fs-base text-darker">{convertedPrice} {currency}</h4>
            <span className="mt-1 ms-1 fs-xs text-muted">(≈ $ 2,400.65)</span>
          </div>
        </div>
        <div className="card-footer mt-n1 py-0 border-0">
          <div className="d-flex align-items-center position-relative mb-1 py-3 border-top">
            <img
              className="me-2 rounded-circle"
              src={props.lg}
              width="32"
              alt="Avatar"
            />
            <Link
              className="nav-link-style fs-sm stretched-link"
              to="/project-developer"
            >
              {props?.owner?.slice(0, 4)}...{props?.owner?.slice(props?.owner.length - 4)}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

MyCard.propTypes = {
    className: PropTypes.string,
    id: PropTypes.any,
    artClass: PropTypes.any,
    img: PropTypes.any,
    price: PropTypes.any,
    owner: PropTypes.string,
    lg: PropTypes.any
}

export default MyCard;
