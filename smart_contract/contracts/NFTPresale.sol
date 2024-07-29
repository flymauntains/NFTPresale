// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTPresale is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public presalePrice;
    uint256 public presaleMaxSupply;
    uint256 public presaleSupply;
    bool public presaleActive;
    uint256 public startDate;
    uint256 public endDate;

    mapping(address => uint256) public presaleMinted;

    event PresaleMint(address indexed buyer, uint256 indexed tokenId);
    event PresaleDatesSet(uint256 startDate, uint256 endDate);
    event PresalePriceSet(uint256 price);

    constructor(
        string memory name,
        string memory symbol,
        uint256 _presalePrice,
        uint256 _presaleMaxSupply
    ) ERC721(name, symbol) {
        presalePrice = _presalePrice;
        presaleMaxSupply = _presaleMaxSupply;
        presaleActive = false;
    }

    modifier onlyWhenPresaleActive() {
        require(presaleActive, "Presale is not active");
        require(block.timestamp >= startDate && block.timestamp <= endDate, "Presale is not in the allowed date range");
        _;
    }

    function setPresaleDates(uint256 _startDate, uint256 _endDate) external onlyOwner {
        require(_startDate < _endDate, "Start date must be before end date");
        startDate = _startDate;
        endDate = _endDate;
        emit PresaleDatesSet(startDate, endDate);
    }

    function setPresalePrice(uint256 _presalePrice) external onlyOwner {
        presalePrice = _presalePrice;
        emit PresalePriceSet(presalePrice);
    }

    function startPresale() external onlyOwner {
        presaleActive = true;
    }

    function stopPresale() external onlyOwner {
        presaleActive = false;
    }

    function mintPresale(uint256 amount) external payable onlyWhenPresaleActive {
        require(amount > 0, "Amount must be greater than zero");
        require(presaleSupply + amount <= presaleMaxSupply, "Exceeds presale max supply");
        uint256 totalCost = presalePrice * amount;
        require(msg.value >= totalCost, "Insufficient Ether sent");

        // Refund any excess Ether sent
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }

        _mintMultiplePresale(amount);
    }

    function _mintMultiplePresale(uint256 amount) private {
        for (uint256 i = 0; i < amount; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(msg.sender, tokenId);
            presaleSupply++;
            emit PresaleMint(msg.sender, tokenId);
        }
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
}
