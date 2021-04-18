import React, { PureComponent, useState } from "react";
import Layout from "../components/layout";
import {useWallet} from "@binance-chain/bsc-use-wallet";


const IndexPage = () => {
  const [connected, setConnected] = useState(false);
  // const [account, setAccount] = useState("");
  const { account, connect, reset, status } = useWallet();

  console.log(account);
  const handleConnect = (e) => {
    e.stopPropagation();
    connect('bsc');
    setConnected(true);
  };

  return <Layout>
      <h1 className="govuk-heading-xl">My Company NFT's</h1>

      {account &&
        <p>Connected with: {account}</p>}

      {!connected &&
        <button onClick={handleConnect}>Connect</button>}

    </Layout>
};
  
// https://docs.binance.org/smart-chain/wallet/wallet_api.html


export default IndexPage;