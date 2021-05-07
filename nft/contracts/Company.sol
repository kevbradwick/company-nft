// contracts/Company.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Company is ERC721URIStorage, Ownable {

  // maintain an internal counter for token id's
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // maps uk company numbers to token uuid
  mapping(string => uint256) _companyNumberTokenMap;

  struct UKCompany {
    uint256 tokenId;
    string companyNumber;
    string tokenURI;
  }

  // maps token id to company number
  mapping(address => UKCompany[]) _ownerToUKCompanyMap;

  // event that is emitted when a new uk company token is minted
  event UKCompanyMinted(UKCompany compnany);

  constructor() ERC721("UKCompany", "UKCO") {}

  /**
   * Register a new company to an account
   */
  function registerCompany(address to_, string memory companyNumber_, string memory tokenURI_) public onlyOwner {
    // the contract's unique id for the token
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();

    // check if company is already claimed
    require(_companyNumberTokenMap[companyNumber_] == 0, "Company is already registered");

    // the minted uk company as a struct
    UKCompany memory co = UKCompany(tokenId, companyNumber_, tokenURI_);

    // mint the new token including uri to its metadata
    _mint(to_, co.tokenId);
    _setTokenURI(tokenId, co.tokenURI);

    _companyNumberTokenMap[co.companyNumber] = co.tokenId;
    _ownerToUKCompanyMap[to_].push(co);

    emit UKCompanyMinted(co);
  }

  function getTokensForOwner(address owner_) public view returns(UKCompany[] memory) {
    return _ownerToUKCompanyMap[owner_];
  }
}