// contracts/Company.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Company is ERC721URIStorage {

  // maintain an internal counter for token id's
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // maps uk company numbers to token uuid
  mapping(string => uint256) _companyNumberTokenMap;

  // event that is emitted when a new uk company token is minted
  event UKCompanyMinted(string companyNumber, uint256 tokenId);

  constructor() ERC721("UKCompany", "UKCO") {}

  /**
   * Register a new company to an account
   */
  function registerCompany(address to_, string memory companyNumber_, string memory tokenURI_) external {
    // the contract's unique id for the token
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();

    // check if company is already claimed
    require(_companyNumberTokenMap[companyNumber_] == 0, "Company is already registered");

    // mint the new token including uri to its metadata
    _mint(to_, tokenId);
    _setTokenURI(tokenId, tokenURI_);

    _companyNumberTokenMap[companyNumber_] = tokenId;

    emit UKCompanyMinted(companyNumber_, tokenId);
  }
}