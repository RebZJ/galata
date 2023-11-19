// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Types.sol";

contract Relay is Types {
    /// @dev Current set of business clients
    mapping(address => bool) public isBusiness;
    address[] public businesses;

    /// @dev Not yet added business clients
    address[] public pendingBusinesses;

    /// @dev Current set of managers
    mapping(address => bool) public isManager;
    address[] public managers;

    /// @dev Rewards the relay received for operations
    uint256 public rewards;

    /// @dev Current set of charity clients
    mapping(address => bool) public isCharity;
    address[] public charities;

    /// @dev Not yet added charity clients
    address[] public pendingCharities;

    uint256 public transactionsCount;

    mapping(uint256 => Transaction) public transactions;
    mapping(address => uint256[]) public clientToTransaction;

    event CharityApproved(
        address indexed charity
    );

    event PendingCharityAdded(
        address indexed charity
    );

    event CharityRemoved(
        address indexed charity
    );

    event BusinessApproved(
        address indexed business
    );

    event PendingBusinessAdded(
        address indexed charity
    );

    event BusinessRemoved(
        address indexed business
    );

    event ManagerAdded(
        address indexed manager
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
        for (uint256 i = 0; i < pendingBusinesses.length; i++) {
            if (pendingBusinesses[i] == business) {
                revert("The business address is already pending");
            }
        }

        pendingBusinesses.push(business);
        emit PendingBusinessAdded(business);
    }

    function approveBusiness(address business) public onlyManager {
        if (isBusiness[business]) {
            return;
        }

        isBusiness[business] = true;
        businesses.push(business);

        emit BusinessApproved(business);

        if (pendingBusinesses.length == 0) {
            return;
        }

        for (uint256 i = 0; i < pendingBusinesses.length; i++) {
            if (pendingBusinesses[i] == business) {
                if (i != pendingBusinesses.length - 1) {
                    pendingBusinesses[i] = pendingBusinesses[pendingBusinesses.length - 1];
                }
                delete pendingBusinesses[pendingBusinesses.length - 1];
                break;
            }
        }
    }

    function removeBusiness(address business) public onlyManager {
        isBusiness[business] = false;

        emit BusinessRemoved(business);

        if (businesses.length == 0) {
            return;
        }

        for (uint256 i = 0; i < businesses.length; i++) {
            if (businesses[i] == business) {
                if (i != businesses.length - 1) {
                    businesses[i] = businesses[businesses.length - 1];
                }
                delete businesses[businesses.length - 1];
                break;
            }
        }
    }

    /// charities management
    function addNewCharity(address charity) public {
        for (uint256 i = 0; i < pendingCharities.length; i++) {
            if (pendingCharities[i] == charity) {
                revert("The charity address is already pending");
            }
        }

        pendingCharities.push(charity);
        emit PendingCharityAdded(charity);
    }

    function approveCharity(address charity) public onlyManager {
        if (isCharity[charity]) {
            return;
        }

        isCharity[charity] = true;
        charities.push(charity);

        emit CharityApproved(charity);

        if (pendingCharities.length == 0) {
            return;
        }

        for (uint256 i = 0; i < pendingCharities.length; i++) {
            if (pendingCharities[i] == charity) {
                if (i != pendingCharities.length - 1) {
                    pendingCharities[i] = pendingCharities[pendingCharities.length - 1];
                }
                delete pendingCharities[pendingCharities.length - 1];
                break;
            }
        }
    }

    function removeCharity(address charity) public onlyManager {
        isCharity[charity] = false;
        emit CharityRemoved(charity);

        if (charities.length == 0) {
            return;
        }

        for (uint256 i = 0; i < charities.length; i++) {
            if (charities[i] == charity) {
                if (i != charities.length - 1) {
                    charities[i] = charities[charities.length - 1];
                }
                delete charities[charities.length - 1];
                break;
            }
        }
    }

    /// manager management
    function addManager(address manager) public onlyManager {
        isManager[manager] = true;
        managers.push(manager);
        emit ManagerAdded(manager);
    }

    function pendingTransactions(
        address client
    ) public view returns (Transaction[] memory) {
        uint256 clientTransactions = clientToTransaction[client].length;
        Transaction[] memory returnTransactions = new Transaction[](clientTransactions);
        for (uint256 i = 0; i < clientTransactions; i++) {
            returnTransactions[i] = transactions[clientToTransaction[client][i]];
        }
        return returnTransactions;
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
            transactions[transactionsCount].pieces.push(pieces[i]);
        }

        clientToTransaction[client].push(transactionsCount);

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
