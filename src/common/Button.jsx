import PropTypes from "prop-types"

function Button({ className, ...rest }) {
    return (
      <button {...rest} className={`btn ${className}`} type="button"></button>
    );
  }
  
  Button.propTypes = {
    className: PropTypes.string
  }
export default Button;  