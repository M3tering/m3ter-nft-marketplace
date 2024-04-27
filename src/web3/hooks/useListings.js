import { useContext, useEffect, useState } from "react";
import useContracts from "./useContracts";
import Web3Context from "../../contexts/Web3Context";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { listingContractAddress } from "../../utils/constants";

export default function useListings(){
    const navigate = useNavigate()
    let {listingContract, meterContract} = useContracts()
    const {signer} = useContext(Web3Context)

    let [listings, setListings] = useState([])
    let [listingsLoading, setListingsLoading] = useState(false)
    let [listingsStatus, setListingsStatus] = useState({error: false, success: false, message: ""})


    async function purchaseMeter(price, index){
        setListingsLoading(true)
        try{
            let listingContractWithSigner = await listingContract.connect(signer)
            let result = await listingContractWithSigner.purchaseListing(index, {value: price})
            console.log(result)
            navigate("/account")
            setListingsLoading(false)
        }catch(err){
            setListingsLoading(false)
            setListingsStatus({error: true, success: false, message: err.errorName || err.message}) 
        }
    }

    async function listNewMeter(tokenId, price){
        setListingsLoading(true)
        let priceWei = price * (10**18)
        let convertedPrice = ethers.BigNumber.from(priceWei.toString())
        console.log(priceWei, convertedPrice)
        try{
            let meterContractWithSigner = await meterContract.connect(signer)
            let listingContractWithSigner = await listingContract.connect(signer)
            let approvalAddress = await meterContractWithSigner.getApproved(tokenId)
            
            if(approvalAddress != listingContractAddress){
                let approveResult = await meterContractWithSigner.approve(listingContractAddress, tokenId)
                console.log("approve result",approveResult)
            }
            
            let result = await listingContractWithSigner.createListing(tokenId, convertedPrice)
            console.log("listingResult", result)
            fetchAllListing()
            navigate("/account")
        }catch(err){
            console.log("error", err)
            setListingsLoading(false)
            setListingsStatus({error: true, success: false, message: err.errorName || err.message})
        }
    }
    
    async function fetchAllListing(){
        setListingsLoading(true)
        let all_listings = await listingContract?.getAllListing()
        setListings(all_listings)
        setListingsLoading(false)
    }

    function resetListingsStatus(error=false, success=false, msg=""){
        setListingsStatus({error: error, success: success, message: msg})
    }

    useEffect(()=>{
        fetchAllListing()
    }, [listingContract])

    return {
        listings,
        listingsLoading,
        listingsStatus,
        resetListingsStatus,
        purchaseMeter,
        listNewMeter
    }
}