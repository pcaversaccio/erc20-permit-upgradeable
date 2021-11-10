// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./AccessControlMockUpgradeable.sol";

contract AccessControlMockUpgradeableWithInit is AccessControlMockUpgradeable {
  constructor() payable {
    __AccessControlMock_init();
  }
}
