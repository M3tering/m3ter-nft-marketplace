import { useEffect, useState } from "react"
import { createWeb3Modal, defaultConfig, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react'
import {ethers} from "ethers"
const projectId = "df7d214d4156a88d723cfde8d481c616"
const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}
const sepolia = {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'ETH',
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

export default function useWeb3(){
    const {address, chainId, isConnected} = useWeb3ModalAccount()
    const {walletProvider} = useWeb3ModalProvider()
    const initial_provider = new ethers.providers.JsonRpcProvider(sepolia.rpcUrl)

    let [provider, setProvider] = useState(initial_provider)
    let [providerType, setProviderType] = useState(0)
    let [signer, setSigner] = useState(null)

    function createModal(){
        createWeb3Modal({
            ethersConfig,
            chains: [mainnet, sepolia],
            projectId,
            enableAnalytics: true // Optional - defaults to your Cloud configuration
        })
    }
    

    useEffect(()=>{
        async function handleWeb3Inits(){
            if(isConnected && providerType == 0){
                let _provider = new ethers.providers.Web3Provider(walletProvider)
                let _signer = await _provider.getSigner()
                setProviderType(1)
                setProvider(_provider)
                setSigner(_signer)
            }else if(!isConnected){
                setProviderType(0)
                setProvider(initial_provider)
            }
        }
        handleWeb3Inits()
    },[isConnected, walletProvider, providerType, initial_provider])

    return{
        createModal,
        account: address,
        networkStatus: chainId,
        provider,
        signer
    }
}