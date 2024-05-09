import BaseLayout from "../common/BaseLayout";
import BacktoTop from "../components/BacktoTop";
import SigninBody from "../components/SigningBody";
import ConnectWalletComponent from "../components/ConnectWalletComponent";
import { useContext } from "react";
import Web3Context from "../contexts/Web3Context";

function SigninModal() {
  let {account} = useContext(Web3Context)
  return (
    <BaseLayout navProp={{ style: { paddingBottom: "90px" } }}>
      {
        account
        ?
        <SigninBody />
        :
        <ConnectWalletComponent />
      }
      <BacktoTop />
    </BaseLayout>
  );
}

export default SigninModal;
