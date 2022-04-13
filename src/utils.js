// Create two Node.js applications, Alice.js and Bob.js that share the same logic, to avoid repetition 
// we create a shell of a JavaScript file 

// In here we create a provider, which acts like a bridge that makes JavaScript function cals compatible with zkSync 

// Lesson 17 Chapter 2
// Create an async function with zksync: points to zksync module, networkName: specififes network connected to 
async function getZkSyncProvider(zksync, networkName) {
    // declare provider variable
    let zkSyncProvider

    // create a new provider and prevent it from craching 
    try {
        // set provider to default 
        zkSyncProvider = await zksync.getDefaultProvider(networkName)

    } catch (error) {
        // log error
        console.log('Unable to connect to zkSync.')
        console.log(error)
    }
    // return provider
    return zkSyncProvider
}

// Create function to allows app to communicate with Ethereum 
async function getEthereumProvider (ethers, networkName) {
    let ethersProvider
    try {
      // eslint-disable-next-line new-cap
      ethersProvider = new ethers.getDefaultProvider(networkName)
    } catch (error) {
      console.log('Could not connect to Rinkeby')
      console.log(error)
    }
    return ethersProvider
  }

// create instantiate zksync and ethers wallet 
async function initAccount (rinkebyWallet, zkSyncProvider, zksync) {
    // declare constant 
    const zkSyncWallet = await zksync.Wallet.fromEthSigner(rinkebyWallet, zkSyncProvider)

    // return zksync wallet
    return zkSyncWallet
}

// create and register an account on zksync 
async function registerAccount (wallet) {
    console.log(`Registering the ${wallet.address()} account on zkSync`)
    // Start here
    // verify that signing key has been set for your account
    if (!await wallet.isSigningKeySet()) {
        // your signing key have not been set, wee place logic for setting it here
        // make sure zksync account exists 
        if (await wallet.getAccountId() === undefined) {
            throw new Error('Unknown account')
        }
        // assuming key has not been set, set it 
        const changePubkey = await wallet.setSigningKey()

        // await for transaction to be commited
        await changePubkey.awaitReceipt()
    }

    // log that registered 
    console.log(`Account ${wallet.address()} registered`)
  }

  // create a deposit to zksync function 
async function depositToZkSync (zkSyncWallet, token, amountToDeposit, ethers) {
    // call the deposit to Eth function 
    const deposit = await zkSyncWallet.depositToSyncFromEthereum({
    depositTo: zkSyncWallet.address(),
    token: token,
    amount: ethers.utils.parseEther(amountToDeposit)
    })
    // call the await deposit and make sure catch error
    try {
        await deposit.awaitReceipt()

    } catch (error) {
        console.log('Error while awaiting confirmation from the zkSync operators.')
        console.log(error)
    }
}
// create a transfer (2-step process)
async function transfer (from, toAddress, amountToTransfer, transferFee, token, zksync, ethers) {
    // Call zksynctransfer but make sure floating point representation good
    // amount to transfer in Wei 
    const closestPackableAmount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther(amountToTransfer))

    // call closestpackable fee and convert to wei
    const closestPackableFee = zksync.utils.closestPackableTransactionFee(ethers.utils.parseEther(transferFee))
 
    

  }