import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import {ethers} from "ethers";
import Company from "../../nft/artifacts/nft/contracts/Company.sol/Company.json";

// the smart contract address on testnet
const CONTRACT_ADDRESS = "0xaB6576c2351F3E41EB7B9e79b412F047008749B6";

/**
 * Utility function to wait for a global variable to appear. This is needed to detect the
 * BinanceChain wallet object.
 */
const waitForGlobal = function(key, callback) {
  if (window && window[key]) {
    console.log(callback);
    callback();
  } else {
    setTimeout(function() {
      waitForGlobal(key, callback);
    }, 100);
  }
};

// https://docs.binance.org/smart-chain/wallet/wallet_api.html

const IndexScreen = () => {
  const [tokens, setTokens] = useState([]);
  const [nextCompany, setNextCompany] = useState("");
  const [receiver, setReceiver] = useState("");
  const { account, connect } = useWallet();

  // automatically connect to Binance Chain Wallet and set up providers and contract
  async function init() {
    await connect("bsc");
    const provider = new ethers.providers.Web3Provider(window.BinanceChain)
    const signer = provider.getSigner(account);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, Company.abi, signer);

    // listen for minted companies
    contract.on("UKCompanyMinted", async () => {
      console.log('Company Minted', arguments);
      await loadTokens();
    });
  }

  async function loadTokens() {
    const provider = new ethers.providers.Web3Provider(window.BinanceChain)
    const signer = provider.getSigner(account);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, Company.abi, signer);
    const address = await signer.getAddress();
    setTokens(await contract.getTokensForOwner(address));
  }

  useEffect(() => {
    waitForGlobal("BinanceChain", async () => {
      await init();
      await loadTokens();
    });
  }, []);

  async function mintCompany(e) {
    e.stopPropagation();
    const provider = new ethers.providers.Web3Provider(window.BinanceChain)
    const signer = provider.getSigner(account);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, Company.abi, signer);
    await contract.registerCompany(receiver, nextCompany, "ipfs://some-url-containing-json-metadata");
    setNextCompany("");
  }

  return (<Layout>
    <h1 className="govuk-heading-xl">Company NFT's</h1>
    {account &&
      <div className="govuk-inset-text">Connected Account: <strong>{account}</strong></div>}

    <fieldset className="govuk-fieldset">
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
        <h1 className="govuk-fieldset__heading">Mint a new Company</h1>
      </legend>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="new-company">Company Number</label>
        <input value={nextCompany} className="govuk-input" id="new-company" name="new-company" type="text" onChange={e => setNextCompany(e.target.value)} />
      </div>
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor="receiver">Receiver Address</label>
        <input value={receiver} className="govuk-input" id="receiver" name="receiver" type="text" onChange={e => setReceiver(e.target.value)} />
      </div>
      <div className="govuk-form-group">
        <button className="govuk-button" onClick={mintCompany}>Mint</button>
      </div>
    </fieldset>

    <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
    
    <h2 className="govuk-heading-m">My Company NFT's</h2>

    {tokens.length == 0 && <div className="govuk-warning-text">
      <span className="govuk-warning-text__icon">!</span>
      <strong className="govuk-warning-text__text">
      You do not have any Company NFT's
      </strong>
    </div>}

    {tokens.length > 0 &&
    <table className="govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <td className="govuk-table__header">Company Number</td>
          <td className="govuk-table__header">Token ID</td>
          <td className="govuk-table__header">Token URI</td>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {tokens.map( (token, i) => {
          return (<tr className="govuk-table__row" key={token.tokenID}>
              <td className="govuk-table__cell" key={`col-1-${i}`}>{token.companyNumber}</td>
              <td className="govuk-table__cell" key={`col-2-${i}`}>{token.tokenId.toNumber()}</td>
              <td className="govuk-table__cell" key={`col-3-${i}`}>{token.tokenURI}</td>
            </tr>
          );
        })}
      </tbody>
    </table>}
  </Layout>);
}

export default IndexScreen;