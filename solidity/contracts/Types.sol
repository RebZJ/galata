// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/// @title Types
/// @dev Source file that keeps type definitions
abstract contract Types {

    /// @dev Charity transaction proposal. For Clients to sign and execute
    struct TransactionPiece {
        address destination;
        uint256 value;
    }

    /// @dev Charity transaction proposal. For Clients to sign and execute
    struct Transaction {
        address client;
        TransactionPiece[] pieces;
        uint256 piecesCount;
        uint256 fee;
        bool paid;
    }
}
