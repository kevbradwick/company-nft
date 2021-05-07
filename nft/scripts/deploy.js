async function main() {
  const Company = await ethers.getContractFactory("Company");
  const token = await Company.deploy();

  console.log(`deployed to: ${token.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
