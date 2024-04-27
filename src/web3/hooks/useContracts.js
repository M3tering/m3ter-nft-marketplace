import { useEffect, useState } from "react";
import {ethers} from "ethers"
import useWeb3 from "./useWeb3";
import listingContractAbi from "../abi/listingContractAbi"
import meterContractAbi from "../abi/meterContractAbi";
import { MeterContractAddress, listingContractAddress } from "../../utils/constants";

export default function useContracts(){
    let { provider } = useWeb3()
    let [listingContract, setListingContract] = useState()
    let [meterContract, setMeterContract] = useState()

    useEffect(()=>{
        if(provider){
            let _listingContract = new ethers.Contract(listingContractAddress, listingContractAbi, provider)
            let _meterContract = new ethers.Contract(MeterContractAddress, meterContractAbi, provider)

            setListingContract(_listingContract)
            setMeterContract(_meterContract)
        }
    }, [provider])

    return { listingContract, meterContract }
}