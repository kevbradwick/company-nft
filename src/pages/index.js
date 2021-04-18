import React, { useState } from "react";
import Layout from "../components/layout";
import { useWallet } from "@binance-chain/bsc-use-wallet";


const IndexPage = () => {
  const [connected, setConnected] = useState(false);
  const { account, connect } = useWallet();
  const handleConnect = (e) => {
    e.stopPropagation();
    connect('bsc');
    setConnected(true);
  };

  return <Layout>
    <h1 className="govuk-heading-xl">My Company NFT's</h1>
    {account &&
      <div className="govuk-inset-text">Connected Account: <strong>{account}</strong></div>}

    {!connected &&
      <button className="govuk-button" onClick={handleConnect}>Connect BSC Wallet</button>}

    <h2 className="govuk-heading-m">Mint a new Company NFT</h2>

    <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />

    <h2 className="govuk-heading-m">My Company NFT's</h2>

  </Layout>
};

// https://docs.binance.org/smart-chain/wallet/wallet_api.html


export default IndexPage;