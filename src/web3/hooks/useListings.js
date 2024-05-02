import { useEffect, useState } from "react";
import useContracts from "./useContracts";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { listingContractAddress } from "../../utils/constants";
import useWeb3 from "./useWeb3";

export default function useListings(){
    const navigate = useNavigate()
    let {listingContract, meterContract} = useContracts()
    const {signer, } = useWeb3()

    const defaultStatus = {error: false, success: false, message: ""}

    let [listings, setListings] = useState([])
    let [revenue, setRevenue] = useState(null);

    let [listingsLoading, setListingsLoading] = useState(false)
    let [revenueLoading, setRevenueLoading] = useState(false);
    
    let [revenueStatus, setRevenueStatus] = useState(defaultStatus)
    let [listingsStatus, setListingsStatus] = useState(defaultStatus)


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

    async function fetchRevenue(owner_address){
        setRevenueLoading(true)
        try{
            let revenue = await listingContract?.revenueOf(owner_address)
            console.log(revenue)
            setRevenue(Number(revenue) / 10**18)
            setRevenueLoading(false)
        }catch(err){
            console.log(err)
            setRevenueStatus({error: true, success: false, message: err.errorName || err.message})
            setRevenueLoading(false)
        }
    }

    async function claimRevenue(){
        setRevenueLoading(true)
        try{
            let listingContractWithSigner = await listingContract.connect(signer)
            let result = await listingContractWithSigner.withdrawRevenue()
            console.log(result);
            setRevenueLoading(false)
        }catch(err){
            console.log(err.errorName, err.message)
            setRevenueStatus({error: true, success: false, message: err.errorName || err.message})
            setRevenueLoading(false)
        }
    }

    async function removeMeter(index){
        try{
            let listingContractWithSigner = await listingContract.connect(signer)
            let result = await listingContractWithSigner.removeListing(index)
            console.log(result)
            fetchAllListing()
            setListingsLoading(false)
        }catch(err){
            console.log(err.errorName, err.message)
            setListingsStatus({error: true, success: false, message: err.errorName || err.message})
            setListingsLoading(false)
        }
    }

    function resetListingsStatus(){
        setListingsStatus(defaultStatus)
    }

    function resetRevenueStatus(){
        setRevenueStatus(defaultStatus)
    }

    useEffect(()=>{
        fetchAllListing()
    }, [listingContract, ])

    return {
        listings,
        revenue,
        claimRevenue,
        listingsLoading,
        revenueLoading,
        listingsStatus,
        revenueStatus,
        fetchRevenue,
        removeMeter,
        resetListingsStatus,
        resetRevenueStatus,
        purchaseMeter,
        listNewMeter
    }
}