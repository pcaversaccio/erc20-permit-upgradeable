// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC20PermitMockUpgradeable.sol";

contract ERC20PermitMockUpgradeableWithInit is ERC20PermitMockUpgradeable {
  constructor(
    string memory name,
    string memory symbol,
    address initialAccount,
    uint256 initialBalance
  ) payable {
    __ERC20PermitMock_init(name, symbol, initialAccount, initialBalance);
  }
}
