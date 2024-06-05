import { useContext, useEffect, useState } from "react";
import "../CSS/styles.css";
//import SideBar from "./SideBar";
import PageTitle from "../common/PageTitle";
import useListings from "../web3/hooks/useListings";
import Loader from "./Loader";
import useMeters from "../web3/hooks/useMeters";
import MyListingCard from "../common/MyListingCard";
import PriceModal from "./PriceModal";
import Web3Context from "../contexts/Web3Context";

function ListBody() {
  let {listingsLoading, listingsStatus, resetListingsStatus, listNewMeter} = useListings()
  let { account } = useContext(Web3Context)
  let { allMetersByUser, allMetersLoading } = useMeters(account)

  let [tokenId, setTokenId] = useState("")
  let [priceDai, setPriceDai] = useState("")

  let [showPriceModal, setShowPriceModal] = useState(false)

  let allMetersArr = allMetersByUser?.map((meter, i)=>(
    <MyListingCard 
      className={"col mb-2"}
      artClass={"card h-100 border-0 shadow"}
      key={`meter${i}`} 
      onSelect={onSelect} 
      id={meter}
    />
  ))

  function onSelect(id){
    setTokenId(id)
    setShowPriceModal(true)
  }

  function closeModal(){
    setShowPriceModal(false)
  }

  async function submitListing(){
    if(priceDai){
      await listNewMeter(tokenId, priceDai)
      if(!listingsLoading){
        setTokenId("")
        setPriceDai("")
        closeModal()
      }
    }
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
                  Meters in wallet
                </h1>
                
                {listingsStatus.error && <div className="text-center p-2" style={{color: "red"}}> {listingsStatus.message} </div>}

                  { 
                    allMetersLoading
                    ?
                    <div>
                      <Loader />
                    </div>
                    :
                    <div className="row row-cols-md-3 row-cols-sm-2 row-cols-1 gy-sm-4 gy-3 gx-3 mb-4">
                      {allMetersArr}
                    </div>
                  }
              </div>
            </section>
          </div>
        </div>
      </div>
      <PriceModal 
        loading={listingsLoading}
        showModal={showPriceModal} 
        id={tokenId} 
        priceDai={priceDai} 
        setPriceDai={setPriceDai} 
        submitListing={submitListing} 
        closeModal={closeModal}
      />
    </div>
  );
}

export default ListBody;
