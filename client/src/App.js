import React, { Component } from 'react';

import {useState, useEffect} from 'react';

import './App.css';

//before we need to check wheather the person have metamask installed

function App() {
  
  const [currentAccount,setCurrentAccount] = useState('');
  const [correctNetwork,setCorrectNetwork] = useState(false);

  //call metamask to connect wallet  by clickking the wallet button

  const connectWallet = async() => {
    try{
        const {ethereum} = window

        if(!ethereum) {
          console.log("metamask not detected");
          return;
        }

        let chainId = await ethereum.request({method: 'eth_chainId'})
        console.log('Connected to chain'+chainId);

        const sepoliaChainId = '11155111';

        if(chainId !== sepoliaChainId) {
          alert('you are not connected to the sepolia test net');
          setCorrectNetwork(false);
          return;
        }else {
          setCorrectNetwork(true);
        }
    }catch(error) {
      console.log("error bro,fix this fast",error);
      
    }
  }
  
//after this make a file config.js and add the contract transaction hash
// export const twittercontract address  = '';
  
  return (
    <div className='App'>
      hello
    </div>
  )
}

export default App;
