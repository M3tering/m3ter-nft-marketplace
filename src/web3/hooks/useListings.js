import { useEffect, useState } from "react";
import useContracts from "./useContracts";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { listingContractAddress } from "../../utils/constants";
import useWeb3 from "./useWeb3";
import { seiveErrorMsg } from "../../utils/errors";

export default function useListings(){
    const navigate = useNavigate()
    let {listingContract, meterContract} = useContracts()
    const {signer, } = useWeb3()

    const defaultStatus = {error: false, success: false, message: ""}

    let [listings, setListings] = useState([])
    let [revenue, setRevenue] = useState(null);
    let [totalListings, setTotalListings] = useState(0)

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
            let errmsg = seiveErrorMsg(err.message)
            setListingsLoading(false)
            setListingsStatus({error: true, success: false, message: errmsg}) 
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
                await approveResult.wait()
            }
            
            let result = await listingContractWithSigner.createListing(tokenId, convertedPrice)
            await result.wait()
            fetchAllListing()
            navigate("/account")
        }catch(err){
            let errmsg = seiveErrorMsg(err.message)
            setListingsLoading(false)
            setListingsStatus({error: true, success: false, message: errmsg})
        }
    }
    
    async function fetchAllListing(){
        setListingsLoading(true)
        let all_listings = await listingContract?.getAllListing()
        let total_listings = await listingContract?.totalListings()
        setListings(all_listings)
        setTotalListings(total_listings)
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
            let errmsg = seiveErrorMsg(err.message)
            setRevenueStatus({error: true, success: false, message: errmsg})
            setRevenueLoading(false)
        }
    }

    async function claimRevenue(){
        setRevenueLoading(true)
        if(revenue == 0){
            setRevenueLoading(false)
            setRevenueStatus({error: true, success: false, message: "you don't have enough balance"})
            return
        }
        try{
            let listingContractWithSigner = await listingContract.connect(signer)
            await listingContractWithSigner.withdrawRevenue()
            setRevenueLoading(false)
        }catch(err){
            let errmsg = seiveErrorMsg(err.message)
            console.log("err", err, "err.message", err.message, "errmsg", errmsg)
            setRevenueStatus({error: true, success: false, message: errmsg})
            setRevenueLoading(false)
        }
    }

    async function removeMeter(index){
        try{
            let listingContractWithSigner = await listingContract.connect(signer)
            let result = await listingContractWithSigner.removeListing(index)
            await result.wait()
            fetchAllListing()
            setListingsLoading(false)
        }catch(err){
            let errmsg = seiveErrorMsg(err.message)
            setListingsStatus({error: true, success: false, message: errmsg})
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
        totalListings,
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