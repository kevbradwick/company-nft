// demo script that shows how to perform common tasks using ethers

const { ethers } = require("ethers");
const {abi} = require("../artifacts/nft/contracts/Company.sol/Company.json");
const hh = require("hardhat");

async function main() {
  const [signer] = await hh.ethers.getSigners();
  const address = await signer.getAddress();

  // deploy contract and create an instance of it.
  const Company = await hh.ethers.getContractFactory("Company");
  const token = await Company.deploy();

  // this is what you would write in the frontend code. you need three things to interact
  // with a deployed contract.
  //
  // 1. its address (or ens name)
  // 2. the abi json conde
  // 3. an instance of a signer (this represents the account you are acting on behald of)
  const contract = new ethers.Contract(token.address, abi, signer);

  contract.on("UKCompanyMinted", () => {
    console.log('EVENT: UKCompanyMinted');
  });

  console.log(`contract address:   ${contract.address}`);
  console.log(`using account:      ${address}`);

  // mint a company
  const tx = await contract.registerCompany(signer.getAddress(), "00006400", "http://...");
  console.log(`Registered company: 00006400`);
  console.log(`TX Hash:            ${tx.hash}`);

  // try and mint the same company
  try {
    console.log('trying to mint the same company....');
    await contract.registerCompany(signer.getAddress(), "00006400", "http://...");
  } catch (e) {
    console.log('failed to register same company...');
  }

  // get a list of companies
  const nftList = await contract.getTokensForOwner(address);
  console.log('-------------------------------------------');
  console.log(`Listing contracts for account ${address}...`);
  nftList.forEach((nft) => {
    console.log(`Company Number: ${nft.companyNumber}, Token ID: ${nft.tokenId}, Token URI: ${nft.tokenURI}`);
  });

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
