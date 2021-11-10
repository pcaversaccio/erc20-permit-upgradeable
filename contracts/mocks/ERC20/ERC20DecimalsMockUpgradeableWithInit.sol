// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC20DecimalsMockUpgradeable.sol";

contract ERC20DecimalsMockUpgradeableWithInit is ERC20DecimalsMockUpgradeable {
  constructor(
    string memory name_,
    string memory symbol_,
    uint8 decimals_
  ) payable {
    __ERC20DecimalsMock_init(name_, symbol_, decimals_);
  }
}
