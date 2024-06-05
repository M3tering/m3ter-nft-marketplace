import { useEffect, useState } from "react"
import { createWeb3Modal, defaultConfig, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react'
import {ethers} from "ethers"
const projectId = "df7d214d4156a88d723cfde8d481c616"

const network = {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'xDAI',
    rpcUrl: 'https://rpc2.sepolia.org'
}

const metadata = {
    name: 'M3terscan',
    /*description: 'My Website description',
    url: 'https://mywebsite.com', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']*/
}

const ethersConfig = defaultConfig({
    metadata,
    enableEIP6963: true,
    enableInjected: true,
    enableCoinbase: true,
  })
const initial_provider = new ethers.providers.JsonRpcProvider(network.rpcUrl)

export default function useWeb3(){
    const {address, chainId, isConnected} = useWeb3ModalAccount()
    const {walletProvider} = useWeb3ModalProvider()

    let [provider, setProvider] = useState(initial_provider)
    let [providerType, setProviderType] = useState("jsonrpc")
    let [signer, setSigner] = useState(null)
    let [currency, setCurrency] = useState("")

    function createModal(){
        createWeb3Modal({
            ethersConfig,
            chains: [network],
            projectId,
            enableAnalytics: true // Optional - defaults to your Cloud configuration
        })
    }
    

    useEffect(()=>{
        async function handleWeb3Inits(){
            if(isConnected && providerType == "jsonrpc"){
                let _provider = new ethers.providers.Web3Provider(walletProvider)
                let _signer = _provider.getSigner()
                setProviderType("web3provider")
                setProvider(_provider)
                setSigner(_signer)
            }else if(!isConnected){
                setProviderType("jsonrpc")
                setProvider(initial_provider)
            }
        }
        handleWeb3Inits()
        setCurrency(network.currency)
    },[isConnected, walletProvider, providerType])

    return{
        createModal,
        account: address,
        networkStatus: chainId,
        provider,
        currency,
        signer
    }
}