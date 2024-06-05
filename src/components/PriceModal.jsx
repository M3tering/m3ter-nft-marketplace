import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Loader from "./Loader";

function PriceModal({loading, priceDai, setPriceDai, id, showModal, closeModal, submitListing}){
   console.log("priceDai", priceDai, "id", id)
   let [showErr, setShowErr] = useState(false)

   function submit(){
    if(priceDai !== ""){
      submitListing()
    }else{
      setShowErr(true)
    }
   }

   useEffect(()=>{
    setShowErr(false)
   }, [priceDai])
    return(
      <div className="modal-style" style={{display: showModal ? "flex" : "none"}}>
        <div className="list-form-wrapper">
          {loading && "please wait..."}
            <div className="list-form-inputs-wrap">
                <div>
                    <span>Token Id</span>: {id}
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label>Price (in xDAI)*</label>
                    <input value={priceDai} onChange={(e)=>{setPriceDai(parseFloat(e.target.value))}} placeholder="(~$1 = 1xDAI)" type="number" />
                    {showErr && <div style={{color: "red"}}>price cannot be empty </div>}
                </div>
            </div>
            <div className="list-form-button-wrap">
                <Button disabled={loading} className="btn btn-success" onClick={submit}>
                  {loading ? <Loader /> : "List"}
                </Button>
                <Button disabled={loading} className="btn btn-error" onClick={closeModal}>
                  Cancel
                </Button>
            </div>
        </div>
      </div>
    )
  }
  
  PriceModal.propTypes = {
    loading: PropTypes.bool,
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    id: PropTypes.string,
    priceDai: PropTypes.number,
    setPriceDai: PropTypes.func,
    submitListing: PropTypes.func
  }

  export default PriceModal;