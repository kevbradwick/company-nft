const { expect } = require("chai");

describe("Company", () => {
  let token,
  owner,
  account1,
  account2;

  beforeEach(async () => {
    const Token = await ethers.getContractFactory("Company");
    token = await Token.deploy();
    [owner, account1, account2] = await ethers.getSigners();
  });

  it("starts life with no tokens", async () => {
    const balance = await token.balanceOf(owner.address);
    expect(await balance.toNumber()).to.equal(0);
  });

  it("mints a company", async () => {
    await token.registerCompany(owner.address, "00006400", "");
    const balance = await token.balanceOf(owner.address);
    expect(await balance.toNumber()).to.equal(1);
  });

  it("fails when company already minted", async () => {
    await token.registerCompany(account1.address, "00006400", "");
    await expect(token.registerCompany(account1.address, "00006400", "")).to.be.revertedWith("Company is already registered");
  });

  it("emits an event when company is minted", async () => {
    const expectEvent = {
      tokenId: "1",
      companyNumber: "00006400",
      tokenURI: ""
    };

    await expect(token.registerCompany(account1.address, "00006400", ""))
      .to.emit(token, "UKCompanyMinted");
  });

  describe("getTokensForOwner", () => {
    it("returns the list of company tokens for an account", async () => {
      await token.registerCompany(account1.address, "00006400", "url1");
      await token.registerCompany(account1.address, "00006401", "url2");

      const tokens = await token.getTokensForOwner(account1.address);

      expect(tokens).to.have.lengthOf(2);
      expect(tokens[0]).to.have.property('tokenId');
      expect(tokens[0]).to.have.property('companyNumber', '00006400');
      expect(tokens[0]).to.have.property('tokenURI', 'url1');
    });
  });
});