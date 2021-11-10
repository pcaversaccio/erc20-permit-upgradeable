import { artifacts, contract } from "hardhat";

const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

const ERC1967Proxy = artifacts.require("ERC1967Proxy");
const UUPSUpgradeableMock = artifacts.require("UUPSUpgradeableMockUpgradeable");
const UUPSUpgradeableUnsafeMock = artifacts.require(
  "UUPSUpgradeableUnsafeMockUpgradeable"
);
const UUPSUpgradeableBrokenMock = artifacts.require(
  "UUPSUpgradeableBrokenMockUpgradeable"
);
const CountersImpl = artifacts.require("CountersImplUpgradeable");

// eslint-disable-next-line no-unused-vars
contract("UUPSUpgradeable", function (accounts) {
  before(async function () {
    this.implInitial = await UUPSUpgradeableMock.new();
    this.implUpgradeOk = await UUPSUpgradeableMock.new();
    this.implUpgradeUnsafe = await UUPSUpgradeableUnsafeMock.new();
    this.implUpgradeBroken = await UUPSUpgradeableBrokenMock.new();
    this.implUpgradeNonUUPS = await CountersImpl.new();
  });

  beforeEach(async function () {
    const { address } = await ERC1967Proxy.new(this.implInitial.address, "0x");
    this.instance = await UUPSUpgradeableMock.at(address);
  });

  it("upgrade to upgradeable implementation", async function () {
    const { receipt } = await this.instance.upgradeTo(
      this.implUpgradeOk.address
    );
    expectEvent(receipt, "Upgraded", {
      implementation: this.implUpgradeOk.address,
    });
  });

  it("upgrade to upgradeable implementation with call", async function () {
    const { receipt } = await this.instance.upgradeToAndCall(
      this.implUpgradeOk.address,
      this.implUpgradeOk.contract.methods.increment().encodeABI()
    );
    expectEvent(receipt, "Upgraded", {
      implementation: this.implUpgradeOk.address,
    });
  });

  it("upgrade to and unsafe upgradeable implementation", async function () {
    const { receipt } = await this.instance.upgradeTo(
      this.implUpgradeUnsafe.address
    );
    expectEvent(receipt, "Upgraded", {
      implementation: this.implUpgradeUnsafe.address,
    });
  });

  it("reject upgrade to broken upgradeable implementation", async function () {
    await expectRevert(
      this.instance.upgradeTo(this.implUpgradeBroken.address),
      "ERC1967Upgrade: upgrade breaks further upgrades"
    );
  });

  // delegate to a non existing upgradeTo function causes a low level revert
  it("reject upgrade to non uups implementation", async function () {
    await expectRevert(
      this.instance.upgradeTo(this.implUpgradeNonUUPS.address),
      "Address: low-level delegate call failed"
    );
  });

  it("reject proxy address as implementation", async function () {
    const { address } = await ERC1967Proxy.new(this.implInitial.address, "0x");
    const otherInstance = await UUPSUpgradeableMock.at(address);

    // infinite loop reverts when a nested call is out-of-gas
    await expectRevert(
      this.instance.upgradeTo(otherInstance.address),
      "Address: low-level delegate call failed"
    );
  });
});
