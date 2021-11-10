import { artifacts, contract } from "hardhat";

const { BN } = require("@openzeppelin/test-helpers");

const {
  shouldBehaveLikeERC20Burnable,
} = require("./ERC20Burnable.behavior.ts");
const ERC20BurnableMock = artifacts.require(
  "ERC20BurnableMockUpgradeableWithInit"
);

contract("ERC20BurnableUpgradeable", function (accounts) {
  const [owner, ...otherAccounts] = accounts;

  const initialBalance = new BN(1000);

  const name = "The Real Dogecoin Token";
  const symbol = "WAGMI";

  beforeEach(async function () {
    this.token = await ERC20BurnableMock.new(
      name,
      symbol,
      owner,
      initialBalance,
      { from: owner }
    );
  });

  shouldBehaveLikeERC20Burnable(owner, initialBalance, otherAccounts);
});
