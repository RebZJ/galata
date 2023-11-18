// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Types.sol";

contract Relay is Types {
    /// @dev Current set of business clients
    mapping(address => bool) public isBusiness;

    /// @dev Not yet added business clients
    mapping(address => bool) public pendingBusinesses;

    /// @dev Current set of managers
    mapping(address => bool) public isManager;

    /// @dev Rewards the relay received for operations
    uint256 public rewards;

    /// @dev Current set of charity clients
    mapping(address => bool) public isCharity;
    /// @dev Not yet added charity clients
    mapping(address => bool) public pendingCharities;

    uint256 public transactionsCount;

    mapping(uint256 => Transaction) public transactions;

    event ManagerAdded(
        address indexed addedManager
    );

    event ManagerRemoved(
        address indexed addedManager
    );

    event TransactionAdded(
        uint256 indexed transactionId,
        address indexed business
    );

    event TransactionPaid(
        uint256 indexed transactionId,
        address indexed business
    );

    event Withdrawal(
        uint256 amount,
        address indexed manager
    );

    constructor(address manager) {
        isManager[manager] = true;
    }

    /// businesses management
    function addNewBusiness(address business) public {
        pendingBusinesses[business] = true;
    }

    function approveBusiness(address business) public onlyManager {
        pendingBusinesses[business] = false;
        isBusiness[business] = true;
    }

    function removeBusiness(address business) public onlyManager {
        isBusiness[business] = false;
    }

    /// charities management
    function addNewCharity(address charity) public {
        pendingCharities[charity] = true;
    }

    function approveCharity(address charity) public onlyManager {
        pendingCharities[charity] = false;
        isCharity[charity] = true;
    }

    function removeCharity(address charity) public onlyManager {
        isCharity[charity] = false;
    }

    /// manager management
    function addManager(address manager) public onlyManager {
        isManager[manager] = true;
    }

    function generateTransaction(
        address client,
        TransactionPiece[] memory pieces,
        uint256 fee
    ) public onlyManager {
        require(pieces.length > 0, "Charities are empty");
        require(isBusiness[client], "Client is not our client");

        transactions[transactionsCount].client = client;
        transactions[transactionsCount].fee = fee;
        transactions[transactionsCount].piecesCount = pieces.length;
        transactions[transactionsCount].paid = false;

        for (uint256 i = 0; i < pieces.length; i++) {
            require(isCharity[pieces[i].destination], "One of the destinations is not an approved charity");
            require(pieces[i].value > 0, "Donations should be non-zero");
            transactions[transactionsCount].pieces[i] = pieces[i];
        }

        emit TransactionAdded(transactionsCount, client);
        transactionsCount++;
    }

    function executeTransaction(
        uint256 transactionId
    ) public payable onlyBusiness transactionExists(transactionId) {
        Transaction storage transaction = transactions[transactionId];

        require(transaction.client == msg.sender, "The transaction is for another client");
        require(!transaction.paid, "Transaction is paid already");

        uint256 totalPayment = 0;
        for (uint256 i = 0; i < transaction.piecesCount; i++) {
            totalPayment += transaction.pieces[i].value;
        }

        require(totalPayment + transaction.fee <= msg.value, "The value is not enough to cover the transaction");

        for (uint256 i = 0; i < transaction.piecesCount; i++) {
            _sendFundsTo(transaction.pieces[i].destination, transaction.pieces[i].value);
        }

        transaction.paid = true;
        rewards += msg.value - totalPayment;

        emit TransactionPaid(transactionId, transaction.client);
    }

    function withdraw() public onlyManager {
        require(rewards > 0, "Nothing to withdraw");

        emit Withdrawal(rewards, msg.sender);

        _sendFundsTo(msg.sender, rewards);
        rewards = 0;
    }

    fallback() external payable {}

    receive() external payable {}

    /**
     * @dev Internal function to send excess rewards back to the bridge
     */
    function _sendFundsTo(address to, uint256 _funds) internal {
        (bool sent, ) = to.call{value: _funds}("");

        require(sent, "Failed to send funds");
    }

    modifier onlyManager() {
        if (!isManager[msg.sender]) revert("Sender is not the approved manager");
        _;
    }

    modifier onlyBusiness() {
        if (!isBusiness[msg.sender]) revert("Sender is not the approved business");
        _;
    }

    modifier transactionExists(uint256 transactionId) {
        if (transactions[transactionId].client == address(0))
            revert("Transaction doesn't exist.");
        _;
    }
}
