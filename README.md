# Permit-Enabled, Upgradeable ERC20 Smart Contract Template

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

## Ethereum Test Network Deployments

The smart contracts [`ERC20PermitTransparentUpgradeable.sol`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitTransparentUpgradeable.sol) and [ERC20PermitUUPSUpgradeable.sol](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitUUPSUpgradeable.sol) have been deployed across all the major Ethereum test networks:

### `TransparentUpgradeableProxy`

- **Rinkeby:**
  - Implementation contract v1 ([`ERC20PermitTransparentUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitTransparentUpgradeable.sol)): [`0x2e007edDdea022EB3EC639B09C90FFf18BEDbb6D`](https://rinkeby.etherscan.io/address/0x2e007edddea022eb3ec639b09c90fff18bedbb6d)
  - Implementation contract v2<sup>\*</sup> ([`NewTokenContractTransparent`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/mocks/NewTokenContractTransparent.sol)): [`0x0498300026397B8D25E555fAF5e3B81c48565AD7`](https://rinkeby.etherscan.io/address/0x0498300026397b8d25e555faf5e3b81c48565ad7)
  - [`ProxyAdmin`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/ProxyAdmin.sol): [`0x02E4d446c4f2BECddC425E92bFA828242eb598d3`](https://rinkeby.etherscan.io/address/0x02e4d446c4f2becddc425e92bfa828242eb598d3)
  - [`TransparentUpgradeableProxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/TransparentUpgradeableProxy.sol): [`0x703D6644Ee4708411cb22374505994Ec1CB15386`](https://rinkeby.etherscan.io/address/0x703d6644ee4708411cb22374505994ec1cb15386)
- **Ropsten:**
  - Implementation contract v1 ([`ERC20PermitTransparentUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitTransparentUpgradeable.sol)): [`TBD`](TBD)
  - [`ProxyAdmin`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/ProxyAdmin.sol): [`TBD`](TBD)
  - [`TransparentUpgradeableProxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/TransparentUpgradeableProxy.sol): [`TBD`](TBD)
- **Kovan:**
  - Implementation contract v1 ([`ERC20PermitTransparentUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitTransparentUpgradeable.sol)): [`TBD`](TBD)
  - [`ProxyAdmin`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/ProxyAdmin.sol): [`TBD`](TBD)
  - [`TransparentUpgradeableProxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/TransparentUpgradeableProxy.sol): [`TBD`](TBD)
- **Goerli:**
  - Implementation contract v1 ([`ERC20PermitTransparentUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitTransparentUpgradeable.sol)): [`TBD`](TBD)
  - [`ProxyAdmin`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/ProxyAdmin.sol): [`TBD`](TBD)
  - [`TransparentUpgradeableProxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/TransparentUpgradeableProxy.sol): [`TBD`](TBD)

<sup>\*</sup>_Built-in flash loans added._

### `UUPSUpgradeable`

- **Rinkeby:**
  - Implementation contract v1 ([`ERC20PermitUUPSUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitUUPSUpgradeable.sol)): [0x5A1353dbecef5b9599E63224a2642000E69A40FE](https://rinkeby.etherscan.io/address/0x5a1353dbecef5b9599e63224a2642000e69a40fe)
  - Implementation contract v2<sup>\*</sup> ([`NewTokenContractUUPS`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/mocks/NewTokenContractUUPS.sol)): [`0x9caba639e5C5D8c83133F424B13cf08CDDd2C206`](https://rinkeby.etherscan.io/address/0x9caba639e5c5d8c83133f424b13cf08cddd2c206)
  - [`ERC1967Proxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/ERC1967/ERC1967Proxy.sol): [`0xED050957Dee292038bE7bEd5542f8887188a3cef`](https://rinkeby.etherscan.io/address/0xed050957dee292038be7bed5542f8887188a3cef)
- **Ropsten:**
  - Implementation contract v1 ([`ERC20PermitUUPSUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitUUPSUpgradeable.sol)): [TBD](TBD)
  - [`ERC1967Proxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/ERC1967/ERC1967Proxy.sol): [`TBD`](TBD)
- **Kovan:**
  - Implementation contract v1 ([`ERC20PermitUUPSUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitUUPSUpgradeable.sol)): [TBD](TBD)
  - [`ERC1967Proxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/ERC1967/ERC1967Proxy.sol): [`TBD`](TBD)
- **Goerli:**
  - Implementation contract v1 ([`ERC20PermitUUPSUpgradeable`](https://github.com/pcaversaccio/erc20-permit-upgradeable/blob/main/contracts/ERC20PermitUUPSUpgradeable.sol)): [TBD](TBD)
  - [`ERC1967Proxy`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/ERC1967/ERC1967Proxy.sol): [`TBD`](TBD)

<sup>\*</sup>_Built-in flash loans added._

## References

[1] https://eips.ethereum.org/EIPS/eip-1822

[2] https://blog.openzeppelin.com/the-transparent-proxy-pattern

[3] https://docs.openzeppelin.com/contracts/4.x/upgradeable

[4] https://docs.openzeppelin.com/openzeppelin/upgrades

[5] https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable

## TO DOs

- Further test deployments
- Unit Tests
- Proper Documentation
