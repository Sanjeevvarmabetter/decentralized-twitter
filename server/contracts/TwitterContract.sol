// SPDX-LICENSE-Identifier: MIT
pragma solidity ^0.8.19;

contract TwitterContract {

    event AddTweet(address recipient, uint tweetId);
    event DeleteTweet(uint tweetid, bool isdeleted);

    struct Tweet {
        uint id;
        address username;
        string tweet_text;
        bool isdeleted;
    }

    Tweet[] private tweets;
    mapping(uint256 => address) tweetToOwner;

    function addTweet(string memory tweetText, bool isdeleted) external {
        uint tweetId = tweets.length;
        tweets.push(Tweet(tweetId, msg.sender, tweetText, isdeleted));
        tweetToOwner[tweetId] = msg.sender;
        emit AddTweet(msg.sender, tweetId);
    }    

    function getalltweets() external view returns (Tweet[] memory) {
        Tweet[] memory temp = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i=0; i<tweets.length; i++) {
            if(!tweets[i].isdeleted) {
                temp[counter] = tweets[i];
                counter++;
            }
        }
        Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temp[i];
        }
        return result;
    }

    function getmytweets() external view returns (Tweet[] memory) {
        Tweet[] memory temp = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i=0; i<tweets.length; i++) {
            if(tweetToOwner[i] == msg.sender && !tweets[i].isdeleted) {
                temp[counter] = tweets[i];
                counter++;
            }
        }
        Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temp[i];
        }
        return result;
    }

    function deletetweet(uint tweetid, bool isdeleted) external {
        require(tweetid < tweets.length, "Invalid tweet ID");
        if(tweetToOwner[tweetid] == msg.sender) {
            tweets[tweetid].isdeleted = isdeleted;
            emit DeleteTweet(tweetid, isdeleted);
        }
    }
}
