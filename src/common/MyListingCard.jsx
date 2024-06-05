import PropTypes from "prop-types"
import { M3terHead } from "m3ters"
import { Link } from "react-router-dom";
import Button from "./Button";

function MyListingCard(props) {
  console.log("inside my listing card", props.id)
  return (
    <div className={props.className}>
      <article className={props.artClass}>
        <div className="card-img-top position-relative overflow-hidden">
          <Link className="d-block" id="overlay-span">
            {/*<img src={props.img} alt="Product" />*/}
            <M3terHead seed={props.id} size={200} />
          </Link>
        </div>
        <div className="card-body">
          <h3 className="product-title mb-2 fs-base">
            <Link
              className="d-block text-truncate"
            >
              {`M3TER ${props.id}`}
            </Link>
          </h3>
        </div>
        <div className="card-footer mt-n1 py-0 border-0">
          <div className="d-flex align-items-center position-relative mb-1 py-3 border-top">
            <Button className="btn btn-success" onClick={()=>{props.onSelect(props.id)}}>
                select to List
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}

MyListingCard.propTypes = {
    className: PropTypes.string,
    id: PropTypes.any,
    artClass: PropTypes.any,
    img: PropTypes.any,
    price: PropTypes.any,
    owner: PropTypes.string,
    lg: PropTypes.any,
    onSelect: PropTypes.func.isRequired
}

export default MyListingCard;
