import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export default function ConnectWalletComponent({connectWallet}){
    
    return(
        <div className="connect-wallet-page">
          connect wallet to continue
          <Link
            onClick={connectWallet}
            className="btn btn-sm btn-accent rounded-1 ms-lg-4 ms-2"
          >
            Connect Metamask
          </Link>
        </div>
    )
}

ConnectWalletComponent.propTypes = {
    connectWallet: PropTypes.func
}