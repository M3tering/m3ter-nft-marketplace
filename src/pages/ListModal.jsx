import BaseLayout from "../common/BaseLayout";
import BacktoTop from "../components/BacktoTop";
import ListBody from "../components/ListBody";
import ConnectWalletComponent from "../components/ConnectWalletComponent";
import { useContext } from "react";
import Web3Context from "../contexts/Web3Context";

function ListModal() {
  let {account, connectWallet} = useContext(Web3Context)
  return (
    <BaseLayout navProp={{ style: { paddingBottom: "90px" } }}>
      {
        account
        ?
        <ListBody />
        :
        <ConnectWalletComponent connectWallet={connectWallet} />
      }
      <BacktoTop />
    </BaseLayout>
  );
}

export default ListModal;
