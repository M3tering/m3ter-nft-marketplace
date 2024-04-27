import { useCallback, useEffect, useState } from "react"
import {ethers} from "ethers"

export default function useWeb3(){
    let [requireInstall, setRequireInstall] = useState(false)
    let [provider, setProvider] = useState(null)
    let [signer, setSigner] = useState(null)
    let [networkStatus, setNetworkStatus] = useState("")
    let [account, setAccount] = useState("")


    async function connectWallet(){
        if(!requireInstall && provider){
            let accounts = await provider.send("eth_requestAccounts")
            let signer = provider.getSigner()
            let network = await provider.getNetwork()
            setAccount(accounts[0])
            setProvider(provider)
            setSigner(signer)
            setNetworkStatus(network.name)
        }
    }

    const getCurrentConnectedWallet = useCallback(async ()=>{
        if(!requireInstall && provider){
            let accounts = await provider.send("eth_accounts", [])
            let network = await provider.getNetwork()
            if(accounts.length > 0){
                let signer = provider.getSigner()
                setAccount(accounts[0])
                setSigner(signer)
                setNetworkStatus(network.name)
            }
        }
    },[requireInstall, provider])

    async function addWalletListener(){
        if(!requireInstall){
          window.ethereum.on('accountsChanged', (accounts)=>{
            setAccount(accounts[0])
          })
        }
      }
    
    useEffect(()=>{
        if(window == undefined && window.ethereum == undefined){
            setRequireInstall(true)
            return
        }else{
            let _provider = new ethers.providers.Web3Provider(window.ethereum)
            setRequireInstall(false)
            if(!provider){
                setProvider(_provider)
            }
            getCurrentConnectedWallet()
            addWalletListener()
        }
    }, [getCurrentConnectedWallet, provider])

    return{
        requireInstall,
        account,
        networkStatus,
        provider,
        signer,
        connectWallet,
    }
}