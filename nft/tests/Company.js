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
});