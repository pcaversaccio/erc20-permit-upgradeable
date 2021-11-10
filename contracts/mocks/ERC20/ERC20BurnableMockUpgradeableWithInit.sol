// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC20BurnableMockUpgradeable.sol";

contract ERC20BurnableMockUpgradeableWithInit is ERC20BurnableMockUpgradeable {
  constructor(
    string memory name,
    string memory symbol,
    address initialAccount,
    uint256 initialBalance
  ) payable {
    __ERC20BurnableMock_init(name, symbol, initialAccount, initialBalance);
  }
}
