import { artifacts, contract } from "hardhat";

const {
  shouldBehaveLikeAccessControl,
} = require("./AccessControl.behavior.ts");

const AccessControlMock = artifacts.require(
  "AccessControlMockUpgradeableWithInit"
);

contract("AccessControlUpgradeable", function (accounts) {
  beforeEach(async function () {
    this.accessControl = await AccessControlMock.new({ from: accounts[0] });
  });

  shouldBehaveLikeAccessControl("AccessControl", ...accounts);
});
