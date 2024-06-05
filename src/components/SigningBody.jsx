import "../CSS/styles.css";
//import SideBar from "./SideBar";
import PageTitle from "../common/PageTitle";
import MyCard from "../common/MyCard";
import useListings from "../web3/hooks/useListings";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useContext } from "react";
import Web3Context from "../contexts/Web3Context";

function SigninBody() {
  let {account} = useContext(Web3Context)
  let {listings, listingsLoading, removeMeter } = useListings()
  let myMeters = listings?.filter((meter)=>(meter[2].toLowerCase() == account.toLowerCase()))

  const CardElement = myMeters?.map((meter) => {
    let index
    listings?.forEach((mtr, i)=>{
      if(mtr == meter)
      index = i
    })
    return (
      <div key={meter.tokenId} className="w-25">
        <MyCard
          className={"col mb-2 card h-10 border-0 shadow py-2 "}
          artClass={"card h-100 border-0"}
          id={meter.tokenId}
          img={meter.tokenId}
          price={meter[1]}
          lg={"../img/Switch/switch.jpg"}
        />
        <button
         disabled={listingsLoading} 
         onClick={()=>{removeMeter(index); }} 
         className="btn btn-danger"
        >
          {listingsLoading && <Loader />}
          Remove Meter
        </button>
      </div>
    );
  });
  return (
    <div>
      <PageTitle />
      <div className="container mb-5 pb-3">
        <div className="bg-light px-4 shadow-lg rounded-3 overflow-hidden">
          <div>
            {/* <!-- Sidebar--> */}
                {/*<SideBar />*/}
            {/* <!-- Content--> */}
            <section className="pt-lg-4 pb-4 mb-3">
              <div className="pt-2 px-4 ps-lg-0 pe-xl-5">
                <h1 className="h3 mb-4 pb-2 text-sm-start text-center">
                  My items for sale
                </h1>
                {/* <!-- Items grid--> */}
                {
                  myMeters?.length == 0
                  ?
                  <div className="p-4 text-center"> You have no items yet </div>
                  :
                  listingsLoading
                  ?
                  <div>
                    <Loader />
                  </div>
                  :
                  <div className="d-flex justify-content-evenly mb-4">
                    {/* <!-- Product--> */}
                    {CardElement}
                  </div>
                }
                <Link className="btn btn-accent" to={"/new-meter"}>
                  List New Meter
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninBody;
