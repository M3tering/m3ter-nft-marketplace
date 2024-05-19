import PropTypes from "prop-types"

export default function PaginationTab(props){
    return(
      <li
        className={`page-item ${props.currentPage == props.page && "active"} d-none d-sm-block`}
        aria-current="page"
        onClick={()=>{props.switchPage(props.page)}}
      >
        <span className="page-link">
          {props.page}<span className="visually-hidden">(current)</span>
        </span>
      </li>
    )
  }

PaginationTab.propTypes = {
    currentPage: PropTypes.number,
    page: PropTypes.number,
    switchPage: PropTypes.func
}

