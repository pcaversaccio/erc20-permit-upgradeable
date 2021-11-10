# Permit-Enabled, Upgradeable ERC20 Smart Contract Template

[![build status](https://github.com/pcaversaccio/erc20-permit-upgradeable/actions/workflows/test-contracts.yml/badge.svg)](https://github.com/pcaversaccio/erc20-permit-upgradeable/actions)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

## `TransparentUpgradeableProxy`
TBD
## `UUPSUpgradeable`
TBD
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

