// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC20PausableMockUpgradeable.sol";

contract ERC20PausableMockUpgradeableWithInit is ERC20PausableMockUpgradeable {
  constructor(
    string memory name,
    string memory symbol,
    address initialAccount,
    uint256 initialBalance
  ) payable {
    __ERC20PausableMock_init(name, symbol, initialAccount, initialBalance);
  }
}
