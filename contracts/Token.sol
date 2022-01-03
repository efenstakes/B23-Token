// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;



contract Token {
    string public name = "B2022Token";
    string public symbol = "B22";
    uint public totalSupply = 1000000;

    mapping(address => uint ) balances;


    constructor() {
        balances[msg.sender] = totalSupply;
    }


    function transfer(address to, uint ammount) public {
        require(balances[msg.sender] > ammount, "Insufficient Balance");

        balances[msg.sender] -= ammount;
        balances[to] += ammount;
    }


    function balanceOf(address owner) public view returns(uint) {
        return balances[owner];
    }
    
}