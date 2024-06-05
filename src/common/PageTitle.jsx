import { M3terHead, m3terAlias } from "m3ters";
import "../CSS/styles.css";
import { useContext, useEffect } from "react";
import Web3Context from "../contexts/Web3Context";
import useListings from "../web3/hooks/useListings";
import Loader from "../components/Loader";

function PageTitle() {
  const {account, currency} = useContext(Web3Context)
  let {listings, claimRevenue, fetchRevenue, revenue, revenueLoading, revenueStatus} = useListings()

  async function copyAddress(){
    navigator.clipboard.writeText(account)
  }

  async function handleClaimRevenue(){
    await claimRevenue()
    fetchRevenue(account)
  }


  useEffect(()=>{
    if(listings && listings.length > 0){
      fetchRevenue(account)
    }
  }, [account, listings])

  return (
    <div className="page-title-overlap bg-accent pt-4">
      <div className="container d-flex flex-wrap flex-sm-nowrap justify-content-center justify-content-sm-between align-items-center mb-2 pt-2">
        <div className="d-flex align-items-center">
          <div
            className="img-thumbnail rounded-circle position-relative flex-shrink-0"
            style={{ width: "6.375rem", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <M3terHead seed={account} size={80} />
          </div>
          <div className="ps-3">
            <h3 className="h5 mb-2 text-light">
              {account.slice(0, 7)+ "..." + account.slice(account.length - 4)}
              <i
                className="ci-copy ms-2 fs-sm"
                onClick={copyAddress}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Copy"
              ></i>
            </h3>
            <span className="d-block text-light fs-sm opacity-60">
              {m3terAlias(account)}
            </span>
          </div>
        </div>
        <div className="my-sm-0 my-3 text-sm-end pt-1">
            {
              revenueLoading
              ?
              <div>
                <Loader color="white" />
              </div>
              :
              revenueStatus.error
              ?
              <div style={{color: "red"}}>
                {revenueStatus.message}
              </div>
              :
              <div className="d-flex text-light align-items-center text-nowrap fs-sm">
                Revenue: {revenue} {currency}
              </div>
            }
          <button disabled={revenueLoading} onClick={handleClaimRevenue}>
            {revenueLoading && <Loader />}
            Claim Revenue
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageTitle;
