import { useCallback, useEffect, useState } from "react"
import useContracts from "./useContracts"
import { seiveErrorMsg } from "../../utils/errors"

export default function useMeters(userAddress){
    const { meterContract }= useContracts()

    let [allMetersByUser, setAllMetersByUser] = useState(null)
    let [allMetersLoading, setAllMetersLoading] = useState(false)
    let [allMetersStatus, setAllMetersStatus] = useState({error: false, success: false, message: ""})

    const fetchAllMetersByUser = useCallback(async (address)=>{
        setAllMetersLoading(true)
        try{
            let _balance = await meterContract?.balanceOf(address)
            let userBalance = Number(_balance)
            let metersArr = [];
            console.log("address", address, "_balance", _balance, "converted balance", Number(_balance))
            for(let i = 0; i < userBalance; i++){
                let _meterByUser = await meterContract?.tokenOfOwnerByIndex(address, i)
                let _convertedMeterByuser = Number(_meterByUser)
                metersArr.push(_convertedMeterByuser)
                console.log("meters", _meterByUser, "converted", _convertedMeterByuser)
            }
            setAllMetersByUser(metersArr)
            setAllMetersLoading(false)
        }catch(err){
            let errmsg = seiveErrorMsg(err.message)
            setAllMetersStatus({error: true, success: false, message: errmsg || "an error occured while fetching meters"})
        }
    }, [meterContract])

    useEffect(()=>{
        fetchAllMetersByUser(userAddress)
    }, [userAddress, fetchAllMetersByUser])
    

    return{
        allMetersByUser,
        allMetersLoading,
        allMetersStatus
    }
}