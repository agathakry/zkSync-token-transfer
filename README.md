# zkSync Token Transfer
Project built using the ZK rollup architecture zkSync for transfering ERC270 tokens between "Bob" and "Alice". This repo is based on the [CryptoZombies Lesson 17 and 18](https://cryptozombies.io/). zkSync uses zk-SNARKS (Zero-Knowledge Succint Non-Interactive Arguments of Knowledge) which allow "Alice" (prover) to prove to "Bob" (verifier) that she knows something to be true, without conveying any other information. 

<p align="center">
<img src=https://github.com/agathakry/zkSync/blob/main/assets/bob%20alice.jpg width="30%">
</p>


## Introduction 

<p align="center">
<img src=https://github.com/agathakry/zkSync/blob/main/assets/zksynclogo.png width="30%">
</p>

[zkSync](https://zksync.io/) is a L2 scaling solution for the Ethereum Network in which all funds are held by smart contract on Ethereum, while computations and storage are performed off-chain. 

## Requirements 
``` 
npm
node 
```

## Getting started 
### Initialise node.js project
Create a package.json file that identifies project and lists packages project deepends on, making the build reproducible 
y-flag specfies that you want to accept all defaults npm suggests based on information extracted from the current directory 
```npm init -y```

### Install dependencies
Assuming that ```npm```and ```node```are already installed, install 
```npm install ethers zksync ```

## Set up Rinkeby as Network 
```
export NETWORK_NAME=rinkeby
```

## Create an address for Bob 
```
export BOB_ADDRESS=<BOB_ACTUAL_ADDRESS>
```

## Project Structure

| File | Description | 
| ----- | ---------- | 
| [alice.js](https://github.com/agathakry/zkSync/blob/main/src/alice.js), [bob.js](https://github.com/agathakry/zkSync/blob/main/src/bob.js), [utils.js](https://github.com/agathakry/zkSync/blob/main/src/utils.js) | Set up ETH deposits to zkSync, withdrawals, transfers and check account balances | 
| [alice_usdt.js](https://github.com/agathakry/zkSync/blob/main/src/alice_usdt.js), [bob_usdt.js](https://github.com/agathakry/zkSync/blob/main/src/bob_usdt.js), [utils_usdt.js](https://github.com/agathakry/zkSync/blob/main/src/utils_usdt.js) | Set up USDT deposits to zkSync, withdrawals, transfers and check account balances | 


## Security Notice
Thsi repo is only an example, do not deploy on mainnet, never share your private keys online. 