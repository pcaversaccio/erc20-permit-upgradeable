# Permit-Enabled, Upgradeable ERC20 Smart Contract Template

[![build status](https://github.com/pcaversaccio/erc20-permit-upgradeable/actions/workflows/test-contracts.yml/badge.svg)](https://github.com/pcaversaccio/erc20-permit-upgradeable/actions)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

This repository provides two **upgradeable** [ERC20](https://eips.ethereum.org/EIPS/eip-20) smart contract templates that include the new function [`permit`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Permit-permit-address-address-uint256-uint256-uint8-bytes32-bytes32-), which allows users to modify the allowance mapping using a signed message (via [`secp256k1`](https://en.bitcoin.it/wiki/Secp256k1) signatures), instead of through `msg.sender`. Or in other words, the [`permit`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Permit-permit-address-address-uint256-uint256-uint8-bytes32-bytes32-) method, which can be used to change an account's [`ERC-20`](https://eips.ethereum.org/EIPS/eip-20) allowance (see [`IERC20.allowance`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-allowance-address-address-)) by presenting a message signed by the account. By not relying on [`IERC20.approve`](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20-approve-address-uint256-), the token holder account doesn't need to send a transaction, and thus is not required to hold ether (ETH) at all.

The two templates are built on an abstract base contract:

- [`Proxy`](https://docs.openzeppelin.com/contracts/4.x/api/proxy#Proxy): Abstract contract implementing the _core delegation_ functionality.

In order to avoid clashes with the storage variables of the implementation contract behind a proxy, I use [EIP1967](https://eips.ethereum.org/EIPS/eip-1967) storage slots:

- [`ERC1967Upgrade`](https://docs.openzeppelin.com/contracts/4.x/api/proxy#ERC1967Upgrade): Internal functions to get and set the storage slots defined in EIP1967.
- [`ERC1967Proxy`](https://docs.openzeppelin.com/contracts/4.x/api/proxy#ERC1967Proxy): A proxy using EIP1967 storage slots. This proxy contract is **not** upgradeable by default.

There are two alternative ways to add upgradeability to an ERC1967 proxy. Their differences are explained in [Transparent vs UUPS Proxies](#transparent-vs-uups-proxies):

- [`TransparentUpgradeableProxy`](https://docs.openzeppelin.com/contracts/4.x/api/proxy#TransparentUpgradeableProxy): A proxy with a built-in _admin_ and _upgrade_ interface.
- [`UUPSUpgradeable`](https://docs.openzeppelin.com/contracts/4.x/api/proxy#UUPSUpgradeable): An upgradeability mechanism to be included in the _implementation_ for an ERC1967 proxy.

## Transparent vs UUPS Proxies

> _Disclaimer:_ This section is based on [OpenZeppelin's documentation](https://docs.openzeppelin.com/contracts/4.x/api/proxy#transparent-vs-uups). I strongly recommend anyone who is starting to use upgradeable smart contracts to read OpenZeppelin's documentation carefully. You can find more links to get started in the [References](#references) section below.

The original proxies included in OpenZeppelin followed the [Transparent Proxy Pattern](https://blog.openzeppelin.com/the-transparent-proxy-pattern). While this pattern is still provided, OpenZeppelin's recommendation is now shifting towards **UUPS proxies**, which are both lightweight and versatile. The name UUPS comes from [EIP1822](https://eips.ethereum.org/EIPS/eip-1822), which first documented the pattern.

While both of these share the same interface for upgrades, in UUPS proxies the upgrade is handled by the implementation, and can eventually be removed. Transparent proxies, on the other hand, include the upgrade and admin logic in the proxy itself. This means [`TransparentUpgradeableProxy`](https://docs.openzeppelin.com/contracts/4.x/api/proxy#TransparentUpgradeableProxy) is more expensive to deploy than what is possible with UUPS proxies.

UUPS proxies are implemented using an [`ERC1967Proxy`](https://docs.openzeppelin.com/contracts/4.x/api/proxy#ERC1967Proxy). Note that this proxy is **not** by itself upgradeable. It is the role of the implementation to include, alongside the contract's logic, all the code necessary to update the implementation's address that is stored at a specific slot in the proxy's storage space. This is where the [`UUPSUpgradeable`](https://docs.openzeppelin.com/contracts/4.x/api/proxy#UUPSUpgradeable) contract comes in. Inheriting from it (and overriding the [`_authorizeUpgrade`](https://docs.openzeppelin.com/contracts/4.x/api/proxy#UUPSUpgradeable-_authorizeUpgrade-address-) function with the relevant access control mechanism) will turn the contract into a UUPS compliant implementation.

Note that since both proxies use the same storage slot for the implementation address, using a UUPS compliant implementation with a [`TransparentUpgradeableProxy`](https://docs.openzeppelin.com/contracts/4.x/api/proxy#TransparentUpgradeableProxy) might allow non-admins to perform upgrade operations.

By default, the upgrade functionality included in [`UUPSUpgradeable`](https://docs.openzeppelin.com/contracts/4.x/api/proxy#UUPSUpgradeable) contains a security mechanism that will prevent any upgrades to a non-UUPS-compliant implementation. This prevents upgrades to an implementation contract that wouldn't contain the necessary upgrade mechanism, as it would lock the upgradeability of the proxy forever. This security mechanism can be bypassed by either of:

- Adding a flag mechanism in the implementation that will disable the upgrade function when triggered.
- Upgrading to an implementation that features an upgrade mechanism without the additional security check, and then upgrading again to another implementation without the upgrade mechanism.

## Transparent-Based, Permit-Enabled Smart Contract Template: [`ERC20PermitTransparentUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitTransparentUpgradeable.sol)

The _transparent-based, permit-enabled smart contract template_ contains the following features:

- `mintable`: Privileged accounts will be able to create more supply. **Note:** The current template implementation mints 100 tokens at initialisation.
- `burnable`: Token holders will be able to destroy their tokens.
- `pausable`: Privileged accounts will be able to pause the functionality marked as `whenNotPaused`. Useful for emergency response.
- `permit`: Without paying gas, token holders will be able to allow third parties to transfer from their account.
- `roles` (for access control): Flexible mechanism with a separate role for each privileged action. A role can have many authorised accounts.
- `transparent` (upgrade pattern): Uses more complex proxy with higher overhead, requires less changes in your contract.

> **Caveat:** In the context of upgradeable contracts, implementation contracts should move the code within the constructor to a regular `initializer` function and have this function called whenever the proxy links to this logic contract. The main `initialize()` function of the template also contains the _name_ and _symbol_ of the ERC20 token contract, as well as the string _name_ used for the `permit` function. Make sure you adjust these parameters accordingly.

## UUPS-Based, Permit-Enabled Smart Contract Template:[`UUPSUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitUUPSUpgradeable.sol)

The _transparent-based, permit-enabled smart contract template_ contains the following features:

- `mintable`: Privileged accounts will be able to create more supply. **Note:** The current template implementation mints 100 tokens at initialisation.
- `burnable`: Token holders will be able to destroy their tokens.
- `pausable`: Privileged accounts will be able to pause the functionality marked as `whenNotPaused`. Useful for emergency response.
- `permit`: Without paying gas, token holders will be able to allow third parties to transfer from their account.
- `roles` (for access control): Flexible mechanism with a separate role for each privileged action. A role can have many authorised accounts.
- `UUPS` (upgrade pattern): Uses simpler proxy with less overhead, requires including extra code in your contract. Allows flexibility for authorising upgrades.

> **Caveat:** In the context of upgradeable contracts, implementation contracts should move the code within the constructor to a regular `initializer` function and have this function called whenever the proxy links to this logic contract. The main `initialize()` function of the template also contains the _name_ and _symbol_ of the ERC20 token contract, as well as the string _name_ used for the `permit` function. Make sure you adjust these parameters accordingly.

## Upgrading an Upgradeable Contract

Let's assume you have deployed one of the two template smart contracts and you want to include a further feature such as flash minting (lending tokens without requiring collateral as long as they're returned in the same transaction). Since the proxy contract already called `initialize` within the context of the first implementation contract, we must create a new function or modifier called `upgradeToV2` that allows initialising the required parameters for the flash mint feature. This could look like the following as function (not considering all further contract-specific dependencies):

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyContract is Initializable {
  uint256 private _version;

  function initialize() public initializer {
    _version = 1;
  }

  function upgradeToV2() public onlyRole(UPGRADER_ROLE) {
    require(_version < 2, "MyContract: Already upgraded to version 2");
    _version = 2;
  }
}

```

## Modifying Your Contracts

When writing new versions of your contracts, either due to new features or bug fixing, there is an additional restriction to observe: you cannot change the order in which the contract state variables are declared, nor their type. You can read more about the reasons behind this restriction by learning about in [Proxies](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies).

## Further Notes

### Multiple Inheritance

Initialiser functions are not linearised by the compiler like constructors. Because of this, each `__{ContractName}_init` function embeds the linearised calls to all parent initialisers. As a consequence, calling two of these `init` functions can potentially initialise the same contract twice.

The function `__{ContractName}_init_unchained` found in every contract is the initialiser function minus the calls to parent initialisers, and can be used to avoid the double initialisation problem, but doing this manually is not recommended. We hope to be able to implement safety checks for this in future versions of the Upgrades Plugins.

### Storage Gaps

You may notice that every contract includes a state variable named `__gap`. This is empty reserved space in storage that is put in place in Upgradeable contracts. It allows us to freely add new state variables in the future without compromising the storage compatibility with existing deployments.

It isn’t safe to simply add a state variable because it "shifts down" all of the state variables below in the inheritance chain. This makes the storage layouts incompatible, as explained in [Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#modifying-your-contracts). The size of the `__gap` array is calculated so that the amount of storage used by a contract always adds up to the same number (in this case 50 storage slots).

### Deployments

I make use of OpenZeppelin's [upgrade plugin](https://docs.openzeppelin.com/upgrades-plugins/1.x) for [Hardhat](https://docs.openzeppelin.com/upgrades-plugins/1.x/api-hardhat-upgrades). You can find a sample deployment and upgrade script in the file [`deploy.ts`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/scripts/deploy.ts). It's strongly recommended to conduct first test upgrades on test networks!

### Unit Tests

Since [Hardhat](https://hardhat.org) implements great features for Solidity debugging like Solidity stack traces, console.log, and explicit error messages when transactions fail, we leverage [Hardhat](https://hardhat.org) for testing:

```bash
npm run test
```

> The unit tests are based on OpenZeppelin's available unit tests.

## Ethereum Test Network Deployments

The smart contracts [`ERC20PermitTransparentUpgradeable.sol`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitTransparentUpgradeable.sol) and [`ERC20PermitUUPSUpgradeable.sol`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitUUPSUpgradeable.sol) have been deployed across all the major Ethereum test networks:

### `TransparentUpgradeableProxy` Deployments

- **Rinkeby:**
  - Implementation contract v1 ([`ERC20PermitTransparentUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitTransparentUpgradeable.sol): [`0x2e007edDdea022EB3EC639B09C90FFf18BEDbb6D`](https://rinkeby.etherscan.io/address/0x2e007edddea022eb3ec639b09c90fff18bedbb6d)
  - Implementation contract v2<sup>\*</sup> ([`NewTokenContractTransparent`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/mocks/sample%20upgrades/NewTokenContractTransparent.sol): [`0x0498300026397B8D25E555fAF5e3B81c48565AD7`](https://rinkeby.etherscan.io/address/0x0498300026397b8d25e555faf5e3b81c48565ad7)
  - [`ProxyAdmin`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/ProxyAdmin.sol): [`0x02E4d446c4f2BECddC425E92bFA828242eb598d3`](https://rinkeby.etherscan.io/address/0x02e4d446c4f2becddc425e92bfa828242eb598d3)
  - [`TransparentUpgradeableProxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/TransparentUpgradeableProxy.sol): [`0x703D6644Ee4708411cb22374505994Ec1CB15386`](https://rinkeby.etherscan.io/address/0x703d6644ee4708411cb22374505994ec1cb15386)
- **Ropsten:**
  - Implementation contract v1 ([`ERC20PermitTransparentUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitTransparentUpgradeable.sol): [`0x1782ad484FCD999B5155dE43aa51E550BA7D5aF7`](https://ropsten.etherscan.io/address/0x1782ad484FCD999B5155dE43aa51E550BA7D5aF7)
  - [`ProxyAdmin`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/ProxyAdmin.sol): [`0x47580098C7249e880B8F7AF32D0A21b2294d78cC`](https://ropsten.etherscan.io/address/0x47580098c7249e880b8f7af32d0a21b2294d78cc)
  - [`TransparentUpgradeableProxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/TransparentUpgradeableProxy.sol): [`0xe3a3258827d99C19D465186FbeD20c3fC66F595E`](https://ropsten.etherscan.io/address/0xe3a3258827d99c19d465186fbed20c3fc66f595e)
- **Kovan:**
  - Implementation contract v1 ([`ERC20PermitTransparentUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitTransparentUpgradeable.sol): [`0xe3a3258827d99C19D465186FbeD20c3fC66F595E`](https://kovan.etherscan.io/address/0xe3a3258827d99c19d465186fbed20c3fc66f595eF)
  - [`ProxyAdmin`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/ProxyAdmin.sol): [`0x9c4A96b2c68466731741fdF1f862Ca4d079E3484`](https://kovan.etherscan.io/address/0x9c4a96b2c68466731741fdf1f862ca4d079e3484)
  - [`TransparentUpgradeableProxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/TransparentUpgradeableProxy.sol): [`0xeCd59F79F1eF196758BD30614E4B82A97e4Dcc6F`](https://kovan.etherscan.io/address/0xecd59f79f1ef196758bd30614e4b82a97e4dcc6f)
- **Goerli:**
  - Implementation contract v1 ([`ERC20PermitTransparentUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitTransparentUpgradeable.sol): [`0xeD1d5e84F1d2947509923Ac55AEb538684015cb2`](https://goerli.etherscan.io/address/0xed1d5e84f1d2947509923ac55aeb538684015cb2)
  - [`ProxyAdmin`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/ProxyAdmin.sol): [`0xCbD441DCD38c3f251D9768e994df660e79717D08`](https://goerli.etherscan.io/address/0xcbd441dcd38c3f251d9768e994df660e79717d08)
  - [`TransparentUpgradeableProxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/TransparentUpgradeableProxy.sol): [`0x9d7654b4f0BB4fA85Cf09c08fC15Fd655C27d5a9`](https://goerli.etherscan.io/address/0x9d7654b4f0bb4fa85cf09c08fc15fd655c27d5a9)

<sup>\*</sup>_Built-in flash loans added._

### `UUPSUpgradeable` Deployments

- **Rinkeby:**
  - Implementation contract v1 ([`ERC20PermitUUPSUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitUUPSUpgradeable.sol): [`0x5A1353dbecef5b9599E63224a2642000E69A40FE`](https://rinkeby.etherscan.io/address/0x5a1353dbecef5b9599e63224a2642000e69a40fe)
  - Implementation contract v2<sup>\*</sup> ([`NewTokenContractUUPS`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/mocks/sample%20upgrades/NewTokenContractUUPS.sol): [`0x9caba639e5C5D8c83133F424B13cf08CDDd2C206`](https://rinkeby.etherscan.io/address/0x9caba639e5c5d8c83133f424b13cf08cddd2c206)
  - [`ERC1967Proxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/ERC1967/ERC1967Proxy.sol): [`0xED050957Dee292038bE7bEd5542f8887188a3cef`](https://rinkeby.etherscan.io/address/0xed050957dee292038be7bed5542f8887188a3cef)
- **Ropsten:**
  - Implementation contract v1 ([`ERC20PermitUUPSUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitUUPSUpgradeable.sol): [`0x9c4A96b2c68466731741fdF1f862Ca4d079E3484`](https://ropsten.etherscan.io/address/0x9c4a96b2c68466731741fdf1f862ca4d079e3484)
  - [`ERC1967Proxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/ERC1967/ERC1967Proxy.sol): [`0x957059A1445fB38B5a33d599636c94B10BC7e3f6`](https://ropsten.etherscan.io/address/0x957059A1445fB38B5a33d599636c94B10BC7e3f6)
- **Kovan:**
  - Implementation contract v1 ([`ERC20PermitUUPSUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitUUPSUpgradeable.sol): [`0x4387D89ee7464733476d2b872aF204CF97909CA4`](https://kovan.etherscan.io/address/0x4387d89ee7464733476d2b872af204cf97909ca4)
  - [`ERC1967Proxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/ERC1967/ERC1967Proxy.sol): [`0xe47C5491CeE40852e521BB1680055d3A1084fd7e`](https://kovan.etherscan.io/address/0xe47c5491cee40852e521bb1680055d3a1084fd7e)
- **Goerli:**
  - Implementation contract v1 ([`ERC20PermitUUPSUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitUUPSUpgradeable.sol): [`0x4add5dF921b3535Ae2960d5640075796B50C2DAf`](https://goerli.etherscan.io/address/0x4add5df921b3535ae2960d5640075796b50c2daf)
  - [`ERC1967Proxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/ERC1967/ERC1967Proxy.sol): [`0x407fdf54f6CfDbf0d61f61D0cCCCBc4C746F303b`](https://goerli.etherscan.io/address/0x407fdf54f6cfdbf0d61f61d0ccccbc4c746f303b)

<sup>\*</sup>_Built-in flash loans added._

## References

[1] https://eips.ethereum.org/EIPS/eip-1822

[2] https://blog.openzeppelin.com/the-transparent-proxy-pattern

[3] https://docs.openzeppelin.com/contracts/4.x/upgradeable

[4] https://docs.openzeppelin.com/openzeppelin/upgrades

[5] https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable
