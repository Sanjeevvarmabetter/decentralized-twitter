const { ethers } = require("hardhat");

const main = async () => {
  const contractFactory = await ethers.getContractFactory("TwitterContract");
  const contract = await contractFactory.deploy();

  console.log("Contract Deployed to:", contract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
f
runMain();
