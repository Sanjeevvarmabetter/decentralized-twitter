const {expect} = require("chai");
const {ethers} = require("hardhat");


describe("Twitter Contract" , function(){
    let Twitter;
    let twitter;
    let owner;

    const NUM_TOTAL_NOT_MY_TW = 5;
    const NUM_TOTAL_MY_TW = 3;

    let totaltweets;
    let totalmytwweets;

    beforeEach(async function() {
        Twitter = await ethers.getContractFactory("TwitterContract");
        [owner, addr1, addr2] = await ethers.getSigners();
        twitter  = await Twitter.deploy();

        totaltweets  = [];
        totalmytwweets  = [];
    });
})