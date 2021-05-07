import React from "react";
import {BscConnector, UserRejectedRequestError} from "@binance-chain/bsc-connector";
import {ConnectionRejectedError, UseWalletProvider} from "@binance-chain/bsc-use-wallet";

const connectors = {
  bsc: {
    web3ReactConnector() {
      // chain id's
      // 56 (Mainnet) https://bsc-dataseed.binance.org/ | https://bscscan.com
      // 97 (Testnet) https://data-seed-prebsc-1-s1.binance.org:8545/ | https://testnet.bscscan.com
      return new BscConnector({supportedChainIds: [97]})
    },
    handleActivationError(err) {
      if (err instanceof UserRejectedRequestError) {
        return new ConnectionRejectedError();
      }
    }
  }
}

const App = ({Component, pageProps}) => {
  return <UseWalletProvider connectors={connectors} chainId={97}>
      <Component {...pageProps} />
    </UseWalletProvider>
}

export default App;