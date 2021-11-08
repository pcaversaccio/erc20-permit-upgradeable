// SPDX-License-Identifier: MIT
// Further information: https://docs.openzeppelin.com/contracts/4.x/api/proxy#TransparentUpgradeableProxy
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title Permit-enabled, transparent proxy-pattern-based upgradeable ERC20 smart contract
 * @author Pascal Marco Caversaccio
 * @dev The transparent proxy pattern (https://blog.openzeppelin.com/the-transparent-proxy-pattern)
 * implies two things that go hand in hand:
 * - If any account other than the `admin` calls the proxy, the call will be forwarded to
 *   the implementation, even if that call matches one of the `admin` functions exposed by
 *   the proxy itself.
 * - If the `admin` calls the proxy, it can access the `admin` functions, but its calls will
 *   never be forwarded to the implementation. If the `admin` tries to call a function on the
 *   implementation it will fail with an error that says "admin cannot fallback to proxy target".
 * @custom:security-contact pascal.caversaccio@hotmail.ch
 */

contract ERC20PermitTransparentUpgradeable is
  Initializable,
  ERC20Upgradeable,
  ERC20BurnableUpgradeable,
  PausableUpgradeable,
  AccessControlUpgradeable,
  ERC20PermitUpgradeable
{
  bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() initializer {}

  function initialize() public initializer {
    __ERC20_init("ERC20PermitTransparentUpgradeable", "WAGMI");
    __ERC20Burnable_init();
    __Pausable_init();
    __AccessControl_init();
    __ERC20Permit_init("ERC20PermitTransparentUpgradeable");

    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(PAUSER_ROLE, msg.sender);
    _mint(msg.sender, 100 * 10**decimals());
    _setupRole(MINTER_ROLE, msg.sender);
  }

  function pause() public onlyRole(PAUSER_ROLE) {
    _pause();
  }

  function unpause() public onlyRole(PAUSER_ROLE) {
    _unpause();
  }

  function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
    _mint(to, amount);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override whenNotPaused {
    super._beforeTokenTransfer(from, to, amount);
  }
}
