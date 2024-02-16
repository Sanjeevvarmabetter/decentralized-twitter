const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Twitter Contract", function() {
    let Twitter;
    let twitter;
    let owner;

    const NUM_TOTAL_NOT_MY_TW = 5;
    const NUM_TOTAL_MY_TW = 3;

    let totaltweets;
    let totalmytweets;

    beforeEach(async function() {
        Twitter = await ethers.getContractFactory("TwitterContract");
        [owner, addr1, addr2] = await ethers.getSigners();
        twitter = await Twitter.deploy();

        totaltweets = [];
        totalmytweets = [];

        for(let i=0; i<NUM_TOTAL_NOT_MY_TW; i++) {
            let tweet = {
                'tweetText': 'Random test with id:-' + i,
                'username': addr1,
                'isdeleted': false
            };

            await twitter.connect(addr1).addTweet(tweet.tweetText, tweet.isdeleted);
            totaltweets.push(tweet);
        }

        for(let i=0; i<NUM_TOTAL_MY_TW; i++) {
            let tweet = {
                'username': owner,
                'tweetText': 'Random text with id:- ' + (NUM_TOTAL_MY_TW + i),
                'isdeleted': false
            };

            await twitter.addTweet(tweet.tweetText, tweet.isdeleted);
            totaltweets.push(tweet);
            totalmytweets.push(tweet);
        }
    });

    //these are unit tests

    describe("Add Tweet", function() {
        it("Should emit AddTweet event", async function() {
            let tweet = {
                'tweetText': 'New Tweet',
                'isdeleted': false
            };
            await expect(await twitter.addTweet(tweet.tweetText, tweet.isdeleted))
                .to.emit(twitter, 'AddTweet')
                .withArgs(owner.address, NUM_TOTAL_MY_TW + NUM_TOTAL_NOT_MY_TW);
        });
    });

    describe("Get all tweets", function() {
        it("should return correct number of total tweets", async function() {
            const tweetsFromChain = await twitter.getalltweets();
            expect(tweetsFromChain.length).to.equal(NUM_TOTAL_NOT_MY_TW + NUM_TOTAL_MY_TW);
        });

        it("Should return the correct number of all my tweets", async function() {
            const mytweetsfromchain = await twitter.getmytweets();
            expect(mytweetsfromchain.length).to.equal(NUM_TOTAL_MY_TW);
        });
    });

    describe("Delete Tweet", function() {
        it("should emit delete tweet event", async function() {
            const TWEET_ID = 0;
            const TWEET_DELETED = true;

            await expect(
                twitter.connect(addr1).deletetweet(TWEET_ID, TWEET_DELETED)
            ).to.emit(
                twitter, 'DeleteTweet'
            ).withArgs(
                TWEET_ID, TWEET_DELETED
            );
        });
    });
});
