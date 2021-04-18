import React from "react";
import {BscConnector, UserRejectedRequestError} from "@binance-chain/bsc-connector";
import {ConnectionRejectedError, UseWalletProvider} from "@binance-chain/bsc-use-wallet";

const connectors = {
  bsc: {
    web3ReactConnector() {
      return new BscConnector({supportedChainIds: [56, 97]})
    },
    handleActivationError(err) {
      if (err instanceof UserRejectedRequestError) {
        return new ConnectionRejectedError();
      }
    }
  }
}

const App = ({Component, pageProps}) => {
  return <UseWalletProvider connectors={connectors}>
      <Component {...pageProps} />
    </UseWalletProvider>
}

export default App;