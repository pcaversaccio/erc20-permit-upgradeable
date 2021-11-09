import { ethers, upgrades } from "hardhat";
// upgrades.silenceWarnings(); // Uncomment if you want to silence the warnings

async function main() {
  // Deploying `ERC20PermitTransparentUpgradeable`
  const BaseFactoryTransparent = await ethers.getContractFactory(
    "ERC20PermitTransparentUpgradeable"
  );
  const baseFactoryTransparent = await upgrades.deployProxy(
    BaseFactoryTransparent,
    [],
    { initializer: "initialize", kind: "transparent" }
  );
  await baseFactoryTransparent.deployed();

  console.log(
    "ERC20PermitTransparentUpgradeable deployed to:",
    baseFactoryTransparent.address
  );

  // Upgrading `ERC20PermitTransparentUpgradeable`
  const UpgradeTransparent = await ethers.getContractFactory(
    "NewTokenContractTransparent"
  );
  // eslint-disable-next-line no-unused-vars
  const upgradedTransparent = await upgrades.upgradeProxy(
    baseFactoryTransparent.address, // Set Ethereum address here
    UpgradeTransparent
  );

  console.log("ERC20PermitTransparentUpgradeable upgraded");

  // Deploying `ERC20PermitUUPSUpgradeable`
  const BaseFactoryUUPS = await ethers.getContractFactory(
    "ERC20PermitUUPSUpgradeable"
  );
  const baseFactoryUUPS = await upgrades.deployProxy(BaseFactoryUUPS, [], {
    initializer: "initialize",
    kind: "uups",
  });
  await baseFactoryUUPS.deployed();

  console.log(
    "ERC20PermitUUPSUpgradeable deployed to:",
    baseFactoryUUPS.address
  );

  // Upgrading `ERC20PermitUUPSUpgradeable`
  const UpgradeUUPS = await ethers.getContractFactory("NewTokenContractUUPS");
  // eslint-disable-next-line no-unused-vars
  const upgradedUUPS = await upgrades.upgradeProxy(
    baseFactoryUUPS.address, // Set Ethereum address here
    UpgradeUUPS
  );

  console.log("ERC20PermitUUPSUpgradeable upgraded");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
