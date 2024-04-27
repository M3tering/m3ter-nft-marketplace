import { useEffect, useState } from "react";
import "../CSS/styles.css";
//import SideBar from "./SideBar";
import PageTitle from "../common/PageTitle";
import useListings from "../web3/hooks/useListings";
import Loader from "./Loader";

function ListBody() {
  let {listingsLoading, listingsStatus, resetListingsStatus, listNewMeter} = useListings()

  let [tokenId, setTokenId] = useState("")
  let [priceDai, setPriceDai] = useState("")

  function submitListing(){
    console.log("tokenId", typeof tokenId, tokenId, "priceDai", typeof priceDai, priceDai)
    listNewMeter(tokenId, priceDai)
  }

  useEffect(()=>{
    if(listingsStatus.error){
      setTimeout(()=>{
        resetListingsStatus()
      }, 3000)
    }
  })
 
  return (
    <div>
      <PageTitle />
      <div className="container mb-5 pb-3">
        <div className="bg-light px-4 shadow-lg rounded-3 overflow-hidden">
          <div className="row">
            {/* <!-- Sidebar--> */}
                {/*<SideBar />*/}
            {/* <!-- Content--> */}
            <section className="col-lg-9 pt-lg-4 pb-4 mb-3">
              <div className="pt-2 px-4 ps-lg-0 pe-xl-5">
                <h1 className="h3 mb-4 pb-2 text-sm-start text-center">
                  My Items
                </h1>
                
                {listingsStatus.error && <div className="text-center p-2" style={{color: "red"}}> {listingsStatus.message} </div>}

                <div className="row row-cols-md-3 row-cols-sm-2 row-cols-1 gy-sm-4 gy-3 gx-3 mb-4">
                    <div>
                        <label>Token Id*</label>
                        <input value={tokenId} onChange={(e)=>{setTokenId(parseInt(e.target.value))}} placeholder="token Id" type="number"/>
                    </div>
                    <div>
                        <label>Price* ~$1 = 1DAI</label>
                        <input value={priceDai} onChange={(e)=>{setPriceDai(parseFloat(e.target.value))}} placeholder="Price (Dai)" type="number" />
                    </div>
                </div>
                <button disabled={listingsLoading} onClick={submitListing} className="btn btn-accent" >
                  {listingsLoading && <Loader />}
                  List New Meter
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListBody;
