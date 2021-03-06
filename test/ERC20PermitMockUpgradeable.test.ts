import { artifacts, contract } from "hardhat";

const {
  BN,
  constants,
  expectRevert,
  time,
} = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const { MAX_UINT256 } = constants;

// eslint-disable-next-line node/no-extraneous-require
const { fromRpcSig } = require("ethereumjs-util");
const ethSigUtil = require("eth-sig-util");
const Wallet = require("ethereumjs-wallet").default;

const ERC20PermitMock = artifacts.require("ERC20PermitMockUpgradeableWithInit");

const { EIP712Domain, domainSeparator } = require("./eip712.ts");

const Permit = [
  { name: "owner", type: "address" },
  { name: "spender", type: "address" },
  { name: "value", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "deadline", type: "uint256" },
];

contract("ERC20PermitUpgradeable", function (accounts) {
  const [initialHolder, spender] = accounts;

  const name = "The Real Dogecoin Token";
  const symbol = "WAGMI";
  const version = "1";

  const initialSupply = new BN(100);

  beforeEach(async function () {
    this.token = await ERC20PermitMock.new(
      name,
      symbol,
      initialHolder,
      initialSupply
    );
    this.chainId = await this.token.getChainId();
  });

  it("initial nonce is 0", async function () {
    expect(await this.token.nonces(initialHolder)).to.be.bignumber.equal("0");
  });

  it("domain separator", async function () {
    expect(await this.token.DOMAIN_SEPARATOR()).to.equal(
      await domainSeparator(name, version, this.chainId, this.token.address)
    );
  });

  describe("permit", function () {
    const wallet = Wallet.generate();

    const owner = wallet.getAddressString();
    const value = new BN(42);
    const nonce = 0;
    const maxDeadline = MAX_UINT256;

    const buildData = (
      chainId: any,
      verifyingContract: any,
      deadline = maxDeadline
    ) => ({
      primaryType: "Permit",
      types: { EIP712Domain, Permit },
      domain: { name, version, chainId, verifyingContract },
      message: { owner, spender, value, nonce, deadline },
    });

    it("accepts owner signature", async function () {
      const data = buildData(this.chainId, this.token.address);
      const signature = ethSigUtil.signTypedMessage(wallet.getPrivateKey(), {
        data,
      });
      const { v, r, s } = fromRpcSig(signature);

      // eslint-disable-next-line no-unused-vars
      const receipt = await this.token.permit(
        owner,
        spender,
        value,
        maxDeadline,
        v,
        r,
        s
      );

      expect(await this.token.nonces(owner)).to.be.bignumber.equal("1");
      expect(await this.token.allowance(owner, spender)).to.be.bignumber.equal(
        value
      );
    });

    it("rejects reused signature", async function () {
      const data = buildData(this.chainId, this.token.address);
      const signature = ethSigUtil.signTypedMessage(wallet.getPrivateKey(), {
        data,
      });
      const { v, r, s } = fromRpcSig(signature);

      await this.token.permit(owner, spender, value, maxDeadline, v, r, s);

      await expectRevert(
        this.token.permit(owner, spender, value, maxDeadline, v, r, s),
        "ERC20Permit: invalid signature"
      );
    });

    it("rejects other signature", async function () {
      const otherWallet = Wallet.generate();
      const data = buildData(this.chainId, this.token.address);
      const signature = ethSigUtil.signTypedMessage(
        otherWallet.getPrivateKey(),
        { data }
      );
      const { v, r, s } = fromRpcSig(signature);

      await expectRevert(
        this.token.permit(owner, spender, value, maxDeadline, v, r, s),
        "ERC20Permit: invalid signature"
      );
    });

    it("rejects expired permit", async function () {
      const deadline = (await time.latest()) - time.duration.weeks(1);

      const data = buildData(this.chainId, this.token.address, deadline);
      const signature = ethSigUtil.signTypedMessage(wallet.getPrivateKey(), {
        data,
      });
      const { v, r, s } = fromRpcSig(signature);

      await expectRevert(
        this.token.permit(owner, spender, value, deadline, v, r, s),
        "ERC20Permit: expired deadline"
      );
    });
  });
});
